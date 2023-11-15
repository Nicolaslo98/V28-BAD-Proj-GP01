import { genCamera, capture, stopCamera } from "./camera.js"
import { fanLimit } from "./starting.js"
let chosenWinner = ''
let chosenLoser = ''
let maxFanLimit = ""
let positionArr = []
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
    title: "建立密碼",
    input: "text",
    confirmButtonColor: `#B0926A`,
    inputValidator: (value) => {
      if (!value) {
        return "你需要寫點東西！";
      } else if (value.length <= 5) {
        return "密碼長度必須至少 6 個字母"
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
    title: "輸入密碼",
    input: "text",
    inputValidator: (value) => {
      if (!value) {
        return "你需要寫點東西！";
      } else if (value.length <= 2) {
        return "密碼長度必須至少 6 個字母"
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
          icon: "錯誤",
          title: "哎呀...",
          text: "密碼錯誤",
        });
        enterPassword(roomName)
      } else if (res.ok) {
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
      title: "創建或加入房間",
      showCancelButton: true,
      cancelButtonText: '加入房間',
      confirmButtonText: '創建房間',
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
            icon: "錯誤",
            title: "哎呀...",
            text: "這個房間存在！",
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
              icon: "錯誤",
              title: "哎呀...",
              text: "找不到這個房間！",
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
          inputPlaceholder: "輸入名字",
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return "你需要寫點東西！";
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
              document.querySelector(".choosePlayer").innerHTML = "未偵測到現有玩家"
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
          confirmButtonText: '新增玩家',
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
              inputPlaceholder: "輸入名字",
              showCancelButton: true,
              inputValidator: (value) => {
                if (!value) {
                  return "你需要寫點東西！";
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
        stopCamera()
        await Swal.fire({
          didOpen: async () => {
            const fanSelect = document.querySelector('#fanSelect')
            const getFan = await fetch('/api/ai', {
              method: 'GET',
            })
            const fan = await getFan.json()
            console.log(fan.faanValue.value)
            if (fan.faanValue.value >= maxFanLimit.fan) {
              fan.faanValue.value = maxFanLimit.fan 
              fanSelect.innerHTML = ''
              fanSelect.innerHTML += `<option value="${fan.faanValue.value}">${fan.faanValue.value}</option>`
              for (let i = 3; i <= maxFanLimit.fan; i++) {
                fanSelect.innerHTML += `<option value="${i.toString()}">${i.toString()}</option>`
              }
            }
          },
          title: "是否正確？",
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
              let selfEat = false;
              for (let i of document.querySelectorAll(".players")) {
                const username = document.querySelector(`#${i.id} ul .name`).innerHTML
                const userimage = document.querySelector(`#${i.id} ul .profilePic`).src
                const userid = document.querySelector(`#${i.id} ul .name`).id

                winnerHTML += `
                <div class="winnerPicHolder col-3" id="${i.id}.1">
                  <img class="winnerPic" src="${userimage}">  
                  <p>${username}</p>
                </div>
                `;
                loserHTML += `
                <div class="loserPicHolder col-3" id="${i.id}.2">
                  <img class="loserPic" src="${userimage}">  
                  <p>${username}</p>
                </div>
                `;
              }
              await Swal.fire({
                didOpen: () => {
                  document.querySelector("#isSelfEat").addEventListener("change", function(e){
                    selfEat = !selfEat
                    if (!selfEat){
                      for (let i of document.querySelectorAll(".loserPicHolder")){
                        i.style["pointer-events"] = "auto";
                        i.style.opacity = "1"
                      }
                      for (let i of document.querySelectorAll(".loserPicHolder img")){
                        i.style.outline = "none"
                      }
                      if(chosenWinner){
                        document.querySelector(`[id="${chosenWinner}.2"]`).style["pointer-events"] = "none"
                        document.querySelector(`[id="${chosenWinner}.2"]`).style.opacity = "0.3"
                        document.querySelector(`[id="${chosenWinner}.2"] img`).style.outline = "none"
                        chosenLoser = ""
                        console.log(`new loser = ${chosenLoser}`)
                      }
                    }else{
                      if(chosenWinner){
                        chosenLoser = []
                        for (let i of document.querySelectorAll(".loserPicHolder")){
                          i.style["pointer-events"] = "none"                 
                          i.style.opacity = "0.8"       
                          if (i.id.split(".")[0] === chosenWinner){
                            i.style.opacity = "0.3"
                          }else {
                            document.querySelector(`[id="${i.id}"] img`).style.outline = "3px solid green"
                            chosenLoser.push(i.id.split(".")[0])
                          }
                        }
                        
                        console.log(`new loser = ${chosenLoser}`)
                      }
                    }
                  })
                  document.querySelectorAll(".winnerPicHolder").forEach((element) => {
                    element.addEventListener('click', async (e) => {
                      chosenWinner = e.target.id.split(".")[0]
                      console.log(`winner is ${chosenWinner}`)
                      for (let i of document.querySelectorAll(".winnerPic")) {
                        i.style.outline = "none";
                      }
                      for (let i of document.querySelectorAll(".loserPicHolder")){
                        i.style["pointer-events"] = "auto";
                        i.style.opacity = "1"
                      }
                      for (let i of document.querySelectorAll(".loserPicHolder img")){
                        i.style.outline = "none"
                      }
                      document.querySelector(`.winnerRow [id="${e.target.id}"] img`).style.outline = "3px solid green"
                      if(!selfEat){
                        document.querySelector(`[id="${e.target.id.split(".")[0]}.2"]`).style["pointer-events"] = "none"
                        document.querySelector(`[id="${e.target.id.split(".")[0]}.2"]`).style.opacity = "0.3"
                        document.querySelector(`[id="${e.target.id.split(".")[0]}.2"] img`).style.outline = "none"
                        if (chosenLoser === `${e.target.id.split(".")[0]}`){
                          chosenLoser = []
                          console.log(`new loser = ${chosenLoser}`)
                        }
                      } else {
                        chosenLoser = []
                        for (let i of document.querySelectorAll(".loserPicHolder")){
                          i.style["pointer-events"] = "none"                 
                          i.style.opacity = "0.8"       
                          if (i.id.split(".")[0] === chosenWinner){
                            i.style.opacity = "0.3"
                          }else {
                            document.querySelector(`[id="${i.id}"] img`).style.outline = "3px solid green"
                            chosenLoser.push(i.id.split(".")[0])
                          }
                        }
                        console.log(`new loser = ${chosenLoser}`)
                      }
                    })
                  })
                  document.querySelectorAll(".loserPicHolder").forEach((element) => {
                    element.addEventListener('click', async (e) => {
                      chosenLoser = [e.target.id.split(".")[0]]
                      console.log(`loser is ${chosenLoser}`)
                      for (let i of document.querySelectorAll(".loserPic")) {
                        i.style.outline = "none"
                      }
                      document.querySelector(`.loserRow [id="${e.target.id}"] img`).style.outline = "3px solid green"
                    })
                  })

                },
                title: "選擇贏家和輸家",
                html: `
              <p>🀙🀙🀙🀚🀚🀚🀛🀛🀛🀜🀜🀜🀡🀡</p>
              <div class="container-fluid confirmWinnerContainer">
                <div class="row winnerRow"> 
                  ${winnerHTML}
                </div>
                <div class="row loserRow"> 
                  ${loserHTML}
                </div>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" id="isSelfEat">
                  <label class="form-check-label" for="isSelfEat">自摸</label>
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



