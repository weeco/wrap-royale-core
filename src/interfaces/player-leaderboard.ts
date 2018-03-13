import { IApiArena, IApiClan, IApiPaging } from './common';

/**
 * Interfaces for player leaderboards in specific countries
 */
export interface IApiPlayerLeaderboard {
  items: IApiPlayerRanking[];
  paging: IApiPaging;
}

export interface IApiPlayerRanking {
  tag: string;
  name: string;
  expLevel: number;
  trophies: number;
  rank: number;
  previousRank: number;
  clan?: IApiClan;
  arena: IApiArena;
}
