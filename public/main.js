import { genCamera, capture, stopCamera } from "./camera.js"

function fetchExistingPlayer() {
  
}

document.querySelectorAll(".players").forEach((element) => {
  element.addEventListener('click', async (e) => {
    let testDummy = "potato"
    Swal.fire({
      didOpen: () => {
        // document.querySelector(".choosePlayer").innerHTML = "No existing player detected"
      },
      html:`
        <div class="choosePlayer">
          <div class="existingPlayer">
            <ul>
              <li class="existingPicHolder">
                  <img class="existingPic"
                      src="https://pbs.twimg.com/profile_images/521554275713830913/TBY5IslL_400x400.jpeg">
              </li>
              <form class="existingNameForm">
                <label for="existingName">Name</label>
                <select name="existingName" id="existingName">
                  <option value="${testDummy}">${testDummy}</option>
                  <option value="${testDummy}">${testDummy}</option>
                  <option value="${testDummy}">${testDummy}</option>
                  <option value="${testDummy}">${testDummy}</option> 
                </select>
              </form>
            </ul>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Select',
      cancelButtonText: 'Add new player'
    }).then((result) => {
      if (result.isConfirmed){
        console.log("nice")
      } else {
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
          }
        }).then( (result) => {
          console.log(result)
          if (result.isConfirmed) {
            const fetchData = capture()
            fetchData.append("username", result.value)
            console.log(fetchData)
            fetch('/api/user', {
              method: 'POST',
              body: fetchData,
            })
            document.querySelector(`#${e.target.id} ul .name`).innerHTML = `${result.value}`
            document.querySelector(`#${e.target.id} ul .profilePicHolder .profilePic`).src = `https://scitechdaily.com/images/Potato-Sunlight.jpg`
            stopCamera()
          } else {
            stopCamera()
          }
        })
      }
    })





    
  });
})

// function genPlayer() {
  
// }




//run camera
document.querySelector(".cameraBtn").addEventListener("click", async function (e) {
  let isPhotoCorrect = 0

  while (!isPhotoCorrect){
    await Swal.fire({
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        capture()
        const fetchData = capture()
        fetch('/api/camera', {
          method: 'POST',
          body: fetchData,
        })
        stopCamera()
        await Swal.fire({
          title: "Is this correct?",
          allowOutsideClick: false,
          text: "🀙🀙🀙🀚🀚🀚🀛🀛🀛🀜🀜🀜🀡🀡",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
          cancelButtonText: "Retry"
        }).then(async (result) => {
          if (result.isConfirmed) {

            let testDummy = "potato"
            await Swal.fire({
              didOpen: () => {
                // const playerList = fetchPlayer()
              },
              title: "Select Winner and Loser",
              allowOutsideClick: false,
              html:`
              <p>🀙🀙🀙🀚🀚🀚🀛🀛🀛🀜🀜🀜🀡🀡</p>
              <form class="dropSelect">
                <label for="winner">Winner</label>
                <select name="winner" id="winner">
                  <option value="${testDummy}">${testDummy}</option>
                  <option value="${testDummy}">${testDummy}</option>
                  <option value="${testDummy}">${testDummy}</option>
                  <option value="${testDummy}">${testDummy}</option>
                </select>
                <label for="loser">Loser</label>
                <select name="loser" id="loser">
                  <option value="${testDummy}">${testDummy}</option>
                  <option value="${testDummy}">${testDummy}</option>
                  <option value="${testDummy}">${testDummy}</option>
                  <option value="none">None</option>
                </select>
              </form>
              `,
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes",
              cancelButtonText: "Retry"
            }).then((result) => {
              if (result.isConfirmed) {
                isPhotoCorrect = 1
              }
            });
          }
        });
      } else {
        stopCamera()
        isPhotoCorrect = 1
      }
    })  
  }
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

