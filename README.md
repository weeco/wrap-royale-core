# Wrap Royale Core


[![Discord Server](https://discordapp.com/api/guilds/372163650993127424/embed.png)](https://discord.gg/YBAE3JX)
[![npm version](https://badge.fury.io/js/wrap-royale-core.svg)](https://badge.fury.io/js/wrap-royale-core)
[![Travis](https://img.shields.io/travis/weeco/wrap-royale-core.svg)](https://travis-ci.org/weeco/wrap-royale-core)
[![GitHub license](https://img.shields.io/github/license/weeco/wrap-royale-core.svg)](https://github.com/weeco/wrap-royale-core/blob/master/LICENSE)

Wrap royale core is a promise based, minimalist wrapper for the official Clash Royale REST API. It covers all endpoints and parameters, but it barely offers any utility methods. If you are looking for a more feature rich library to interact with the Clash Royale API, take a look at [wrap-royale](https://github.com/weeco/wrap-royale) which utilizes this library.

### Features

- [x] Lightweight, promise based wrapper functions for API requests.
- [x] Types for all returned JSON data, which makes working with it very handy due to intellisense (see: https://i.imgur.com/xzP1AHC.png).
- [x] Normalizes player tags, no matter if you pass `#2OPP`, `20pp` or `#20pp` the request will succeed.
- [x] Failed requests (wrong https status code in response or timeout exceeded) throw an exception
- [x] All API endpoints and parameters are covered.



## Getting started
### Prerequisites
- [Node.js 8.0+](http://nodejs.org)
- Token for the official Clash Royale API (currently closed beta)

### Installation
`$ npm install --save wrap-royale-core`

_**Note:** Typescript definitions are included, there is no need for installing types from the Definetely Typed Repo._

### Basic usage
Typescript (2.0+):

```typescript
import { CRApi, IApiCards } from 'wrap-royale-core';

const baseUri: string = 'https://api.clashroyale.com/v1';
const apiToken: string = 'my-long-jwt';
const api: CRApi = new CRApi(baseUri, apiToken);

async function getAllCards(): Promise<void> {
  try {
    const cards: IApiCards = await api.cards();
    console.log(cards);
  } catch (e) {
    console.log(e);
  }
}

getAllCards();
```

Javascript (ES6+):

```javascript
const CRApi = require('wrap-royale-core').CRApi;

const baseUri = 'https://api.clashroyale.com/v1';
const apiToken = 'my-long-jwt';
const api = new CRApi(baseUri, apiToken);

api.cards()
  .then((cards) => {
    console.log(cards);
  })
  .catch((err) => {
    console.log(err);
  })
```

## Class CRApi
The class CRApi offers all available endpoints as promise based functions. Each function returns a Promise which resolves to the json response from the API. If the HTTPS response code is not 2xx (for instance `503` which is being used for API maintenance) an exception will be thrown.

### Instantion
When creating a CRApi instance you can pass the following options:

```typescript
/**
 * Initialize all settings.
 * @param uri Base url to Clash Royale API e.g. 'https://api.clashroyale.com/v1/'.
 * @param token Your API token (JWT as string).
 * @param options Additional options for this wrapper.
 */
constructor(uri: string, token: string, options?: IApiOptions);

interface IApiOptions {
    /**
     * Timeout for awaiting a response until it fails. Defaults to 6000 milliseconds.
     */
    timeoutMS?: number;
}
```

### Available endpoints
Below you'll find a summary of all available methods. For more details about the parameters or method, take a look at the code which comes along with function documentation.

| Route                                                                                    | Returns                           |
|------------------------------------------------------------------------------------------|-----------------------------------|
| `cards()`                                                                                | Promise\<IApiCards>               |
| `locations(limit?: number, after?: string, before?: string)`                             | Promise\<IApiLocations>           |
| `locationById(locationId: number)`                                                       | Promise\<IApiLocation>            |
| `clanWarLeaderboard(locationId: string, limit?: number, after?: string, before?: string)`| Promise\<IApiClanWarLeaderboard>  |
| `playerLeaderboard(locationId: string, limit?: number, after?: string, before?: string)` | Promise\<IApiPlayerLeaderboard>   |
| `clanLeaderboard(locationId: string, limit?: number, after?: string, before?: string)`   | Promise\<IApiClanLeaderboard>     |
| `playerProfile(playerTag: string)`                                                       | Promise\<IApiPlayerProfile>       |
| `playersUpcomingChests(playerTag: string)`                                               | Promise\<IApiUpcomingChests>      |
| `playersBattleLogs(playerTag: string)`                                                   | Promise\<IApiPlayersBattleLogs[]> |
| `clanProfile(clanTag: string)`                                                           | Promise\<IApiClanProfile>         |
