import { IApiIconUrls } from './common';

/**
 * Interfaces for the cards api endpoint
 */
export interface IApiCards {
  items: IApiCard[];
}

export interface IApiCard {
  name: string;
  maxLevel: number;
  iconUrls: IApiIconUrls;
}
