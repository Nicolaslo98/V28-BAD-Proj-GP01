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
const settingBtn = document.querySelector(".settingBtn")
const rightBtnText = document.querySelector(".rightBtn p")
const rightBtnIcon = document.querySelector(".rightBtn i")
const leftBtnText = document.querySelector(".leftBtn p")
const leftBtnIcon = document.querySelector(".leftBtn i")
const topBoxText = document.querySelector(".topBox p")
const topBoxIcon = document.querySelector(".topBox i")
let check = true
let check2 = true

//call camera
function genCamera(){
  // Get references to HTML elements
  const video = document.getElementById('video');
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
  
}

//camera capture 
function capture() {
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

  // Save the image data to the server
  fetch('/api/camera', {
    method: 'POST',
    body: fetchData,
  })
}

//run camera
document.querySelector(".cameraBtn").addEventListener("click", function(e){
  Swal.fire({
    didOpen: () => {
      genCamera()
    },
    html:`
      <div class="videoContainer">
        <video id="video" autoplay playsInline muted>
            <canvas id="canvas"></canvas>
        </video>
      </div>
    `,
    width: '100%',
    confirmButtonText: 'Capture'
  }).then((result) => {
    if (result.isConfirmed) {
      capture()
    }
  })
})



topBoxIcon.addEventListener("click", function(e){
  Swal.fire({
    html:`
      <div class="timeline noScrollBar">
        <div class="timelineSpace"></div>
        <div class="timelineMatchInfo">
          <p class="roundInfo">1</p>
          <p id="">0</p>
          <p id="">0</p>
          <p id="">-8</p>
          <p id="">+4</p>
        </div>
        <div class="timelineMatchInfo">
          <p class="roundInfo">2</p>
          <p id="">0</p>
          <p id="">0</p>
          <p id="">-8</p>
          <p id="">+4</p>
        </div>
        <div class="timelineMatchInfo">
          <p class="roundInfo">3</p>
          <p id="">0</p>
          <p id="">0</p>
          <p id="">-8</p>
          <p id="">+4</p>
        </div>
        <div class="timelineMatchInfo">
          <p class="roundInfo">4</p>
          <p id="">1204</p>
          <p id="">0</p>
          <p id="">0</p>
          <p id="">-1204</p>
        </div>
        

        <div class="timelineInfo">
          <p class="round">局數</p>
          <p class="timelinePlayer" id="player1">玩家1</p>
          <p class="timelinePlayer" id="player2">玩家2</p>
          <p class="timelinePlayer" id="player3">玩家3</p>
          <p class="timelinePlayer" id="player4">玩家4</p>
        </div>
      </div>
    `,
    confirmButtonText: "Return"
  })
})

settingBtn.addEventListener("click", function(e){
  Swal.fire({
    html:`
    <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" role="switch" id="theme">
    <label class="form-check-label" for="theme">Theme</label>
    </div>
    <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" role="switch" id="language">
    <label class="form-check-label" for="language">Language</label>
    </div>
    `,
    confirmButtonText: "Return"
  });
})


rightBtn.addEventListener("click", function (e) {
  if (check) {
    leaderBoard.style.display = 'flex';
    home.style.display = 'none';
    cameraBtn.style.display = 'none'
    settingBtn.style.display = 'flex'
    start.style.display = 'none'
    rightBtnText.innerHTML = "現時賽果"
    rightBtnIcon.classList = "fa-solid fa-house"
    leftBtnText.innerHTML = "重新開局"
    leftBtnIcon.classList = "fa-solid fa-backward"
    topBoxText.innerHTML = "麻雀排行榜"
    topBoxIcon.style.display= 'none'
    check = false
    check2 = true

  } else {
    home.style.display = 'flex';
    leaderBoard.style.display = 'none';
    cameraBtn.style.display = 'flex'
    settingBtn.style.display = 'none'
    rightBtnText.innerHTML = "排行榜"
    rightBtnIcon.classList = "fa-solid fa-ranking-star"
    leftBtnText.innerHTML = "重新開局"
    leftBtnIcon.classList = "fa-solid fa-backward"
    topBoxText.innerHTML = "麻雀賽果"
    topBoxIcon.style.display= 'flex'
    check = true
  }
})
leftBtn.addEventListener("click", function(e){
  if (check2) {
    leaderBoard.style.display = 'none';
    home.style.display = 'none';
    cameraBtn.style.display = 'none'
    settingBtn.style.display = 'none'
    start.style.display = 'flex'
    rightBtnText.innerHTML = "排行榜"
    rightBtnIcon.classList = "fa-solid fa-ranking-star"
    leftBtnText.innerHTML = "開局"
    leftBtnIcon.classList = "fa-solid fa-backward"
    topBoxText.innerHTML = "今晚打老虎"
    topBoxIcon.style.display= 'none'
    check2 = false
    check = true

  } else {
    home.style.display = 'flex';
    leaderBoard.style.display = 'none';
    cameraBtn.style.display = 'flex'
    settingBtn.style.display = 'none'
    start.style.display = 'none'
    rightBtnText.innerHTML = "排行榜"
    rightBtnIcon.classList = "fa-solid fa-ranking-star"
    leftBtnText.innerHTML = "重新開局"
    leftBtnIcon.classList = "fa-solid fa-backward"
    topBoxText.innerHTML = "麻雀賽果"
    topBoxIcon.style.display= 'flex'
    check2 = true
  }
})



function genFan(fan){
  startRow.innerHTML=''
      for (let i = 3; i <= fan; i++){
        startRow.innerHTML += `
        <div class="col-6">
          <p>${i} 番</p>
          <input class="form-control" type="text" placeholder="" aria-label="default input example">
        </div>
        `
      }
}
const startRow = document.querySelector(".startBox .container-fluid .row")
document.querySelectorAll(".selector1 input").forEach((element) => {
  element.addEventListener('click', async (e) => {
    if(e.target.id === "8Radio"){
      genFan(8)
    } else if(e.target.id === "10Radio"){
      genFan(10)
    } else{
      genFan(13)
    }
    
    
  });
})




function capture() {
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

  // Save the image data to the server
  fetch('/api/camera', {
    method: 'POST',
    body: fetchData,
  })
}