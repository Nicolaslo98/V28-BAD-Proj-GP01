const axios = require("axios");
const fs = require("fs");

const image = fs.readFileSync("./server/photo/image_1699252994620.png", {
    encoding: "base64"
});

axios({
    method: "POST",
    url: "https://detect.roboflow.com/mahjong-vz3mu/1",
    params: {
        api_key: "gqh3oH3h27JlslTLNjHv"
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