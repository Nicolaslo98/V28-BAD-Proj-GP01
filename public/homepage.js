document.querySelectorAll(".players").forEach((element) => {
  element.addEventListener('click', async (e) => {
    let { value: nameInput } = Swal.fire({
      html: `
      
      `,
      input: "text",
      inputLabel: "Name",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      }
    });
  });
})

const leaderBoard = document.querySelector(".leaderBoardBox")
const home = document.querySelector(".box")
const rightBtn = document.querySelector(".rightBtn")
const cameraBtn = document.querySelector(".cameraBtn")
const rightBtnText = document.querySelector(".rightBtn p")
const rightBtnIcon = document.querySelector(".rightBtn i")
const topBoxText = document.querySelector(".topBox p")
let check = true
// function clickedRightBtn(e) {
//   console.log(e.target.id)
  
// }

rightBtn.addEventListener("click", function(e){
  console.log(check)
  if (check) {
    leaderBoard.style.display = 'flex';
    home.style.display = 'none';
    cameraBtn.style.display = 'none'
    rightBtnText.innerHTML = "現時賽果"
    rightBtnIcon.classList = "fa-solid fa-house"
    topBoxText.innerHTML = "麻雀排行榜"
    check = false

  } else if (!check) {
    home.style.display = 'flex';
    leaderBoard.style.display = 'none';
    cameraBtn.style.display = 'flex'
    rightBtnText.innerHTML = "排行榜"
    rightBtnIcon.classList = "fa-solid fa-ranking-star"
    topBoxText.innerHTML = "麻雀賽果"
    check = true
  }
})

