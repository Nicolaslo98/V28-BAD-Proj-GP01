import { genCamera, capture, stopCamera } from "./camera.js"



document.querySelectorAll(".players").forEach((element) => {
  element.addEventListener('click', async (e) => {
    Swal.fire({
      didOpen: () => {
        genCamera()
      },
      allowOutsideClick: false,
      html: `
        <form class="playerVideoContainer">
          <video id="video" autoplay playsInline muted>
              <canvas id="canvas"></canvas>
          </video>
        </form>
      `,
      input: "text",
      inputPlaceholder: "Enter Name",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
        console.log(value)
        document.querySelector(`#${e.target.id} ul .name`).innerHTML = `${value}`
      }
    }).then((result) => {
      console.log(result)
      if (result.isConfirmed) {
        const fetchData = capture()
        fetchData.append("username", result.value)
        console.log(fetchData)
        fetch('/api/user', {
          method: 'POST',
          body: fetchData,
        })
        stopCamera()
      } else {
        stopCamera()
      }
    })


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



//run camera
document.querySelector(".cameraBtn").addEventListener("click", function (e) {
  Swal.fire({
    didOpen: () => {
      genCamera()
    },
    showCancelButton: true,
    allowOutsideClick: false,
    html: `
      <div class="mainVideoContainer">
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
      const fetchData = capture()
      fetch('/api/camera', {
        method: 'POST',
        body: fetchData,
      })
      stopCamera()
    } else {
      stopCamera()
    }
  })
})


document.querySelector(".topBox i").addEventListener("click", function (e) {
  Swal.fire({
    html: `
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

