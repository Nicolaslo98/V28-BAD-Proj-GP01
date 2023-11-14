const leaderBoard = document.querySelector(".leaderBoardBox")
const home = document.querySelector(".box")
const start = document.querySelector(".startBox")
const rightBtn = document.querySelector(".rightBtn")
const leftBtn = document.querySelector(".leftBtn")
const startingBtn = document.querySelector(".startingBtn")
const settingBtn = document.querySelector(".settingBtn")
const rightBtnText = document.querySelector(".rightBtn p")
const rightBtnIcon = document.querySelector(".rightBtn i")
const leftBtnText = document.querySelector(".leftBtn p")
const leftBtnIcon = document.querySelector(".leftBtn i")
const topBoxText = document.querySelector(".topBox p")
const topBoxIcon = document.querySelector(".topBox i")
let check = true
let check2 = false

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
      startingBtn.style.display = 'none'
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
      startingBtn.style.display = 'flex'
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
      startingBtn.style.display = 'none'
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

      const isFanInputEmpty = document.querySelectorAll(".fanInputHolder input")

      if (!isFanInputEmpty.values){
        Swal.fire({
          text: 'Please do not leave blanks'
        })
      }

      home.style.display = 'flex';
      leaderBoard.style.display = 'none';
      startingBtn.style.display = 'flex'
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
  