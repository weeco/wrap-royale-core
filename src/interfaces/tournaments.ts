import { IApiPaging } from './common';

/**
 * Tournament search response
 */

export interface ITournaments {
  items: ITournament[];
  paging: IApiPaging;
}

export interface ITournament {
  tag: string;
  // tslint:disable-next-line:no-reserved-keywords
  type: string;
  status: string;
  creatorTag: string;
  name: string;
  capacity: number;
  maxCapacity: number;
  preparationDuration: number;
  duration: number;
  createdTime: string;
}
