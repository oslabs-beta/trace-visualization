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
    let webPanel;
    // Register the command to get the telemetry log file
    context.subscriptions.push(vscode.commands.registerCommand('extension.vsstack.getTelemetryLogFile', async () => {
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
        webPanel = vscode.window.createWebviewPanel('sequenceDiagram', 'System Sequence Diagram', // title of the webView API
        vscode.ViewColumn.Beside, // Position of the webView
        // Enable JS within webview
        {
            enableScripts: true,
        });
        // Watch for updates in log txt file (fsPath provides access to FS path in string format)
        // onDidChange will listen for changes in events
        const monitor = vscode.workspace.createFileSystemWatcher(logFileUri.fsPath);
        let prevContent;
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
    }));
}
exports.activate = activate;
function parseAndStoreData(data, context) {
    const lines = data.split('\n');
    const parsedData = {};
    for (const line of lines) {
        const separatorIndex = line.indexOf(':');
        if (separatorIndex) {
            const key = line.slice(0, separatorIndex).trim();
            const value = line.slice(separatorIndex + 1).trim();
            parsedData[key] = value;
        }
    }
    // Retrieve existing array from the global state, or initialize it if it doesn't exist
    let existingArray = context.globalState.get('parsedData', []); // [{Status Code: 200}]
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
function getWebviewContent(content, context) {
    const d3Data = JSON.stringify(context.globalState.get('parsedData'));
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
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map