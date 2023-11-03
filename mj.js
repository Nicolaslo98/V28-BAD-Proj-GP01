const { Tile } = require("hk-mahjong");

const dot1 = new Tile({ suit: "dot", value: 1 });
const dot2 = new Tile("🀚");

// Printing the tile's symbol by calling the toString() method.
console.log(dot1.toString()); //🀙