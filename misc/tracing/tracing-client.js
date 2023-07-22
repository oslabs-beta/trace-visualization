const xhrData = {};

// Define a function to handle the XHR requests
function handleXhrRequest(xhr) {
	// Store the original send method
	const originalSend = xhr.send;

	// Override the send method
	xhr.send = function (data) {
		// Add your code to capture the request payload data
		// console.log("XHR Request Payload:", data);
		xhrData.requestPayload = data;

		// Call the original send method
		originalSend.call(this, data);
	};

	// Add an event listener for the 'load' event to capture the response
	xhr.addEventListener('load', function () {
		// console.log("XHR Response Data:", xhr.responseText);
		xhrData.responseData = xhr.responseText;

		fetch('http://localhost:12720/v1/traces', {
			method: 'POST',
			body: JSON.stringify(xhrData),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				// Handle the response from the backend
				console.log('confirmed');
			});
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
