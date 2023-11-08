function genFan(fan){
    startRow.innerHTML=''
        for (let i = 3; i <= fan; i++){
          startRow.innerHTML += `
          <div class="col-6">
            <p>${i} 番</p>
            <input class="form-control" type="text" placeholder="" aria-label="default input example">
          </div>
          `
        }
  }
  const startRow = document.querySelector(".startBox .container-fluid .row")
  document.querySelectorAll(".selector1 input").forEach((element) => {
    element.addEventListener('click', async (e) => {
      if(e.target.id === "8Radio"){
        genFan(8)
      } else if(e.target.id === "10Radio"){
        genFan(10)
      } else{
        genFan(13)
      }
      
      
    });
  })
  
  