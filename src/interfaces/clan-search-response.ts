import { IApiPaging } from './common';
import { IApiLocation } from './locations';

/**
 * Clan search response
 */
export interface IClanSearchResponse {
  items?: ItemsEntity[];
  paging: IApiPaging;
}

export interface ItemsEntity {
  tag: string;
  name: string;
  // tslint:disable-next-line:no-reserved-keywords
  type: string;
  badgeId: number;
  clanScore: number;
  location: IApiLocation;
  requiredTrophies: number;
  donationsPerWeek: number;
  clanChestLevel: number;
  clanChestMaxLevel: number;
  members: number;
}
