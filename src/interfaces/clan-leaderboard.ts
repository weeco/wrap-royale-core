import { IApiPaging } from './common';
import { IApiLocation } from './locations';

/**
 * Interfaces for clan leaderboards in specific countries
 */
export interface IApiClanLeaderboard {
  items: IApiClanRanking[];
  paging: IApiPaging;
}

export interface IApiClanRanking {
  tag: string;
  name: string;
  rank: number;
  previousRank: number;
  location: IApiLocation;
  badgeId: number;
  clanScore: number;
  members: number;
}
