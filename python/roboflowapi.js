
const axios = require("axios");
const fs = require("fs");

const image = fs.readFileSync("./testImage/testing.jpg", {
    encoding: "base64"
});

axios({
    method: "POST",
    url: "https://detect.roboflow.com/master-oez61/7",
    params: {
        api_key: "xc35k34eGmKJ3agYQern"
    },
    data: image,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
.then(function(response) {
    const {predictions} = response.data;
    // console.dir(predictions.map(e => e.x)); 
    const result = predictions.map((e=>e.x))
    result.sort(function( a , b){
        if(a > b) return 1;
        if(a < b) return -1;
        return 0;
    })
    console.log(result)
    // console.log(response.data.predictions);
    // for (let i of response.data.predictions){
        // for (let x of i.x)
        // console.log(i.x)
        // result.push(i.x)
        // console.log(result)
        // console.log(i)
    // }
})
.catch(function(error) {
    console.log(error.message);
});