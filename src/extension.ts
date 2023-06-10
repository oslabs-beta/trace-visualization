import * as vscode from 'vscode';

// Activate extension the very first time
export function activate(context: vscode.ExtensionContext) {
	let webPanel: vscode.WebviewPanel | undefined;

	// Register the command to get the telemetry log file
	context.subscriptions.push(
		vscode.commands.registerCommand('extension.vsstack.getTelemetryLogFile', async () => {
			// VS Code extension enabled message
			vscode.window.showInformationMessage('Your VS Code extension, VizStacks, has been enabled.');

			// Access workspace of the user
			const workspaceFolders = vscode.workspace.workspaceFolders;
			if (!workspaceFolders) {
				vscode.window.showErrorMessage('No log file found.');
				return;
			}
			// Access URI resource // log file content
			const workspaceRoot = workspaceFolders[0].uri;
			const logFileUri = vscode.Uri.joinPath(workspaceRoot, 'log.txt');

			// Close the existing panel if it is open
			if (webPanel) {
				webPanel.dispose();
			}

			// Create a new webview panel
			webPanel = vscode.window.createWebviewPanel(
				'sequenceDiagram',
				'System Sequence Diagram', // title of the webView API
				vscode.ViewColumn.Beside, // Position of the webView
				// Enable JS within webview
				{
					enableScripts: true,
				}
			);

			// Watch for updates in log txt file (fsPath provides access to FS path in string format)
			// onDidChange will listen for changes in events
			const monitor = vscode.workspace.createFileSystemWatcher(logFileUri.fsPath);
			let prevContent: string | undefined;

			monitor.onDidChange(async () => {
				// Read updated content in logFileUri
				const updatedContent = await vscode.workspace.fs.readFile(logFileUri);
				const currentContent = updatedContent.toString();

				// Parse and store the data in local storage
				parseAndStoreData(currentContent, context);

				// Set the webview HTML content with the updated data
				if (webPanel) {
					webPanel.webview.html = getWebviewContent(updatedContent.toString(), context);
				}
			});
			webPanel.onDidDispose(() => {
				monitor.dispose();
				// Clear the stored data from global state
				prevContent = undefined;
				context.globalState.update('parsedData', undefined);
			});
		})
	);
}

interface ParsedData {
	[key: string]: string;
}

interface AllData {
	[key: string]: string;
}

function parseAndStoreData(data: string, context: vscode.ExtensionContext) {
	const lines = data.split('\n');
	const parsedData: ParsedData = {};

	for (const line of lines) {
		const separatorIndex = line.indexOf(':');
		if (separatorIndex) {
			const key = line.slice(0, separatorIndex).trim();
			const value = line.slice(separatorIndex + 1).trim();
			parsedData[key] = value;
		}
	}

	// Retrieve existing array from the global state, or initialize it if it doesn't exist
	let existingArray = context.globalState.get('parsedData', []) as AllData[]; // [{Status Code: 200}]

	if (!Array.isArray(existingArray)) {
		existingArray = [];
	}

	// Check if the parsed data already exists in the array
	const alreadyExists = existingArray.some((item) => {
		// Compare each key-value pair in the parsed data object
		return Object.entries(item).every(([key, value]) => {
			return parsedData[key] === value;
		});
	});

	// Push the parsed data as a new object into the array if it doesn't already exist
	if (!alreadyExists) {
		existingArray.push(parsedData);
		context.globalState.update('parsedData', existingArray);
	}
}

function getWebviewContent(content: string, context: vscode.ExtensionContext): string {
	const d3Data: String = JSON.stringify(context.globalState.get('parsedData'));
	console.log(d3Data);
	return `
			<html>
			<body>
					<div>SOME KIND OF d3 sequence diagram</div>
					<pre>${content}</pre>
					<hr>
					<br>
			</body>
			</html>
	`;
}

// This method is called when your extension is deactivated
export function deactivate() {}
