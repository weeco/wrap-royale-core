import { IApiPaging } from './common';
import { IApiLocation } from './locations';

/**
 * Clan wars endpoint
 */
export interface IApiClanWarRanking {
  tag: string;
  name: string;
  rank: number;
  previousRank: number;
  location: IApiLocation;
  badgeId: number;
  clanScore: number;
  members: number;
}
export interface IApiClanWarLeaderboard {
  items: IApiClanWarRanking[];
  paging: IApiPaging;
}
