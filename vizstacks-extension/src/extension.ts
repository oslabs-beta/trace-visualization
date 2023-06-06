import * as vscode from 'vscode';
//from log.txt

// Activate extension the very first time
export function activate(context: vscode.ExtensionContext) {
	// register vscode command of getTelemetryLogFile extension
	context.subscriptions.push(
		vscode.commands.registerCommand('extension.vsstack.getTelemetryLogFile', () => {
			// Access workspace of the user
			const workspaceFolders = vscode.workspace.workspaceFolders;
			if (!workspaceFolders) {
				vscode.window.showErrorMessage('No workspace folder found.');
				return;
			}
			// Access URI resource // file content
			const workspaceRoot = workspaceFolders[0].uri;
			vscode.workspace.fs.readFile(vscode.Uri.joinPath(workspaceRoot, 'log.txt')).then((content) => {
				// console.log(content.toString());
				vscode.window.showInformationMessage(content.toString());

				// Create and show a new webview
				const panel = vscode.window.createWebviewPanel(
					'sequenceDiagram',
					'System Sequence Diagram', // Title of the Panel
					vscode.ViewColumn.Beside, // Editor column to show the new webview panel in.
					// Enable JS within webview
					{
						enableScripts: true,
					}
				);

				// And set its HTML content
				panel.webview.html = getWebviewContent(content.toString());
			});
		})
	);
	// Adds the disposable object in a registration and will be properly disposed when deactivated
	// context.subscriptions.push(disposable);
}

function getWebviewContent(content: string): string {
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

// export async function activate(context: vscode.ExtensionContext) {
// 	console.log('Extension enabled.');
// 	const parser = new XMLParser();
// 	const response = await axios.get('https://blog.webdevsimplified.com/rss.xml');
// 	const articles = parser.parse(response.data).rss.channel.item.map((article: any): any => {
// 		return {
// 			label: article.title,
// 			detail: article.description,
// 		};
// 	});
// 	console.log(articles);
// 	console.log(parser.parse(response.data));

// 	context.subscriptions.push(
// 		vscode.commands.registerCommand('extension.vsstack.helloWorld', async () => {
// 			const article = await vscode.window.showQuickPick(articles, {
// 				matchOnDetail: true,
// 			});
// 			// HelloWorldPanel.createOrShow(context.extensionUri);
// 		})
// 	);

// 	context.subscriptions.push(
// 		vscode.commands.registerCommand('vsstack.askQuestion', async () => {
// 			const answer = await vscode.window.showInformationMessage('How was your day?', 'good', 'bad');
// 			if (answer === 'good') {
// 				console.log('here it is!');
// 			}
// 		})
// 	);
// }
