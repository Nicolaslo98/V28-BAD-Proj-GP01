document.querySelectorAll(".players").forEach((element) => {
  element.addEventListener('click', async (e) => {
    Swal.fire({
      html: `
      
      `,
      input: "text",
      inputLabel: "Name",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
        console.log(value)
        document.querySelector(`#${e.target.id} ul .name`).innerHTML = `${value}`
      }
    });


  });
})
// Swal.fire({
//   title: "Is this correct?",
//   text: "🀙🀙🀙🀚🀚🀚🀛🀛🀛🀜🀜🀜🀡🀡",
//   icon: "warning",
//   showCancelButton: true,
//   confirmButtonColor: "#3085d6",
//   cancelButtonColor: "#d33",
//   confirmButtonText: "Yes",
//   cancelButtonText: "Retry"
// }).then((result) => {
//   if (result.isConfirmed) {
//     Swal.fire({
//       title: "Deleted!",
//       text: "Your file has been deleted.",
//       icon: "success"
//     });
//   } else {
//     console.log("nice")
//   }
// });

const leaderBoard = document.querySelector(".leaderBoardBox")
const home = document.querySelector(".box")
const start = document.querySelector(".startBox")
const rightBtn = document.querySelector(".rightBtn")
const leftBtn = document.querySelector(".leftBtn")
const cameraBtn = document.querySelector(".cameraBtn")
const rightBtnText = document.querySelector(".rightBtn p")
const rightBtnIcon = document.querySelector(".rightBtn i")
const leftBtnText = document.querySelector(".leftBtn p")
const leftBtnIcon = document.querySelector(".leftBtn i")
const topBoxText = document.querySelector(".topBox p")

let check = true
let check2 = true




rightBtn.addEventListener("click", function (e) {
  if (check) {
    leaderBoard.style.display = 'flex';
    home.style.display = 'none';
    cameraBtn.style.display = 'none'
    start.style.display = 'none'
    rightBtnText.innerHTML = "現時賽果"
    rightBtnIcon.classList = "fa-solid fa-house"
    leftBtnText.innerHTML = "重新開局"
    leftBtnIcon.classList = "fa-solid fa-backward"
    topBoxText.innerHTML = "麻雀排行榜"
    check = false
    check2 = true

  } else {
    home.style.display = 'flex';
    leaderBoard.style.display = 'none';
    cameraBtn.style.display = 'flex'
    rightBtnText.innerHTML = "排行榜"
    rightBtnIcon.classList = "fa-solid fa-ranking-star"
    leftBtnText.innerHTML = "重新開局"
    leftBtnIcon.classList = "fa-solid fa-backward"
    topBoxText.innerHTML = "麻雀賽果"
    check = true
  }
})

leftBtn.addEventListener("click", function (e) {
  if (check2) {
    leaderBoard.style.display = 'none';
    home.style.display = 'none';
    cameraBtn.style.display = 'none'
    start.style.display = 'flex'
    rightBtnText.innerHTML = "排行榜"
    rightBtnIcon.classList = "fa-solid fa-ranking-star"
    leftBtnText.innerHTML = "開局"
    leftBtnIcon.classList = "fa-solid fa-backward"
    topBoxText.innerHTML = "今晚打老虎"
    check2 = false
    check = true

  } else {
    home.style.display = 'flex';
    leaderBoard.style.display = 'none';
    cameraBtn.style.display = 'flex'
    start.style.display = 'none'
    rightBtnText.innerHTML = "排行榜"
    rightBtnIcon.classList = "fa-solid fa-ranking-star"
    leftBtnText.innerHTML = "重新開局"
    leftBtnIcon.classList = "fa-solid fa-backward"
    topBoxText.innerHTML = "麻雀賽果"
    check2 = true
  }
})
const selector1 = document.querySelector(".selector1")
const eight = document.getElementById("8Radio")

selector1.addEventListener("click", function (e) {
  if (eight.checked) {
    console.log("yes")
  } else if (!eight.checked) {
    console.log("no")
  }
})

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
async function capture() {
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
  const res = await fetch('/camera', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: imageData }),
  })
  const result = res.json()
  if(result.success){
    console.log('Image saved successfully');
  } else {
    console.error('Failed to save the image');
  }
    // .then(response => {
    //   if (response.ok) {
    //     console.log('Image saved successfully');
    //   } else {
    //     console.error('Failed to save the image');
    //   }
    // })
    // .catch(error => {
    //   console.error('Error saving the image:', error);
    // });
}

// Event listener for the capture button
captureButton.addEventListener('click', capture);
