# Polygon Pit Workshop

This workshop will take you through building, deploying and querying a subgraph for the [Polygon Punks smart contract](https://polygonscan.com/address/0x9498274B8C82B4a3127D67839F2127F2Ae9753f4 "Polygon Punks smart contract").

To get started through this repository, simply clone it with:

```json
git clone https://github.com/Genesis3800/PolygonPunks-Subgraph.git
```
Move your terminal into the new directory, and run:
```javascript
npm install
```
This will install all the dependencies required to configure the Subgraph. Please note that you must have the graph-cli installed on your machine to proceed with the workshop. You can get it via [npm's package registry](https://www.npmjs.com/package/@graphprotocol/graph-cli "npm's package registry").

## Initializing the Subgraph

Let us set up the same subgraph from scratch.
To initialize a subgraph project with The Graph's cli, create a new directory and run:

```bash
graph init --allow-simple-name
```
The *--allow-simple-name* flag 'allows' us to bypass some naming restrictions The Graph imposes on hosted-service builds.
This command will start a UI interface in your terminal. Fill it up using these parameters:

```bash
Protocol: Ethereum
Product for which to initialize: hosted-service
Subgraph name: PolygonPunks 
Directory to create the subgraph in: PolygonPunks
Ethereum network: matic
Contract address: 0x9498274B8C82B4a3127D67839F2127F2Ae9753f4
Contract Name: PolygonPunksMarket
Index contract events as entities: true
```
Choosing the network correctly is important. Within The Graph's architecture, Polygon mainnet is referenced as an Ethereum Network named `mainnet`. All EVM-compatible blockchains supported by The Graph are referenced in the same manner.

With the `Index contract events as entities` flag set as true, The Graph will try to fetch the smart contract ABI from the given address, and will generate some helper code for us.

## Defining entities

All data in a Subgraph is stored using entities. Think of them as something like a Javascript object that can contain many different data types.
