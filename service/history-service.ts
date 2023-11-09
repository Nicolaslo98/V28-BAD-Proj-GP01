import { RoundData } from '../server/historyRoutes'; // Assuming RoundData interface is defined in historyRoutes.ts

export class HistoryService {
  private roundData: RoundData[];

  constructor() {
    this.roundData = []; // Initialize with an empty array
  }

  public async addRoundData(data: RoundData): Promise<void> {
    this.roundData.push(data);
  }

  public async getRoundData(roundId: number): Promise<RoundData | undefined> {
    return this.roundData.find((data) => data.id === roundId);
  }
}