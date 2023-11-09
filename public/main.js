import { genCamera, capture, stopCamera } from "./camera.js"

// function fetchExistingPlayer() {
  
// }
function createPassword(results){
  let roomName = results.value
  Swal.fire({
    didOpen: () => {
    },
    html:`
    
    `,
    allowOutsideClick: false,
    title: "Create a unique password",
    input: "text",
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      } else if (value.length <= 5){
        return "Password must be at least 6 letter long"
      } 
    }
  }).then(async (result) => {
    if (result.isConfirmed){
      console.log(`${roomName} ${result.value}`)
      const FormData = {
        room_name: roomName,
        password: result.value
      }
      const res = await fetch('/api/room/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(FormData),
      })
    }
  })
}
function enterPassword(){
  let roomName = results.value
  Swal.fire({
    didOpen: () => {
    },
    html:`
    
    `,
    allowOutsideClick: false,
    title: "Enter password",
    input: "text",
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      } else if (value.length <= 5){
        return "Password must be at least 6 letter long"
      } 
    }
  }).then(async (result) => {
    if (result.isConfirmed){
      console.log(`${roomName} ${result.value}`)
      const FormData = {
        room_name: roomName,
        password: result.value
      }
      const res = await fetch('/api/room/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(FormData),
      })
    }
  })
}
async function createJoinRoom(){
  const isNameValid = false
  while (!isNameValid){
    await Swal.fire({
      didOpen: () => {
      },
      html:`
        <div class="roomPinCode">
          <input name="pinCode" type="text" class="pinCode swal2-input" id="pinCode" inputmode="numeric" maxlength="5">
        </div>
      `,
      allowOutsideClick: false,
      title: "Create or Join a room",
      showCancelButton: true,
      cancelButtonText: 'Join room',
      confirmButtonText:'Create',
    }).then(async(result) => {
      if (result.isConfirmed){
        const roomName = document.querySelector("#pinCode").value
        console.log(roomName)
        const FormData = {
          room_name: roomName,
        }
        const res = await fetch('/api/room/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(FormData),
        })
        const result = await res.json()
        if (result){
          console.log(result)
          // createPassword(result)
          // isNameValid = true
        }


      } else {
        const FormData = {
          room_name: result.value,
        }
        const res = await fetch('/api/room', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(FormData),
        })
        const result = await res.json()
        if (result){
          console.log(result)
          // enterPassword(result)
          // isNameValid = true
        }
      }
    })
  }
}



createJoinRoom()


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
      confirmButtonText: 'Add new player',
      cancelButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed){
        Swal.fire({
          didOpen: () => {
            genCamera()
          },
          html: `
            <form class="playerVideoContainer">
              <video id="video" autoplay playsInline muted>
                  <canvas id="canvas" width="640" height="480"></canvas>
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
      } else {
        
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

//history
