export interface RoundData {
    id: number;
    roomId: number;
    player1: string;
    player2: string;
    player3: string;
    player4: string;
    score1: number;
    score2: number;
    score3: number;
    score4: number;
  }


export interface Game {
  player_e: string, 
  player_s: string, 
  player_w: string, 
  player_n: string, 
  room_id: number
}
