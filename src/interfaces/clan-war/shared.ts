/**
 * Shared interfaces related to clan wars
 */
export interface IClanWarClan {
  tag: string;
  name: string;
  badgeId: number;
  clanScore: number;
  participants: number;
  battlesPlayed: number;
  wins: number;
  crowns: number;
}

export interface IClanWarParticipant {
  tag: string;
  name: string;
  cardsEarned: number;
  battlesPlayed: number;
  wins: number;
}
