// import { resolve } from "path";


  
export let multiplyNumber = 32
let fanNumber = 8
export let fanArr = []
export function genFan(fan, mul) {
  return new Promise((resolve, reject) => {
    startRow.innerHTML = ''
  if (fan === 8){
    switch (mul){
      case 32:
        fanArr = [4, 8, 12, 16, 24, 32]
        break;
      case 64:
        fanArr = [8, 16, 24, 32, 48, 64]
        break;
      case 96:
        fanArr = [12, 24, 36, 48, 72, 96]
        break;
      case 128:
        fanArr = [16, 32, 48, 64, 96, 128]
        break;
      case 256:
        fanArr = [32, 64, 96, 128, 192, 256]
        break;
      case 512:
        fanArr = [64, 128, 192, 256, 384, 512]
        break;
    }
  }else if (fan === 10){
    switch (mul){
      case 32:
        fanArr = [2, 4, 6, 8, 12, 16, 24, 32]
        break;
      case 64:
        fanArr = [4, 8, 12, 16, 24, 32, 48, 64]
        break;
      case 96:
        fanArr = [6, 12, 18, 24, 36, 48, 72, 96]
        break;
      case 128:
        fanArr = [8, 16, 24, 32, 48, 64, 96, 128]
        break;
      case 256:
        fanArr = [16, 32, 48, 64, 96, 128, 192, 256]
        break;
      case 512:
        fanArr = [32, 64, 96, 128, 192, 256, 384, 512]
        break;
    }
  }else {
    switch (mul){
      case 32:
        fanArr = [1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48]
        break;
      case 64:
        fanArr = [2, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96]
        break;
      case 96:
        fanArr = [3, 6, 9, 12, 18, 24, 36, 48, 72, 96, 144]
        break;
      case 128:
        fanArr = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192]
        break;
      case 256:
        fanArr = [8, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384]
        break;
      case 512:
        fanArr = [16, 32, 48, 64, 96, 128, 192, 256, 384, 512, 768]
        break;
    }
  }
  for (let i = 0; i <= fan - 3; i++) {
    startRow.innerHTML += `
          <div class="col-6 fanInputHolder">
            <p>${i + 3} 番</p>
            <input class="form-control" type="text" placeholder="" aria-label="default input example" value="${fanArr[i]}">
          </div>
          `
  }
  resolve(fanArr)
  })
}

const startRow = document.querySelector(".startBox .container-fluid .row")
document.querySelectorAll(".selector1 input").forEach((element) => {
  element.addEventListener('click', async (e) => {
    genFan(Number(e.target.value), multiplyNumber)
    fanNumber = Number(e.target.value)
    localStorage.setItem("fanNumber", fanNumber)
  });
})
document.querySelectorAll(".selector2 input").forEach((element) => {
  element.addEventListener('click', async (e) => {
    genFan(fanNumber, Number(e.target.value))
    multiplyNumber = Number(e.target.value)
    localStorage.setItem("multiplyNumber", multiplyNumber)
  })
})

export async function fanLimit() {
  return new Promise((resolve, reject) => {
    document.querySelector("#startForm").addEventListener("submit", function(event) {
      event.preventDefault()
      const form = event.target
      const formObject = {
        fan: form.Fan.value
      }  
      resolve(formObject)
    })
  })
}


genFan(8, 32);