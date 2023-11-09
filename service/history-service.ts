import { Knex } from 'knex';
import { RoundData } from '../utils/history'; // Assuming RoundData interface is defined in historyRoutes.ts

export class HistoryService {
  constructor(private knex: Knex) {
  }

  public async getRoundData(roundId: number): Promise<RoundData | undefined> {
    const roundData = await this.knex('round').where({ id: roundId }).first();
    return roundData;
  }
}