/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __webpack_require__(1);
// Activate extension the very first time
function activate(context) {
    // register vscode command of getTelemetryLogFile extension
    context.subscriptions.push(vscode.commands.registerCommand('extension.vsstack.getTelemetryLogFile', () => {
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
            const panel = vscode.window.createWebviewPanel('sequenceDiagram', 'System Sequence Diagram', // Title of the Panel
            vscode.ViewColumn.Beside, // Editor column to show the new webview panel in.
            // Enable JS within webview
            {
                enableScripts: true,
            });
            // And set its HTML content
            panel.webview.html = getWebviewContent(content.toString());
        });
    }));
    // Adds the disposable object in a registration and will be properly disposed when deactivated
    // context.subscriptions.push(disposable);
}
exports.activate = activate;
function getWebviewContent(content) {
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
function deactivate() { }
exports.deactivate = deactivate;
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

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map