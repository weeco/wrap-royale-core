import { IClanWarClan, IClanWarParticipant } from './shared';

/**
 * Current clan war interfaces
 */
export interface ICurrentClanWar {
  state: string;
  collectionEndTime: string;
  clan: IClanWarClan;
  participants: IClanWarParticipant[];
}
