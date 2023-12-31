const leaderBoard = document.querySelector(".leaderBoardBox")
const home = document.querySelector(".box")
const start = document.querySelector(".startBox")
const rightBtn = document.querySelector(".rightBtn")
const leftBtn = document.querySelector(".leftBtn")
const settingBtn = document.querySelector(".settingBtn")
const rightBtnText = document.querySelector(".rightBtn p")
const rightBtnIcon = document.querySelector(".rightBtn i")
const leftBtnText = document.querySelector(".leftBtn p")
const leftBtnIcon = document.querySelector(".leftBtn i")
const topBoxText = document.querySelector(".topBox p")
const topBoxIcon = document.querySelector(".topBox i:nth-child(2)")
let check = true
let check2 = false
const cameraBtn = document.querySelector(".cameraBtn")
const startingBtn = document.querySelector(".startingBtn")
let showBottomBtn = startingBtn
import { rank } from './ranking.js';

settingBtn.addEventListener("click", function (e) {
  Swal.fire({
    html: `
      <div class="form-check form-switch settingForm">
      <input class="form-check-input" type="checkbox" role="switch" id="theme">
      <label class="form-check-label" for="theme">Theme</label>
      </div>
      <div class="form-check form-switch settingForm">
      <input class="form-check-input" type="checkbox" role="switch" id="language">
      <label class="form-check-label" for="language">Language</label>
      </div>
      `,
    confirmButtonText: "Return"
  });
})
document.querySelector(".startingBtn").addEventListener("click", async function (e) {
  const players = document.querySelectorAll(".name")
  const formData = []

  //got rid of check for dev
  // const formData = ["1", "2", "3", "4"]

  let isName = true
  for (let i of players) {
    if (!i.innerHTML) {
      isName = false
    } else {
      formData.push(i.id)
    }
  }

  if (isName) {
    const formObject = {
      player_e: formData[2],
      player_s: formData[3],
      player_w: formData[1],
      player_n: formData[0],
    }
    const res = await fetch('/api/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formObject)
    });
    const result = await res.json();
    const gameId = result.startData[0].id;
    localStorage.setItem("gameId", gameId)
    startingBtn.style.display = 'none';
    cameraBtn.style.display = 'flex';
    showBottomBtn = cameraBtn
    for (let i of document.querySelectorAll(".players")) {
      i.style["pointer-events"] = "none"
    }
  }





})


rightBtn.addEventListener("click", function (e) {
  if (check) {
    leaderBoard.style.display = 'flex';
    rank()
    home.style.display = 'none';
    showBottomBtn.style.display = 'none'
    settingBtn.style.display = 'flex'
    start.style.display = 'none'
    rightBtnText.innerHTML = "現時賽果"
    rightBtnIcon.classList = "fa-solid fa-house"
    leftBtnText.innerHTML = "重新開局"
    leftBtnIcon.classList = "fa-solid fa-backward"
    topBoxText.innerHTML = "麻雀排行榜"
    topBoxIcon.style.display = 'none'
    check = false
    check2 = true

  } else {
    home.style.display = 'flex';
    leaderBoard.style.display = 'none';
    showBottomBtn.style.display = 'flex'
    settingBtn.style.display = 'none'
    rightBtnText.innerHTML = "排行榜"
    rightBtnIcon.classList = "fa-solid fa-ranking-star"
    leftBtnText.innerHTML = "重新開局"
    leftBtnIcon.classList = "fa-solid fa-backward"
    topBoxText.innerHTML = "麻雀賽果"
    topBoxIcon.style.display = 'flex'
    check = true
  }
})

leftBtn.addEventListener("click", function (e) {
  if (check2) {

    if (document.querySelector(".players").style["pointer-events"] === "none") {
      Swal.fire({
        title: "你確定嗎？",
        text: "選定的玩家將被抹去！",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "刪除",
        cancelButtonText: "取消"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "刪除了！",
            text: "您選擇的玩家已被刪除。",
            icon: "success"
          });
          leaderBoard.style.display = 'none';
          home.style.display = 'none';
          showBottomBtn.style.display = 'none'
          settingBtn.style.display = 'none'
          start.style.display = 'flex'
          rightBtnText.innerHTML = "排行榜"
          rightBtnIcon.classList = "fa-solid fa-ranking-star"
          leftBtnText.innerHTML = "開局"
          leftBtnIcon.classList = "fa-solid fa-backward"
          topBoxText.innerHTML = "今晚打老虎"
          topBoxIcon.style.display = 'none'
          check2 = false
          check = true
          showBottomBtn = startingBtn
          for (let i of document.querySelectorAll(".players")) {
            i.style["pointer-events"] = "auto"
            document.querySelector(`#${i.id} ul .profilePicHolder img`).src = "https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"
            document.querySelector(`#${i.id} ul .name`).innerHTML = ""
            document.querySelector(`#${i.id} ul .name`).id = ""
            document.querySelector(`#${i.id} ul .score`).innerHTML = "分數: 0"

          }
        }
      });
    } else {
      home.style.display = 'none';
      leaderBoard.style.display = 'none';
      showBottomBtn.style.display = 'none'
      settingBtn.style.display = 'none'
      start.style.display = 'flex'
      rightBtnText.innerHTML = "排行榜"
      rightBtnIcon.classList = "fa-solid fa-ranking-star"
      leftBtnText.innerHTML = "開局"
      leftBtnIcon.classList = "fa-solid fa-backward"
      topBoxText.innerHTML = "今晚打老虎"
      topBoxIcon.style.display = 'none'
      check2 = false
      check = true
    }

  } else {

    const isFanInputEmpty = document.querySelectorAll(".fanInputHolder input")

    if (!isFanInputEmpty.values) {
      Swal.fire({
        text: 'Please do not leave blanks'
      })
    }

    home.style.display = 'flex';
    leaderBoard.style.display = 'none';
    showBottomBtn.style.display = 'flex'
    settingBtn.style.display = 'none'
    start.style.display = 'none'
    rightBtnText.innerHTML = "排行榜"
    rightBtnIcon.classList = "fa-solid fa-ranking-star"
    leftBtnText.innerHTML = "重新開局"
    leftBtnIcon.classList = "fa-solid fa-backward"
    topBoxText.innerHTML = "麻雀賽果"
    topBoxIcon.style.display = 'flex'
    check2 = true
  }
})
