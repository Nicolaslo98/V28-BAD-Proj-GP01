// const { rejects } = require("assert");
// const axios = require("axios");
// const fs = require("fs");
// const { Tile, Meld, WinningHand, FaanCalculator } = require("hk-mahjong");

// const image = fs.readFileSync("./testImage/testing.jpg", {
//     encoding: "base64"
// });

// async function pythonReturn() {
//     const response = await axios({
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
//     const { predictions } = response.data;
//     predictions.sort(function (a, b) {
//         var keyA = a.x, keyB = b.x;
//         // Compare the 2 dates
//         if (keyA < keyB) return -1;
//         if (keyA > keyB) return 1;
//         return 0;
//     });
//     // console.log(predictions)
//     return predictions
// }

// // const splitArray = (array, size) => {
// //     let result = [];
// //     for (let i = 0; i < array.length; i += size) {
// //         let chunk = array.slice(i, i + size);
// //         result.push(chunk);
// //     }
// //     return result;
// // };

// async function log() {
//     const result = await pythonReturn();
//     const arr = []
//     for (let className of result) {
//         switch (className.class) {
//             case ('1m'):
//                 arr.push(new Tile({ value: 1, suit: 'character' }));
//                 break;
//             case ('2m'):
//                 arr.push(new Tile({ value: 2, suit: 'character' }));
//                 break;
//             case ('3m'):
//                 arr.push(new Tile({ value: 3, suit: 'character' }));
//                 break;
//             case ('4m'):
//                 arr.push(new Tile({ value: 4, suit: 'character' }));
//                 break;
//             case ('5m'):
//                 arr.push(new Tile({ value: 5, suit: 'character' }));
//                 break;
//             case ('6m'):
//                 arr.push(new Tile({ value: 6, suit: 'character' }));
//                 break;
//             case ('7m'):
//                 arr.push(new Tile({ value: 7, suit: 'character' }));
//                 break;
//             case ('8m'):
//                 arr.push(new Tile({ value: 8, suit: 'character' }));
//                 break;
//             case ('8m'):
//                 arr.push(new Tile({ value: 8, suit: 'character' }));
//                 break;
//             case ('9m'):
//                 arr.push(new Tile({ value: 9, suit: 'character' }));
//                 break;
//             case ('0m'):
//                 arr.push(new Tile({ value: 5, suit: 'character' }));
//                 break;
//             case ('1s'):
//                 arr.push(new Tile({ value: 1, suit: 'bamboo' }));
//                 break;
//             case ('2s'):
//                 arr.push(new Tile({ value: 2, suit: 'bamboo' }));
//                 break;
//             case ('3s'):
//                 arr.push(new Tile({ value: 3, suit: 'bamboo' }));
//                 break;
//             case ('4s'):
//                 arr.push(new Tile({ value: 4, suit: 'bamboo' }));
//                 break;
//             case ('5s'):
//                 arr.push(new Tile({ value: 5, suit: 'bamboo' }));
//                 break;
//             case ('6s'):
//                 arr.push(new Tile({ value: 6, suit: 'bamboo' }));
//                 break;
//             case ('7s'):
//                 arr.push(new Tile({ value: 7, suit: 'bamboo' }));
//                 break;
//             case ('8s'):
//                 arr.push(new Tile({ value: 8, suit: 'bamboo' }));
//                 break;
//             case ('9s'):
//                 arr.push(new Tile({ value: 9, suit: 'bamboo' }));
//                 break;
//             case ('0s'):
//                 arr.push(new Tile({ value: 5, suit: 'bamboo' }));
//                 break;
//             case ('1p'):
//                 arr.push(new Tile({ value: 1, suit: 'dot' }));
//                 break;
//             case ('2p'):
//                 arr.push(new Tile({ value: 2, suit: 'dot' }));
//                 break;
//             case ('3p'):
//                 arr.push(new Tile({ value: 3, suit: 'dot' }));
//                 break;
//             case ('4p'):
//                 arr.push(new Tile({ value: 4, suit: 'dot' }));
//                 break;
//             case ('5p'):
//                 arr.push(new Tile({ value: 5, suit: 'dot' }));
//                 break;
//             case ('6p'):
//                 arr.push(new Tile({ value: 6, suit: 'dot' }));
//                 break;
//             case ('7p'):
//                 arr.push(new Tile({ value: 7, suit: 'dot' }));
//                 break;
//             case ('8p'):
//                 arr.push(new Tile({ value: 8, suit: 'dot' }));
//                 break;
//             case ('9p'):
//                 arr.push(new Tile({ value: 9, suit: 'dot' }));
//                 break;
//             case ('0p'):
//                 arr.push(new Tile({ value: 5, suit: 'dot' }));
//                 break;
//             case ('1z'):
//                 arr.push(new Tile({ value: 1, suit: 'honor' }));
//                 break;
//             case ('2z'):
//                 arr.push(new Tile({ value: 2, suit: 'honor' }));
//                 break;
//             case ('3z'):
//                 arr.push(new Tile({ value: 3, suit: 'honor' }));
//                 break;
//             case ('4z'):
//                 arr.push(new Tile({ value: 4, suit: 'honor' }));
//                 break;
//             case ('7z'):
//                 arr.push(new Tile({ value: 5, suit: 'honor' }));
//                 break;
//             case ('6z'):
//                 arr.push(new Tile({ value: 6, suit: 'honor' }));
//                 break;
//             case ('5z'):
//                 arr.push(new Tile({ value: 7, suit: 'honor' }));
//                 break;
//             default:
//                 console.log('fail')
//         }
//     }
//     console.log(arr)
//     // const result2 = splitArray(arr, 3)
//     // console.log(result2)
//     // const result3 = [new Meld(result2[2])]
//     // console.log(result3)
// }
// log()

// //Result    
// //Calculate Fan
// function returnResult() {
//     const tile1 = new Tile({ suit: 'dot', value: 1 });
//     const tile2 = new Tile({ suit: 'dot', value: 2 });
//     const tile3 = new Tile({ suit: 'dot', value: 3 });
//     const tile4 = new Tile({ suit: 'dot', value: 4 });
//     const tile5 = new Tile({ suit: 'dot', value: 5 });
//     // console.log(tile1.toString())//ok

//     const meld1 = new Meld([tile1, tile1, tile1]);
//     const meld2 = new Meld([tile2, tile2, tile2]);
//     const meld3 = new Meld([tile3, tile3, tile3]);
//     const meld4 = new Meld([tile4, tile4, tile4]);
//     const meld5 = new Meld([tile5, tile5]);
//     // console.log(meld4)

//     const winningHand = new WinningHand([meld1, meld2, meld3, meld4, meld5]);
//     const config =
//     {
//         //自摸 
//         selfPick: false,
//         //無花加一番
//         // extraTiles : {spring: true,
//         //     summer: false,
//         //     autumn: false,
//         //     winter: false,
//         //     plum: false,
//         //     lily: false,
//         //     chrysanthemum: false,
//         //     bamboo: false},
//         //門前清
//         // fullyConcealedHand: true,
//         //門風
//         matchSeatWind: 'east',
//         //圈風
//         matchRoundWind: 'east',
//         //搶槓
//         robbingKong: false,
//         //海底撈月
//         winByLastCatch: false,
//         //槓上自摸
//         winByKong: false,
//         //花牌
//         extraTile: false,
//         //一台花(春夏秋冬)
//         completeSetOfExtraTiles: true,
//         //
//         flowerHand: true,
//     };

//     console.log(winningHand.toString())

//     const faanValue = FaanCalculator.calculate(winningHand, config);
//     return faanValue
// }

