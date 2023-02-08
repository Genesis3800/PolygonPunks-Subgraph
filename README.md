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

## Writing mappings

You will notice that we defined two `event-handler` pairs in our yaml file, under the `eventHandlers` object.
These events come from the smart contract we are indexing, and whenever that event is emitted from the contract, The Graph runs the corresponding function from our mappings file.

For this Subgraph, we will define the two functions we declared in the yaml file.
Go to `src/polygon-punks-market.ts`, and delete everything inside the file. Now paste the following code inside it:

```javascript
import {
  Assign as AssignEvent,
  PunkTransfer as PunkTransferEvent,
  Transfer as TransferEvent,
  PolygonPunksMarket as PolygonPunks

} from "../generated/PolygonPunksMarket/PolygonPunksMarket"
import {
  Punk,
  PunkTransfer,
} from "../generated/schema"


export function handleAssign(event: AssignEvent): void {
  let punk = new Punk(
    event.params.punkIndex.toString()
  )
  let ContractAddress = PolygonPunks.bind(event.address);
  let newOwnerFromContract = ContractAddress.ownerOf(event.params.punkIndex);

  punk.originalOwner = event.params.to
  punk.currentOwner = newOwnerFromContract
  punk.blockNumber = event.block.number
  punk.transactionHash = event.transaction.hash

  punk.save()
}


export function handlePunkTransfer(event: PunkTransferEvent): void {
  let transfer = new PunkTransfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  transfer.tokenId = event.params.punkIndex
  transfer.oldOwner = event.params.from
  transfer.newOwner = event.params.to

  transfer.blockNumber = event.block.number
  transfer.transactionHash = event.transaction.hash

  transfer.save()
}
```
We simply create new instances of `Punk` and `PunkTransfer` entities every time their corresponding events are emitted. After handling all the data emitted in the logs, we save the entities to the local data store using the `.save()` method.

## Deploying the Subgraph

To deploy the subgraph to Chainstack Subgraphs:

1. Go to [Chainstack](https://console.chainstack.com/subgraphs "Chainstack") and create a new subgraph project.

2. Copy the deployment command from your Chainstack Subgraphs console.

3. In your terminal, run the follosing command to compile your subgraph:

```bash
graph build
```

4. Finally, paste the deployment command and exectue it from within your terminal. 

## Query your Chainstack Subgraph with ReactJS

Move your terminal one directory above the Subgraph project. Now run:

```bash
git clone https://github.com/Genesis3800/Chainstack-s-Polygon-Pit-Workhop.git
```
This command will clone a basic React JS project into your project. Go inside the React directory, and run:

```bash
npm install
```
To open a development server in your browser, run:

```bash
npm start
```
This will initialize a basic frontend in your browser.
All of your Chainstack Subgraphs will expose a GraphQL endpoint for remotely querying the subgraph for data. To use the endpoint from your DAPP, you need a frontend GraphQL client like [URQL](https://formidable.com/open-source/urql/docs/ "URQL").
