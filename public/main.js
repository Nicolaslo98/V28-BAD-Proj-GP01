import { genCamera, capture, stopCamera } from "./camera.js"

// function fetchExistingPlayer() {

// }

//Function: CreatePassword
function createPassword(roomName) {
  // let roomName = results.value
  Swal.fire({
    didOpen: () => {
    },
    html: `
    
    `,
    allowOutsideClick: false,
    title: "Create a unique password",
    input: "text",
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      } else if (value.length <= 5) {
        return "Password must be at least 6 letter long"
      }
    }
  }).then(async (result) => {
    if (result.isConfirmed) {
      console.log(`room_name: ${roomName} , password: ${result.value}`)
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
      console.log(await res.json())
    }
  })
}

//Function: Has Room 
function enterPassword(roomName) {
  Swal.fire({
    didOpen: () => {
    },
    html: `
    
    `,
    allowOutsideClick: false,
    title: "Enter password",
    input: "text",
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      } else if (value.length <= 2) {
        return "Password must be at least 2 letter long"
      }
    }
  }).then(async (result) => {
    if (result.isConfirmed) {
      console.log(`checking: ${roomName} ${result.value}`)
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
      //when password false
      if (!res.ok) {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Wrong Password",
        });
        enterPassword(roomName)
      } else if (res.ok) {
        console.log("check password")
        console.log(await res.json())
      }
    }
  })
}

export async function createJoinRoom() {
  const res = await fetch('/api/room', {
    method: 'GET',
  })
  const result = await res.json()
  if (result.haveSession) {
    return
  }
  let isNameValid = false
  while (!isNameValid) {
    await Swal.fire({
      didOpen: () => {
      },
      html: `
        <div class="roomPinCode">
          <input name="pinCode" type="text" 
          class="pinCode swal2-input" 
          id="pinCode" 
          inputmode="numeric" 
          maxlength="5">
        </div>
      `,
      allowOutsideClick: false,
      title: "Create or Join a room",
      showCancelButton: true,
      cancelButtonText: 'Join room',
      confirmButtonText: 'Create',
    }).then(async (result) => {
      //create
      if (result.isConfirmed) {
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
        if (!(await res.json()).success) {
          console.log("hi23412314")
          createPassword(roomName)
          isNameValid = true
          // createPassword(result)
          // isNameValid = true
        } else {
          await Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Has this room!",
          });
        }
      } //join
      else
        if (result.isDismissed) {
          const roomName = document.querySelector("#pinCode").value
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
          if (!(await res.json()).success) {
            console.log("Join button")
            await Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Cannot find this room!",
            });
            // createPassword(result)
            // isNameValid = true
          } else {
            enterPassword(roomName)
            isNameValid = true
          }
        }
    })
  }
}
createJoinRoom()



document.querySelectorAll(".players").forEach((element) => {
  element.addEventListener('click', async (e) => {
    try {
      const res = await fetch('/api/eplayer/room');
      const ePlayerData = (await res.json()).ePlayerData;

      let choosePlayerHTML = '';
      for (let i = 0; i < ePlayerData.length; i++) {
        const username = ePlayerData[i].username;
        console.log(username);
        choosePlayerHTML += `
        <option value="${username}">${username}</option>
        `;
      }
      // let choosePlayerHTML2 = '';
      // const userImage = ePlayerData[i].user_image;
      // console.log(userImage);
      // choosePlayerHTML2 += `
      //   <img class="existingPic"
      //                 src="../server/photo/${userImage}">
        // `
      


      Swal.fire({
        didOpen: () => {
          // document.querySelector(".choosePlayer").innerHTML = "No existing player detected"
        },
        html: `
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
                  ${choosePlayerHTML}
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
        if (result.isConfirmed) {
          Swal.fire({
            didOpen: () => {
              genCamera();
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
          }).then((result) => {
            console.log(result);
            if (result.isConfirmed) {
              const fetchData = capture();
              fetchData.append("username", result.value);
              console.log(fetchData);
              fetch('/api/user', {
                method: 'POST',
                body: fetchData,
              });
              document.querySelector(`#${e.target.id} ul .name`).innerHTML = `${result.value}`;
              document.querySelector(`#${e.target.id} ul .profilePicHolder .profilePic`).src = `https://scitechdaily.com/images/Potato-Sunlight.jpg`;
              stopCamera();
            } else {
              stopCamera();
            }
          });
        } else {
          // Handle cancel button clicked
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  });
});

// function genPlayer() {

// }




//run camera
document.querySelector(".cameraBtn").addEventListener("click", async function (e) {
  let isPhotoCorrect = 0

  while (!isPhotoCorrect) {
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
              html: `
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



//history
document.querySelector(".topBox i").addEventListener("click", async function (e) {
  const roomId = 2;
  const game = 2;
  try {
    const res = await fetch('/api/history/room/${roomId}/${game}');
    const historyData = (await res.json()).roundData;
    console.log(historyData);

    let roundHTML = '';
    let  historyScoreHTML= '';
    let  historyPlayerHTML= '';
   
    for (let i = 0; i < historyData.length; i++) {
      const playerE = historyData[i].player_e;
      const playerS = historyData[i].player_s;
      const playerW = historyData[i].player_w;
      const playerN = historyData[i].player_n;
      const scoreE = historyData[i].score_e;
      const scoreS = historyData[i].score_s;
      const scoreW = historyData[i].score_w;
      const scoreN = historyData[i].score_n;
      const round = historyData[i].id;

      roundHTML +=
      `<p class="roundInfo">${round}</p>`
      historyScoreHTML += 
      `<p id="">${scoreE}</p>
      <p id="">${scoreS}</p>
      <p id="">${scoreW}</p>
      <p id="">${scoreN}</p>`
      historyPlayerHTML +=  
      `<p class="timelinePlayer" id="player1">${playerE}</p>
      <p class="timelinePlayer" id="player2">${playerS}</p>
      <p class="timelinePlayer" id="player3">${playerW}</p>
      <p class="timelinePlayer" id="player4">${playerN}</p>`
    }
  Swal.fire({
    html: `
      <div class="timeline noScrollBar">
        <div class="timelineSpace"></div>
        <div class="timelineMatchInfo">
        ${roundHTML}
        ${historyScoreHTML}
        </div>       

        <div class="timelineInfo">
          <p class="round">局數</p>
          ${historyPlayerHTML}
        </div>
      </div>
    `,
    confirmButtonText: "Return"
  })
}catch (error){
  console.error('Error:', error);
}
});


//rank
