# Polygon Pit Workshop

This workshop will take you through building, deploying and querying a subgraph for the [Polygon Punks smart contract](https://polygonscan.com/address/0x9498274B8C82B4a3127D67839F2127F2Ae9753f4 "Polygon Punks smart contract").

To get started through this repository, simply clone it with:

```bash
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

Delete everything inside `schema.graphql`, and paste the following code inside it:

```bash
type Punk @entity {
  id: ID!
  originalOwner: Bytes!
  currentOwner:  Bytes!
  blockNumber: BigInt!
  transactionHash: Bytes!
}

type PunkTransfer @entity(immutable: true) {
  id: Bytes!
  tokenId: BigInt!
  oldOwner: Bytes!
  newOwner: Bytes!
  blockNumber: BigInt!
  transactionHash: Bytes!
}
```

The `Punk` entity will store some important data for each Punk NFT. Each entity has to have an `id` field to uniquely identify each instance of that entity. The `PunkTransfer` entity will store the entire transfer history of the Plygon Punks smart contract.
You will notice that we set the immutable flag to true for the second entity.
Entities by default are mutable in The Graph. Mutable entities can be updated multiple times. We let `Punk` remain mutable because the `currentOwner` could change many times.
Since each instance of the `PunkTransfer` entity will be definitively unique, we can mark it as immutable.

## Configuring subgraph.yaml

Every subgraph project needs a yaml file that basically contains the metadata for that subgraph. This yaml file points the graph-cli to the data sources that the subgraph will index, and the handler functions that need to be triggered whenever a particular event is emitted. This file is crucial and needs to be handled carefully. 
Delete everything inside `subgraph.yaml`  and paste the following code inside it:

```yaml
specVersion: 0.0.5
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum
    name: PolygonPunksMarket
    network: matic
    source:
      address: "0x9498274B8C82B4a3127D67839F2127F2Ae9753f4"
      abi: PolygonPunksMarket
      startBlock: 16367421
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.7
      language: wasm/assemblyscript
      entities:
        - Punk
        - PunkTransfer
      abis:
        - name: PolygonPunksMarket
          file: ./abis/PolygonPunksMarket.json
      eventHandlers:
        - event: Assign(indexed address,uint256)
          handler: handleAssign
        - event: PunkTransfer(indexed address,indexed address,uint256)
          handler: handlePunkTransfer
      file: ./src/polygon-punks-market.ts
```

Open your terminal, at the root of the subgraph project, and run:

```bash
graph codegen
```

You should run this command everytime you make changes to the schema or yaml file. The Graph will now generate some AssemblyScript types to help us in writing the subgraph mappings.
