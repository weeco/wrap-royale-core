import { IApiArena, IApiClan, IApiIconUrls } from './common';

/**
 * Interfaces for API player battle logs.
 */
export interface IApiPlayersBattleLogs {
  // tslint:disable-next-line:no-reserved-keywords
  type: string;
  battleTime: string;
  arena: IApiArena;
  gameMode: IApiGameMode;
  deckSelection: string;
  team: IApiBattleParticipant[];
  opponent: IApiBattleParticipant[];
  challengeId?: number;
  challengeWinCountBefore?: number;
}

export interface IApiGameMode {
  id: number;
  name: string;
}

export interface IApiBattleParticipant {
  tag: string;
  name: string;
  crowns: number;
  clan: IApiClan;
  cards: IApiBattleParticipantCard[];
  startingTrophies?: number;
  trophyChange?: number;
}

export interface IApiBattleParticipantCard {
  name: string;
  level: number;
  maxLevel: number;
  iconUrls: IApiIconUrls;
}
