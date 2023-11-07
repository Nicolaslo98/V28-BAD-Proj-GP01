const axios = require("axios");
const fs = require("fs");

const image = fs.readFileSync("./testImage/testing1.jpeg", {
    encoding: "base64"
});

axios({
    method: "POST",
    url: "https://detect.roboflow.com/mahjong-vtacs/1",
    params: {
        api_key: "xc35k34eGmKJ3agYQern"
    },
    data: image,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
.then(function(response) {
    console.log(response.data);
})
.catch(function(error) {
    console.log(error.message);
});