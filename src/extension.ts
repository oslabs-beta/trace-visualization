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
				vscode.window.showErrorMessage('No workspace folder found.');
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
			monitor.onDidChange(async () => {
				// Read updated content in logFileUri
				const updatedContent = await vscode.workspace.fs.readFile(logFileUri);

				// Set the webview HTML content with the updated data
				if (webPanel) {
					webPanel.webview.html = getWebviewContent(updatedContent.toString());
				}
			});
			webPanel.onDidDispose(() => {
				monitor.dispose();
			});
		})
	);
}

function getWebviewContent(content: string): string {
	console.log(content);
	return `
			<html>
			<body>
					<div>SOME KIND OF d3 sequence diagram</div>
					<pre>${content}</pre>
			</body>
			</html>
	`;
}

// This method is called when your extension is deactivated
export function deactivate() {}
