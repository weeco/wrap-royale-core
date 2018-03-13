/**
 * Interfaces for upcoming chests.
 */
export interface IApiPlayersUpcomingChests {
  items: IApiUpcomingChest[];
}
export interface IApiUpcomingChest {
  index: number;
  name: string;
}
