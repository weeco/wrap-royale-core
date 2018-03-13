import * as chai from 'chai';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import {} from 'mocha';
import { CRApi, IApiCards } from '../index';
import { IApiClanLeaderboard, IApiClanRanking } from '../interfaces/clan-leaderboard';
import { IApiClanProfile } from '../interfaces/clan-profile';
import { IApiLocation, IApiLocations } from '../interfaces/locations';
import { IApiPlayersBattleLogs } from '../interfaces/player-battle-logs';
import { IApiPlayerLeaderboard, IApiPlayerRanking } from '../interfaces/player-leaderboard';
import { IApiPlayerProfile } from '../interfaces/player-profile';
import { IApiPlayersUpcomingChests, IApiUpcomingChest } from '../interfaces/player-upcoming-chests';

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
      CR_API_TEST_TOKEN: Joi.string().required()
        .description('API Token is required for testing'),
      CR_API_TEST_BASEURL: Joi.string().required()
        .description('Base url is required for testing')
    }).unknown().required();
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
      const germany: IApiLocation = await api.locationById('57000094');
      expect(germany.countryCode).to.be.equal('DE');
      expect(germany.isCountry).to.equal(true, 'IsCountry is not true for Germany');
      expect(germany.name).to.be.equal('Germany');
    });
  });

  describe('Leaderboards', () => {
    it('Should return Germany\'s clan leaderboard with 200 clans', async () => {
      const germanTopClans: IApiClanLeaderboard = await api.clanLeaderboard('57000094');
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
  });

  describe('Player profile', () => {
    it('should return a player profile', async () => {
      const profile: IApiPlayerProfile = await api.playerProfile('2PPP');
      expect(profile.name).to.be.a('string');
      expect(profile.cards[0].level).to.be.a('number');
      expect(profile.expLevel).to.be.a('number');
    });
  });

  describe('Player\'s upcoming chests', () => {
    it('should return a player\'s upcoming chests', async () => {
      const upcomingChests: IApiPlayersUpcomingChests = await api.playersUpcomingChests('2PPP');
      expect(upcomingChests.items.length).to.be.gte(5);
      upcomingChests.items.forEach((chest: IApiUpcomingChest) => {
        expect(chest.index).to.be.a('number');
        expect(chest.name).to.be.a('string');
      });
    });
  });

  describe('Player\'s battle logs', () => {
    it('should return a player\'s battle logs', async () => {
      const battleLogs: IApiPlayersBattleLogs[] = await api.playersBattleLogs('22UYP9Y0');
      expect(battleLogs[0].gameMode.id).to.be.a('number');
    });
  });

  describe('Clan profile', () => {
    it('should return the Nova eSports clan profile', async () => {
      const clanProfile: IApiClanProfile = await api.clanProfile('LCVUYCR');
      expect(clanProfile.name).to.be.equal('Nova eSports');
    });
  });
});
