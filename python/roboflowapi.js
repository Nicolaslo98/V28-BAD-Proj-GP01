const { rejects } = require("assert");
const axios = require("axios");
const fs = require("fs");
const { Tile, Meld, WinningHand, FaanCalculator } = require("hk-mahjong");
const { resolve } = require("path");

const image = fs.readFileSync("./testImage/testing.jpg", {
    encoding: "base64"
});


async function pythonReturn() {
    const response = await axios({
        method: "POST",
        url: "https://detect.roboflow.com/master-oez61/7",
        params: {
            api_key: "gqh3oH3h27JlslTLNjHv"
        },
        data: image,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    const { predictions } = response.data;
    // console.log(predictions)
    predictions.sort(function (a, b) {
        var keyA = a.x, keyB = b.x;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
    //console.log(predictions)
    return predictions
    //   console.log(predictions.length)
}
//ask james
// function pythonReturn(){
//     axios({
//         method: "POST",
//         url: "https://detect.roboflow.com/master-oez61/7",
//         params: {
//             api_key: "gqh3oH3h27JlslTLNjHv"
//         },
//         data: image,
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//         }
//     })
//     .then(function(response) {
//         const {predictions} = response.data;
//         const result = []
//         // console.log(predictions)
//         predictions.sort(function(a, b) {
//             var keyA = a.x, keyB = b.x;
//             // Compare the 2 dates
//             if (keyA < keyB) return -1;
//             if (keyA > keyB) return 1;
//             return 0;
//           });
//           //console.log(predictions)
//           result.push(predictions) 
//           return result
//         //   console.log(predictions.length)
//     })
//     .catch(function(error) {
//         console.log(error.message);
//     });
// }
async function log() {
    const result = await pythonReturn();
    for (let className of result) {
        switch (className.class) {
            case ('1m'):
                className.class = { value: '1', suit: 'character' };
                break;
            case ('2m'):
                className.class = { value: '2', suit: 'character' };
                break;
            case ('3m'):
                className.class = { value: '3', suit: 'character' };
                break;
            case ('4m'):
                className.class = { value: '4', suit: 'character' };
                break;
            case ('5m'):
                className.class = { value: '5', suit: 'character' };
                break;
            case ('6m'):
                className.class = { value: '6', suit: 'character' };
                break;
            case ('7m'):
                className.class = { value: '7', suit: 'character' };
                break;
            case ('8m'):
                className.class = { value: '8', suit: 'character' };
                break;
            case ('8m'):
                className.class = { value: '8', suit: 'character' };
                break;
            default:
                console.log('fail')
        }
        console.log(className.class)

    }

    // const classToObj =  result.map(x => ({
    //      value : x.class[0], suit : x.class[1]
    //     }))
    //     for (let suit of classToObj){
    //         if (suit.suit = 'm') {
    //             suit.suit = 'character'
    //         } else 
    //         if (suit.suit = 's') {
    //             suit.suit = 'bamboo'
    //         } else 
    //         if ( suit.suit = 'p' ){
    //             suit.suit = 'dot'
    //         } 
    //         }
    //     }

}
log()


//Calculate Fan
const tile1 = new Tile({ suit: 'dot', value: 1 });
const tile2 = new Tile({ suit: 'dot', value: 2 });
const tile3 = new Tile({ suit: 'dot', value: 3 });
const tile4 = new Tile({ suit: 'dot', value: 4 });
const tile5 = new Tile({ suit: 'dot', value: 5 });

const meld1 = new Meld([tile1, tile1, tile1]);
const meld2 = new Meld([tile2, tile2, tile2]);
const meld3 = new Meld([tile3, tile3, tile3]);
const meld4 = new Meld([tile4, tile4, tile4]);
const meld5 = new Meld([tile5, tile5]);

const winningHand = new WinningHand([meld1, meld2, meld3, meld4, meld5]);
const config = { selfPick: true };

const faanValue = FaanCalculator.calculate(winningHand, config);
