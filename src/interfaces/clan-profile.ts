import { IApiArena } from './common';
import { IApiLocation } from './locations';

/**
 * Interfaces for API Clan profile.
 */
export interface IApiClanProfile {
  tag: string;
  name: string;
  // tslint:disable-next-line:no-reserved-keywords
  type: string;
  description: string;
  badgeId: number;
  clanScore: number;
  location: IApiLocation;
  requiredTrophies: number;
  donationsPerWeek: number;
  clanChestStatus: string;
  clanChestPoints: number;
  clanChestLevel: number;
  clanChestMaxLevel: number;
  members: number;
  memberList?: IApiClanMember[];
}

export interface IApiClanMember {
  tag: string;
  name: string;
  role: string;
  expLevel: number;
  trophies: number;
  arena: IApiArena;
  clanRank: number;
  previousClanRank: number;
  donations: number;
  donationsReceived: number;
  clanChestPoints?: number | null;
}
