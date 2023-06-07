import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://localhost:8080',
});

// Define a function to handle the XHR requests
function handleXhrRequest(xhr) {
	// Store the original send method
	const originalSend = xhr.send;

	// Override the send method
	xhr.send = function (data) {
		// Add your code to capture the request payload data
		console.log('XHR Request Payload:', data);
		// instance.post('/log', JSON.stringify(data));
		// logData('XHR Request Payload:', data);

		// Call the original send method
		originalSend.call(this, data);
	};

	// Add an event listener for the 'load' event to capture the response
	xhr.addEventListener('load', function () {
		console.log('XHR Response Data:', xhr.responseText);
		// const response = await axios.post(URL to tracing server file, JSON.stringify(xhr.responseText)
		// logData('XHR Response Data:', xhr.responseText);
	});
}

// Override the XMLHttpRequest object
(function () {
	const originalXhr = window.XMLHttpRequest;

	function CustomXhr() {
		const xhr = new originalXhr();
		handleXhrRequest(xhr);
		return xhr;
	}

	window.XMLHttpRequest = CustomXhr;
})();

// const rootDirectory = path.resolve(__dirname, '..');
// function logData(name, data) {
// 	fs.appendFileSync(path.join(rootDirectory, 'log.txt'), data);
// }
