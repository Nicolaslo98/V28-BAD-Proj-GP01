// Get references to HTML elements
const video = document.getElementById('video');
const captureButton = document.getElementById('captureButton');
const canvas = document.getElementById('canvas');

// Check if the browser supports getUserMedia
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // Access the webcam
  (async function () {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Set the video source
      video.srcObject = stream;
    } catch (error) {
      console.error('Error accessing the webcam:', error);
    }
  })();
} else if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
  // Fallback for older browsers that only support enumerateDevices
  (async function () {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      // Find the webcam device
      const webcam = devices.find(device => device.kind === 'videoinput');
      if (webcam) {
        // Access the webcam
        const stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: webcam.deviceId } });
        // Set the video source
        video.srcObject = stream;
      } else {
        console.error('No webcam found');
      }
    } catch (error) {
      console.error('Error enumerating devices:', error);
    }
  })();
} else {
  console.error('Webcam not supported');
}

// Function to capture a picture
function capture() {
  // Draw the current video frame onto the canvas
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  
  // Get the image data from the canvas as a base64-encoded PNG
  const imageData = canvas.toDataURL('image/png').replace("image/png", "image/octet-stream");
  
  // Do something with the captured image (e.g., display it on the page)
  const imageElement = document.createElement('img');
  imageElement.src = imageData;
  document.body.appendChild(imageElement);
  // console.log(imageData)

  // Save the image data to the server
  fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({data:imageData}),
  })
    .then(response => {
      if (response.ok) {
        console.log('Image saved successfully');
      } else {
        console.error('Failed to save the image');
      }
    })
    .catch(error => {
      console.error('Error saving the image:', error);
    });

}

// Event listener for the capture button
captureButton.addEventListener('click', capture);