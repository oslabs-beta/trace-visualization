import * as vscode from 'vscode';

let webPanel: vscode.WebviewPanel | undefined;
let socketData: DataObject | undefined;

interface DataObject {
	executionTime: string;
	httpMethod: string;
	requestPayload: string;
	responseData: string;
	route: string;
	sqlQuery: string;
	statusCode: string;
}

// Activate extension the very first time
export function activate(context: vscode.ExtensionContext) {
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

			// Set the webview HTML content with the updated data
			if (webPanel) {
				webPanel.webview.html = getWebviewContent(context);
			}

			webPanel.onDidDispose(() => {
				//webpanel close actions
			});
		})
	);
}

function getWebviewContent(context: vscode.ExtensionContext): string {
	const reactUrl = 'http://localhost:1337';
	return `
	  <html>
	  <head>
	    <style>
	      body, html {
	        margin: 0;
	        padding: 0;
	      }
				#webviewContainer {
          height: 100vh;
					background-color: white;
        }
	      iframe {
	        width: 100%;
	        height: 100%;
	      }
	    </style>
	  </head>
	  <body>
			<div id="webviewContainer">
				<iframe src="${reactUrl}"></iframe>
			</div>	  
		</body>
	</html>
	`;
}

// This method is called when your extension is deactivated
export function deactivate() {}
