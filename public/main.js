import { genCamera, capture, stopCamera } from "./camera.js"
import { fanLimit } from "./starting.js"

let maxFanLimit = ""
let chosenWinner = ""
let chosenLoser = ""
window.onload = async () => {
  createJoinRoom()
  maxFanLimit = await fanLimit()
  console.log(maxFanLimit)
}

//Function: Don't have room createPassword
function createPassword(roomName) {
  Swal.fire({
    didOpen: () => {
    },
    html: `
    
    `,
    allowOutsideClick: false,
    title: "Create a unique password",
    input: "text",
    confirmButtonColor: `#B0926A`,
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

//Function: Has Room then enterPassword 
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

//Function: Create Room
async function createJoinRoom() {
  const res = await fetch('/api/room', {
    method: 'GET',
  })
  const result = await res.json()
  if (result.haveSession) {
    return
  }
  let isNameValid = false
  console.log("1")
  while (!isNameValid) {
    console.log("2")
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
      confirmButtonColor: `#B0926A`,
      cancelButtonColor: `#706233`,
      allowOutsideClick: false,
      title: "Create or Join a room",
      showCancelButton: true,
      cancelButtonText: 'Join room',
      confirmButtonText: 'Create',
    }).then(async (result) => {
      //create
      if (result.isConfirmed && document.querySelector("#pinCode").value) {
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
        if (result.isDismissed && document.querySelector("#pinCode").value) {
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
              confirmButtonColor: `#B0926A`,
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


//Function: Call player
document.querySelectorAll(".players").forEach((element) => {
  element.addEventListener('click', async (e) => {
    try {
      const res = await fetch('/api/eplayer/room');
      const result = await res.json()
      console.log(result)
      if (!result.ePlayerData[0]){
        Swal.fire({
          didOpen: () => {
            genCamera();
          },
          html: `
            <form class="playerVideoContainer">
              <video id="video" autoplay playsInline muted>
                <canvas id="canvas" width="480" height="640"></canvas>
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
        }).then(async (result) => {
          if (result.isConfirmed) {
            const fetchData = capture();
            console.log(fetchData);
            fetchData.append("username", result.value);
            const result2 = await fetch('/api/user', {
              method: 'POST',
              body: fetchData,
            });
            const result3 = await result2.json();
            document.querySelector(`#${e.target.id} ul .name`).innerHTML = `${result.value}`;
            document.querySelector(`#${e.target.id} ul .name`).id = `${result3.imageData[0].id}`;
            document.querySelector(`#${e.target.id} ul .profilePicHolder .profilePic`).src = `./image/${result3.imageData[0].user_image}`;
            await stopCamera();
          } else {
            await stopCamera();
          }
        });
      }else {
        const ePlayerData = result.ePlayerData;
        let choosePlayerHTML = '';
        for (let i = 0; i < ePlayerData.length; i++) {
          const username = ePlayerData[i].username;
          const userimage = ePlayerData[i].user_image;
          const userid = ePlayerData[i].id

          choosePlayerHTML += `
          <option value="${userimage}_${userid}">${username}</option>
          `;
        }
        Swal.fire({
          didOpen: () => {
            let existingName = document.querySelector("#existingName")
            let existingPic = document.querySelector(".existingPic")
            if (existingName.innerHTML) {
  
              existingName.addEventListener('change', function (e) {
                existingPic.src = `./image/${e.target.value.split("_")[0]}`
              })
            } else {
              document.querySelector(".choosePlayer").innerHTML = "No existing player detected"
            }
          },
          html: `
          <div class="choosePlayer">
            <div class="existingPlayer">
              <ul>
                <li class="existingPicHolder">
                  <img class="existingPic"
                  src="/image/${ePlayerData[0].user_image}">
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
                    <canvas id="canvas" width="480" height="640"></canvas>
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
            }).then(async (result) => {
              if (result.isConfirmed) {
                const fetchData = capture();
                console.log(fetchData);
                fetchData.append("username", result.value);
                const result2 = await fetch('/api/user', {
                  method: 'POST',
                  body: fetchData,
                });
                const result3 = await result2.json();
                document.querySelector(`#${e.target.id} ul .name`).innerHTML = `${result.value}`;
                document.querySelector(`#${e.target.id} ul .name`).id = `${result3.imageData[0].id}`;
                document.querySelector(`#${e.target.id} ul .profilePicHolder .profilePic`).src = `./image/${result3.imageData[0].user_image}`;
                await stopCamera();
              } else {
                await stopCamera();
              }
            });
          } else if (result.isDismissed) {
            const selectedName = document.querySelector("#existingName option:checked").innerText
  
            if (selectedName) {
  
              for (let i of document.querySelectorAll(".players")) {
                console.log(i.id)
                if (document.querySelector(`#${i.id} .name`).innerHTML === selectedName) {
                  console.log("fuck you")
                  document.querySelector(`#${i.id} .name`).innerHTML = ("");
                  document.querySelector(`#${i.id} .name`).id = ``;
                  document.querySelector(`#${i.id} .profilePicHolder .profilePic`).src = `https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg`;
                }
              }
  
  
  
              document.querySelector(`#${e.target.id} ul .name`).innerHTML = `${selectedName}`;
              document.querySelector(`#${e.target.id} ul .name`).id = `${document.querySelector("#existingName").value.split("_")[1]}`;
              document.querySelector(`#${e.target.id} ul .profilePicHolder .profilePic`).src = `./image/${document.querySelector("#existingName").value.split("_")[0]}`;
            } else {
              document.querySelector(`#${e.target.id} ul .name`).innerHTML = ("");
              document.querySelector(`#${e.target.id} ul .profilePicHolder .profilePic`).src = `https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg`;
            }
            // Handle cancel button clicked
          }
        });
      }


    } catch (error) {
      console.error('Error:', error);
    }
  });
});


//Function: Run camera
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
        await stopCamera()
        console.log(await maxFanLimit)
        await Swal.fire({
          didOpen: () => {
            const fanSelect = document.querySelector('#fanSelect')
            const getFan = fetch('/api/ai', {
              method: 'GET',
            })
            console.log(getFan.json())
            fanSelect.innerHTML = ''
            for (let i = 3; i <= maxFanLimit.fan; i++) {
              fanSelect.innerHTML += `<option value="${i.toString()}">${i.toString()}</option>`
            }
          },
          title: "Is this correct?",
          text: "winningHand.toString()",
          html: `
          <form class="fanDropSelectForm">
            <label for="fanSelect">fanSelect</label>
            <select name="fanSelect" id="fanSelect">
              
            </select>
        </form>
          `,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
          cancelButtonText: "Retry"
        })
          .then(async (result) => {
            if (result.isConfirmed) {
              document.querySelectorAll(".players")
              let winnerHTML = '';
              let loserHTML = '';
              for (let i of document.querySelectorAll(".players")) {
                const username = document.querySelector(`#${i.id} ul .name`).innerHTML
                const userimage = document.querySelector(`#${i.id} ul .profilePic`).src
                const userid = document.querySelector(`#${i.id} ul .name`).id

                winnerHTML += `
                <div class="winnerPicHolder col-3" id="${userid}.1">
                  <img class="winnerPic" src="${userimage}">  
                  <p>${username}</p>
                </div>
                `;
                loserHTML += `
                <div class="winnerPicHolder col-3" id="${userid}.2">
                  <img class="winnerPic" src="${userimage}">  
                  <p>${username}</p>
                </div>
                `;
              }
              await Swal.fire({
                didOpen: () => {
                  document.querySelectorAll(".winnerPicHolder").forEach((element) => {
                    element.addEventListener('click', async (e) => {
                      chosenWinner = document.querySelector(`#${e.target.id} p`).innerHTML
                      console.log(chosenWinner)
                      for (let i of document.querySelectorAll(".winnerPic")) {
                        i.style.outline = "none"
                      }
                      document.querySelector(`.winnerRow #${e.target.id} img`).style.outline = "3px solid green"
                    })
                  })
                  document.querySelectorAll(".loserPicHolder").forEach((element) => {
                    element.addEventListener('click', async (e) => {
                      chosenWinner = document.querySelector(`#${e.target.id} p`).innerHTML
                      console.log(chosenWinner)
                      for (let i of document.querySelectorAll(".loserPic")) {
                        i.style.outline = "none"
                      }
                      document.querySelector(`.loserRow #${e.target.id} img`).style.outline = "3px solid green"
                    })
                  })

                },
                title: "Select Winner and Loser",
                html: `
              <p>🀙🀙🀙🀚🀚🀚🀛🀛🀛🀜🀜🀜🀡🀡</p>
              <div class="container-fluid confirmWinnerContainer">
                <div class="row winnerRow"> 
                  ${winnerHTML}
                </div>
                <div class="row loserRow"> 
                  ${loserHTML}
                </div>

              </div>
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
        await stopCamera()
        isPhotoCorrect = 1
      }
    })
  }
})



document.querySelector(".topBox i:nth-child(2)").addEventListener("click", async function (e) {
  try {
    const res = await fetch('/api/history/game');
    const historyData = (await res.json()).roundData;
    console.log(historyData);

    let historyPlayerHTML = '';

    let historyScoreHTML = '';

    for (let i = 0; i < historyData.length; i++) {
      const scoreE = historyData[i].score_e;
      const scoreS = historyData[i].score_s;
      const scoreW = historyData[i].score_w;
      const scoreN = historyData[i].score_n;
      const round = (historyData[i].id) - 1;

      historyScoreHTML +=
        `
        <div class="timelineMatchInfo">
          <p class="roundInfo">${round}</p>
          <p id="">${scoreE}</p>
          <p id="">${scoreS}</p>
          <p id="">${scoreW}</p>
          <p id="">${scoreN}</p>
        </div> 
        `
    }
    Swal.fire({
      html: `
      <div class="timeline noScrollBar">
        <div class="timelineSpace"></div>
        ${historyScoreHTML}
             
        <div class="timelineInfo">
          <p class="round">局數</p>
          <p class="timelinePlayer" id="player1">東</p>
          <p class="timelinePlayer" id="player2">南</p>
          <p class="timelinePlayer" id="player3">西</p>
          <p class="timelinePlayer" id="player4">北</p>
        </div>
      </div>
    `,
      confirmButtonText: "Return"
    })
  } catch (error) {
    console.error('Error:', error);
  }
});



// Swal.fire({
//   html: `
//   <div class="container-fluid confirmWinnerContainer">
//     <div class="row"> 
//       <div class="winnerPicHolder col-3" id="test1">
//         <img class="winnerPic" src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg">  
//         <p>Potato1</p>
//       </div>
//       <div class="winnerPicHolder col-3" id="test2">
//         <img class="winnerPic" src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg">
//         <p>Potato2</p>
//       </div>
//       <div class="winnerPicHolder col-3" id="test3">
//         <img class="winnerPic" src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg">
//         <p>Potato3</p>
//       </div>
//       <div class="winnerPicHolder col-3" id="test4">
//         <img class="winnerPic" src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg">
//         <p>Potato4</p>
//       </div>
//     </div>

//   </div>
  
//   `
// })

