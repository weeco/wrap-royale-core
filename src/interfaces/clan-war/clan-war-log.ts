import { IApiPaging } from '../common';
import { IClanWarClan, IClanWarParticipant } from './shared';

/**
 * Clan war log interfaces
 */
export interface IStanding {
  clan: IClanWarClan;
  trophyChange: number;
}

export interface IClanWarLogEntry {
  seasonId: number;
  createdDate: string;
  participants: IClanWarParticipant[];
  standings: IStanding[];
}

export interface IClanWarLog {
  items: IClanWarLogEntry[];
  paging: IApiPaging;
}
