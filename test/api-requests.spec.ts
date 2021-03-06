import * as chai from 'chai';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import {} from 'mocha';
import {
  CRApi,
  IApiCards,
  IApiClanLeaderboard,
  IApiClanProfile,
  IApiClanRanking,
  IApiClanWarLeaderboard,
  IApiClanWarRanking,
  IApiLocation,
  IApiLocations,
  IApiPlayerLeaderboard,
  IApiPlayerProfile,
  IApiPlayerRanking,
  IApiPlayersBattleLog,
  IApiPlayersUpcomingChests,
  IApiUpcomingChest,
  IClanSearchResponse,
  IClanWarLog,
  ICurrentClanWar,
  ITournament,
  ITournaments,
  IVerifyToken
} from '../src/index';

/**
 * Test main lib functionality
 */
const expect: Chai.ExpectStatic = chai.expect;
dotenv.config();

describe('API Requests', () => {
  let api: CRApi;

  // Assign Token and Baseurl as variable from .env file
  before(() => {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      CR_API_TEST_TOKEN: Joi.string()
        .required()
        .description('API Token is required for testing'),
      CR_API_TEST_BASEURL: Joi.string()
        .required()
        .description('Base url is required for testing')
    })
      .unknown()
      .required();
    const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
    if (error !== null) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    const config: { apiToken: string; apiUrl: string } = {
      apiToken: <string>envVars.CR_API_TEST_TOKEN,
      apiUrl: <string>envVars.CR_API_TEST_BASEURL
    };

    // Env variables don't match the env pattern in order to test instanation with missing env vars
    api = new CRApi(config.apiUrl, config.apiToken);
  });

  describe('Cards', () => {
    it('Should return a list of all clash royale cards', async () => {
      const cards: IApiCards = await api.cards();
      expect(cards.items).to.be.an('array');
      expect(cards.items.length).to.be.gte(82);
    });
  });

  describe('Locations', () => {
    it('Should return a list of all clash royale locations', async () => {
      const locations: IApiLocations = await api.locations();
      expect(locations.items).to.be.an('array');
      expect(locations.items.length).to.be.gte(261);
    });

    it('Should return 5 clash royale locations with paging cursor', async () => {
      const locations: IApiLocations = await api.locations(5);
      expect(locations.items).to.be.an('array');
      expect(locations.paging.cursors.after).to.be.a('string');
      expect(locations.items.length).to.be.equal(5);
    });

    it('Should return 5 clash royale locations after specific paging cursor', async () => {
      const locations: IApiLocations = await api.locations(5, 'eyJwb3MiOjV9');
      expect(locations.items).to.be.an('array');
      expect(locations.paging.cursors.after).to.be.a('string');
      expect(locations.paging.cursors.before).to.be.a('string');
      expect(locations.items.length).to.be.equal(5);
    });
  });

  describe('Location', () => {
    it('Should return Germany as location', async () => {
      const germany: IApiLocation = await api.locationById(57000094);
      expect(germany.countryCode).to.be.equal('DE');
      expect(germany.isCountry).to.equal(true, 'IsCountry is not true for Germany');
      expect(germany.name).to.be.equal('Germany');
    });
  });

  describe('Leaderboards', () => {
    it("Should return Germany's clan leaderboard with 200 clans", async () => {
      const germanTopClans: IApiClanLeaderboard = await api.clanLeaderboard(57000094);
      expect(germanTopClans.items.length).to.be.equal(200);
      germanTopClans.items.forEach((clan: IApiClanRanking) => {
        expect(clan.clanScore).to.be.a('number');
      });
    });

    it('Should return the global player leaderboard with 200 players', async () => {
      const globalTopPlayers: IApiPlayerLeaderboard = await api.playerLeaderboard('global');
      expect(globalTopPlayers.items.length).to.be.equal(200);
      globalTopPlayers.items.forEach((player: IApiPlayerRanking) => {
        expect(player.trophies).to.be.a('number');
      });
    });

    it('Should return the global clan wars leaderboard with 200 players', async () => {
      const globalTopClanWarClans: IApiClanWarLeaderboard = await api.clanWarLeaderboard('global');
      expect(globalTopClanWarClans.items.length).to.be.equal(200);
      globalTopClanWarClans.items.forEach((clan: IApiClanWarRanking) => {
        expect(clan.clanScore).to.be.a('number');
      });
    });
  });

  describe('Players', () => {
    it('should return a player profile', async () => {
      const profile: IApiPlayerProfile = await api.playerProfile('2PPP');
      expect(profile.name).to.be.a('string');
      expect(profile.cards[0].level).to.be.a('number');
      expect(profile.expLevel).to.be.a('number');
    });

    it("should return a player's battle logs", async () => {
      const battleLogs: IApiPlayersBattleLog[] = await api.playersBattleLogs('22UYP9Y0');
      expect(battleLogs[0].gameMode.id).to.be.a('number');
    });

    it('should verify a player token', async () => {
      const response: IVerifyToken = await api.verifyPlayerToken('8PLQOG88G', '2jyax8cz');
      expect(response.status).to.be.a('string');
    });
  });

  describe('Tournaments', () => {
    it('should find tournaments by name', async () => {
      const tournaments: ITournaments = await api.tournaments('nova');
      expect(tournaments.items.length).to.be.gte(0);
    });

    it('should find tournament by tag', async () => {
      const tournament: ITournament = await api.tournamentByTag('2PP');
      expect(tournament.status).to.be.equal('ended');
    });
  });

  describe("Player's upcoming chests", () => {
    it("should return a player's upcoming chests", async () => {
      const upcomingChests: IApiPlayersUpcomingChests = await api.playersUpcomingChests('2PPP');
      expect(upcomingChests.items.length).to.be.gte(5);
      upcomingChests.items.forEach((chest: IApiUpcomingChest) => {
        expect(chest.index).to.be.a('number');
        expect(chest.name).to.be.a('string');
      });
    });
  });

  describe('Clan profile', () => {
    it('should find clans by parameter search', async () => {
      const clanProfiles: IClanSearchResponse = await api.clans('nova');
      expect(clanProfiles.items.length).to.be.greaterThan(0);
      expect(clanProfiles.items[0].name).to.be.a('string');
    });

    it('should return the Nova eSports clan profile', async () => {
      const clanProfile: IApiClanProfile = await api.clanProfile('LCVUYCR');
      expect(clanProfile.name).to.be.equal('Nova eSports');
    });
  });

  describe('Clan war', () => {
    it('should return the current clan war for crucible wrath', async () => {
      const currentClanWar: ICurrentClanWar = await api.currentClanWarInfo('2LRU2J');
      expect(currentClanWar.clan.name).to.be.equal('Crucible Wrath');
      expect(currentClanWar.participants.length).to.be.a('number');
    });

    it('should return the clan war history for crucible wrath', async () => {
      const clanWarLog: IClanWarLog = await api.clanWarLog('2LRU2J');
      expect(clanWarLog.items).to.be.an('array');
      expect(clanWarLog.items[0].participants.length).to.be.a('number');
    });
  });
});
