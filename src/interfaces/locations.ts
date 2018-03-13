import { IApiPaging } from './common';

/**
 * Locations
 */
export interface IApiLocations {
  items: IApiLocation[];
  paging: IApiPaging;
}

export interface IApiLocation {
  id: number;
  name: string;
  isCountry: boolean;
  countryCode?: string;
}
