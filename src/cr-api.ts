// tslint:disable-next-line:import-name
import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IApiCards } from './interfaces/cards';
import { IApiClanLeaderboard } from './interfaces/clan-leaderboard';
import { IApiClanProfile } from './interfaces/clan-profile';
import { IApiClanWarLeaderboard } from './interfaces/clan-wars';
import { IApiLocation, IApiLocations } from './interfaces/locations';
import { IApiPlayersBattleLog } from './interfaces/player-battle-logs';
import { IApiPlayerLeaderboard } from './interfaces/player-leaderboard';
import { IApiPlayerProfile } from './interfaces/player-profile';
import { IApiPlayersUpcomingChests } from './interfaces/player-upcoming-chests';

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
  ): Promise<IApiClanLeaderboard> {
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
   * This can be used as "request middleware".
   * For example one can modify requests or implement special response handling before returning the data.
   * @param uri URI to request data from.
   * @param params Optional query string parameters
   */
  private async request<T>(uri: string, params?: {}): Promise<T> {
    const response: AxiosResponse<{}> = await this.apiRequest(uri, { params });

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
