export function genCamera() {
    // Get references to HTML elements
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    
    // Check if the browser supports getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Access the webcam
        (async function () {
            try {
                // Desktop webCam for dev
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });

                //Mobile backCam for User
                // const stream = await navigator.mediaDevices.getUserMedia({ video: true, video: {facingMode: {exact: 'environment'}}});


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

}


//stop camera
export function stopCamera() {
    const stream = document.getElementById('video').srcObject
    stream.getTracks().forEach((track) => {
        if (track.readyState == 'live' && track.kind === 'video') {
            track.stop();
        }
    });
}

//camera capture 
export function capture() {
    // Draw the current video frame onto the canvas
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get the image data from the canvas as a base64-encoded PNG
    const imageData = canvas.toDataURL('image/png');
    const fetchData = new FormData();
    const byteCharacters = atob(imageData.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const imageFile = new Blob([byteArray], { type: 'image/png' });

    console.log(imageFile);

    // Rename the image file to have a .png extension
    const renamedFile = new File([imageFile], 'image.png', { type: 'image/png' });

    fetchData.append('image', renamedFile);

    // Do something with the captured image (e.g., display it on the page)
    const imageElement = document.createElement('img');
    imageElement.src = imageData;
    document.body.appendChild(imageElement);

    return fetchData

    // Save the image data to the server
    // fetch('/api/camera', {
    //     method: 'POST',
    //     body: fetchData,
    // })

}
