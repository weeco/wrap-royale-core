/**
 * Shared API interfaces
 */
export interface IApiIconUrls {
  medium: string;
}

export interface IApiPaging {
  cursors: IApiCursors;
}

export interface IApiCursors {
  after?: string;
  before?: string;
}

export interface IApiClan {
  tag: string;
  name: string;
  badgeId: number;
}

export interface IApiArena {
  id: number;
  name: string;
}
