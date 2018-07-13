// tslint:disable-next-line:import-name
import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IApiCards } from './interfaces/cards';
import { IApiClanLeaderboard } from './interfaces/clan-leaderboard';
import { IApiClanProfile } from './interfaces/clan-profile';
import { IClanSearchResponse } from './interfaces/clan-search-response';
import { IApiClanWarLeaderboard } from './interfaces/clan-war/clan-war';
import { IClanWarLog } from './interfaces/clan-war/clan-war-log';
import { ICurrentClanWar } from './interfaces/clan-war/current-clan-war';
import { IApiLocation, IApiLocations } from './interfaces/locations';
import { IApiPlayersBattleLog } from './interfaces/player-battle-logs';
import { IApiPlayerLeaderboard } from './interfaces/player-leaderboard';
import { IApiPlayerProfile } from './interfaces/player-profile';
import { IApiPlayersUpcomingChests } from './interfaces/player-upcoming-chests';
import { ITournaments, ITournament } from './interfaces/tournaments';
import { IVerifyToken } from './interfaces/verify-token';

/**
 * Clash Royale API Wrapper class
 */
export class CRApi {
  private baseUri: string;
  private token: string;
  private options: IApiOptions;
  private apiRequest: AxiosInstance;

  /**
   * Initialize all settings.
   * @param uri Base url to Clash Royale API e.g. 'https://api.clashroyale.com/v1'.
   * @param token Your API token (JWT as string).
   * @param options Additional options for this wrapper.
   */
  constructor(uri: string, token: string, options?: IApiOptions) {
    this.baseUri = uri;
    this.token = token;

    // Initialize default Api Options, but always prefer the passed options
    const defaultOptions: IApiOptions = {
      timeoutMS: 6000
    };
    const completeOptions: IApiOptions = { ...defaultOptions, ...options };
    this.options = completeOptions;

    // Initialize default request options
    this.apiRequest = Axios.create({
      baseURL: this.baseUri,
      method: 'GET',
      timeout: this.options.timeoutMS,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.token}`,
        'User-Agent': 'Wrap Royale'
      },
      responseType: 'json'
    });
  }

  /**
   * Search all clans by name and/or filtering the results using various criteria. At least one filtering criteria
   * must be defined and if name is used as part of search, it is required to be at least three characters long.
   *
   * It is not possible to specify ordering for results so clients should not rely on any specific ordering as
   * that may change in the future releases of the API.
   */
  public async clans(
    name?: string,
    locationId?: number,
    minMembers?: number,
    maxMembers?: number,
    minScore?: number,
    limit?: number,
    after?: number,
    before?: number
  ): Promise<IClanSearchResponse> {
    const route: string = 'clans';
    const params: {} = { name, locationId, minMembers, maxMembers, minScore, limit, after, before };

    return this.request<IClanSearchResponse>(route, params);
  }

  /**
   * Returns information for all available Clash Royale cards.
   */
  public async cards(): Promise<IApiCards> {
    const route: string = 'cards';

    return <IApiCards>await this.request(route);
  }

  /**
   * Returns a list of all available locations.
   * @param limit Limit the number of items returned in the response.
   * @param after Return only items that occur after this marker. After marker can be found from the response, inside the
   * 'paging' property. Note that only after or before can be specified for a request, not both.
   * @param before Return only items that occur before this marker. Before marker can be found from the response, inside the
   * 'paging' property. Note that only after or before can be specified for a request, not both.
   */
  public async locations(limit?: number, after?: string, before?: string): Promise<IApiLocations> {
    const route: string = 'locations';
    const params: {} = { limit, after, before };

    return this.request<IApiLocations>(route, params);
  }

  /**
   * Returns information about a specific location.
   * @param locationId Identifier of the location to retrieve.
   */
  public async locationById(locationId: number): Promise<IApiLocation> {
    const route: string = `locations/${locationId}`;

    return this.request<IApiLocation>(route);
  }

  /**
   * Get clan rankings for a specific location.
   * @param locationId Identifier of the location to retrieve rankings for. Use 'global' for global leaderboards.
   * @param limit Limit the number of items returned in the response.
   * @param after Return only items that occur after this marker. After marker can be found from the response, inside the
   * 'paging' property. Note that only after or before can be specified for a request, not both.
   * @param before Return only items that occur before this marker. Before marker can be found from the response, inside the
   * 'paging' property. Note that only after or before can be specified for a request, not both.
   */
  public async clanWarLeaderboard(
    locationId: number | 'global',
    limit?: number,
    after?: string,
    before?: string
  ): Promise<IApiClanWarLeaderboard> {
    const route: string = `locations/${locationId}/rankings/clanwars`;
    const params: {} = { limit, after, before };

    return this.request<IApiClanWarLeaderboard>(route, params);
  }

  /**
   * Get clan rankings for a specific location.
   * @param locationId Identifier of the location to retrieve rankings for. Use 'global' for global leaderboards.
   * @param limit Limit the number of items returned in the response.
   * @param after Return only items that occur after this marker. After marker can be found from the response, inside the
   * 'paging' property. Note that only after or before can be specified for a request, not both.
   * @param before Return only items that occur before this marker. Before marker can be found from the response, inside the
   * 'paging' property. Note that only after or before can be specified for a request, not both.
   */
  public async clanLeaderboard(
    locationId: number | 'global',
    limit?: number,
    after?: string,
    before?: string
  ): Promise<IApiClanLeaderboard> {
    const route: string = `locations/${locationId}/rankings/clans`;
    const params: {} = { limit, after, before };

    return this.request<IApiClanLeaderboard>(route, params);
  }

  /**
   * Get player rankings for a specific location.
   * @param locationId Identifier of the location to retrieve rankings for. Use 'global' for global leaderboards.
   * @param limit Limit the number of items returned in the response.
   * @param after Return only items that occur after this marker. After marker can be found from the response, inside the
   * 'paging' property. Note that only after or before can be specified for a request, not both.
   * @param before Return only items that occur before this marker. Before marker can be found from the response, inside the
   * 'paging' property. Note that only after or before can be specified for a request, not both.
   */
  public async playerLeaderboard(
    locationId: number | 'global',
    limit?: number,
    after?: string,
    before?: string
  ): Promise<IApiPlayerLeaderboard> {
    const route: string = `locations/${locationId}/rankings/players`;
    const params: {} = { limit, after, before };

    return this.request<IApiPlayerLeaderboard>(route, params);
  }

  /**
   * Get information about a single player by player tag.
   * @param playerTag Tag of the player to retrieve.
   */
  public async playerProfile(playerTag: string): Promise<IApiPlayerProfile> {
    const normalizedTag: string = `#${this.normalizeHashtag(playerTag)}`;
    const route: string = `players/${encodeURIComponent(normalizedTag)}`;

    return this.request<IApiPlayerProfile>(route);
  }

  /**
   * Get information about a player's upcoming chests.
   * @param playerTag Tag of the player whose upcoming chests to retrieve.
   */
  public async playersUpcomingChests(playerTag: string): Promise<IApiPlayersUpcomingChests> {
    const normalizedTag: string = `#${this.normalizeHashtag(playerTag)}`;
    const route: string = `players/${encodeURIComponent(normalizedTag)}/upcomingchests`;

    return this.request<IApiPlayersUpcomingChests>(route);
  }

  /**
   * Get information about a player's battle logs.
   * @param playerTag Tag of the player whose battle logs to retrieve.
   */
  public async playersBattleLogs(playerTag: string): Promise<IApiPlayersBattleLog[]> {
    const normalizedTag: string = `#${this.normalizeHashtag(playerTag)}`;
    const route: string = `players/${encodeURIComponent(normalizedTag)}/battlelog`;

    return this.request<IApiPlayersBattleLog[]>(route);
  }

  /**
   * Get information about a clan.
   * @param clanTag Tag of the clan to retrieve.
   */
  public async clanProfile(clanTag: string): Promise<IApiClanProfile> {
    const normalizedTag: string = `#${this.normalizeHashtag(clanTag)}`;
    const route: string = `clans/${encodeURIComponent(normalizedTag)}`;

    return this.request<IApiClanProfile>(route);
  }

  /**
   * Retrieve information about clan's current clan war
   * @param clanTag Tag of the clan whose war log to retrieve.
   */
  public async currentClanWarInfo(clanTag: string): Promise<ICurrentClanWar> {
    const normalizedTag: string = `#${this.normalizeHashtag(clanTag)}`;
    const route: string = `clans/${encodeURIComponent(normalizedTag)}/currentwar`;

    return this.request<ICurrentClanWar>(route);
  }

  /**
   * Retrieve clan's clan war log
   * @param clanTag Tag of the clan whose war log to retrieve.
   * @param limit Limit the number of items returned in the response.
   * @param after Return only items that occur after this marker. After marker can be found from the response,
   * inside the 'paging' property. Note that only after or before can be specified for a request, not both.
   * @param before Return only items that occur before this marker. Before marker can be found from the response,
   * inside the 'paging' property. Note that only after or before can be specified for a request, not both.
   */
  public async clanWarLog(clanTag: string, limit?: number, after?: string, before?: string): Promise<IClanWarLog> {
    const normalizedTag: string = `#${this.normalizeHashtag(clanTag)}`;
    const params: {} = { limit, after, before };
    const route: string = `clans/${encodeURIComponent(normalizedTag)}/warlog`;

    return this.request<IClanWarLog>(route, params);
  }

  /**
   * Verifies a player token and returns whether or not the token was associated with the given player.
   *
   * This API call can be used by a player to prove that they own a particular game account as the token
   * can only be retrieved inside the game from settings view.
   * @param playerTag
   * @param token
   */
  public async verifyPlayerToken(playerTag: string, token: string): Promise<IVerifyToken> {
    const normalizedTag: string = `#${this.normalizeHashtag(playerTag)}`;
    const route: string = `players/${encodeURIComponent(normalizedTag)}/verifytoken`;
    const data: {} = { token };

    return this.request<IVerifyToken>(route, {}, data, 'POST');
  }

  /**
   *
   * @param name Search tournaments by name
   * @param limit Limit the number of items returned in the response.
   * @param after Return only items that occur after this marker. After marker can be found from the
   * response, inside the 'paging' property. Note that only after or before can be specified for a request, not both.
   * @param before Return only items that occur before this marker. Before marker can be found from the response,
   * inside the 'paging' property. Note that only after or before can be specified for a request, not both.
   */
  public async tournaments(name?: string, limit?: number, after?: number, before?: number): Promise<ITournaments> {
    const route: string = 'tournaments';
    const params: {} = { name, limit, after, before };

    return this.request<ITournaments>(route, params);
  }

  /**
   * Get information about a single tournament by a tournament tag.
   * @param tournamentTag Tag of the tournament to retrieve.
   */
  public async tournamentByTag(tournamentTag: string): Promise<ITournament> {
    const normalizedTag: string = `#${this.normalizeHashtag(tournamentTag)}`;
    const route: string = `tournaments/${encodeURIComponent(normalizedTag)}`;

    return this.request<ITournament>(route);
  }

  /**
   * This can be used as "request middleware".
   * For example one can modify requests or implement special response handling before returning the data.
   * @param uri URI to request data from.
   * @param params Optional query string parameters
   */
  private async request<T>(uri: string, params?: {}, data?: {}, method: string = 'GET'): Promise<T> {
    const response: AxiosResponse<{}> = await this.apiRequest(uri, { params, data, method });

    return <T>response.data;
  }

  /**
   * Converts Hashtag (player or clantag) to a normalized version without '#' or common pitfalls
   * @param hashtag Player- or clantag
   */
  private normalizeHashtag(hashtag: string): string {
    return hashtag
      .trim()
      .toUpperCase()
      .replace('#', '')
      .replace(/O/g, '0'); // replace capital O with zero
  }
}

/**
 * Library interfaces
 */
export interface IApiOptions {
  /**
   * Timeout for awaiting a response until it fails. Defaults to 6000 milliseconds.
   */
  timeoutMS?: number;
}
