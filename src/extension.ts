import * as vscode from 'vscode';
import { io } from 'socket.io-client';

let webPanel: vscode.WebviewPanel | undefined;

// Activate extension the very first time
export function activate(context: vscode.ExtensionContext) {
	console.log('test');

	//copied code from /socket/client/socket.js to create client socket connection
	const socket = io('http://localhost:44222');
	let socketId: string;

	socket.on('connect', () => {
		socketId = socket.id;
		socket.emit('socketId', {data: socket.id});
		console.log('new connection: ', `id ${socket.id}: `, socket);
	});
	
	socket.on('interaction', (data) => {
		console.log(data);
	});

	socket.on('disconnect', () => {
		console.log(`id ${socketId} disconnected`);
	})

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
				// Close socket.io connection
				console.log(`id ${socket.id} disconnected`)
				socket.disconnect();
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
