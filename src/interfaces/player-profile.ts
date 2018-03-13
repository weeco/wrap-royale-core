import { IApiCard } from './cards';
import { IApiArena, IApiClan, IApiIconUrls } from './common';

/**
 * Interfaces for API Player profile
 */
export interface IApiPlayerProfile {
  tag: string;
  name: string;
  expLevel: number;
  trophies: number;
  bestTrophies: number;
  wins: number;
  losses: number;
  battleCount: number;
  threeCrownWins: number;
  challengeCardsWon: number;
  challengeMaxWins: number;
  tournamentCardsWon: number;
  tournamentBattleCount: number;
  role: string;
  donations: number;
  donationsReceived: number;
  totalDonations: number;
  clan: IApiClan;
  arena: IApiArena;
  leagueStatistics?: IApiLeagueStatistics;
  achievements: IApiAchievements[];
  cards: IApiPlayerProfileCard[];
  currentDeck?: IApiPlayerProfileCard[];
  currentFavouriteCard: IApiCard;
}

export interface IApiLeagueStatistics {
  currentSeason?: IApiCurrentSeason;
  previousSeason?: IApiPreviousSeason;
  bestSeason?: IApiBestSeason;
}

export interface IApiCurrentSeason {
  rank?: number;
  trophies: number;
  bestTrophies: number;
}

export interface IApiPreviousSeason {
  id: string;
  rank?: number;
  trophies: number;
  bestTrophies: number;
}

export interface IApiBestSeason {
  id: string;
  rank?: number;
  trophies: number;
}

export interface IApiAchievements {
  name: string;
  stars: number;
  value: number;
  target: number;
  info: string;
}

export interface IApiPlayerProfileCard {
  name: string;
  level: number;
  maxLevel: number;
  count: number;
  iconUrls: IApiIconUrls;
}
