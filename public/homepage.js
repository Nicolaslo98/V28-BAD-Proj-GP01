document.querySelectorAll(".players").forEach((element) => {
    element.addEventListener('click', async (e) => {
    let {value: nameInput} = Swal.fire({
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
function clickedRightBtn(){
  document.querySelector(".rightBtn").addEventListener("click", function(e){
    console.log(e.target.id)
    if (e.target.id === "leaderBoard"){
      e.target.id = "home"
      leaderBoard.style.display='flex';
      home.style.display='none';
    } else if (e.target.id === "home"){
      e.target.id = "leaderBoard"
      home.style.display='flex';
      leaderBoard.style.display='none';
    }
  })
}

clickedRightBtn()