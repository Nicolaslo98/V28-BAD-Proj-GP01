import { Request, Response } from "express";
import { Tile, Meld, WinningHand, FaanCalculator } from "hk-mahjong";


export class AiController {

    countMjFan = async (req: Request, res: Response) => {
        try {
            //after ai done
            // const result3 = [] as Tile[]
            // for (let result of req.body) {
            //     const result2 = new Tile(result)
            //     result3.push(result2)
            // }

            // const splitArray = (array:any, size:any) => {
            //     let result = [] as Meld[];
            //     for (let i = 0; i < array.length; i += size) {
            //         let chunk = array.slice(i, i + size);
            //         result.push(new Meld(chunk));
            //     }
            //     return result;
            // };

            // const result4 = splitArray(result3, 3)
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
            const config = {selfPick: true}
            const faanValue = FaanCalculator.calculate(winningHand);
            console.log(faanValue)
            
            res.json({ success: true, message: "can find fan", faanValue: faanValue })
        } catch (err) {
            res.json({ success: false, message: "fail to capture image", err })
        }
    }
}