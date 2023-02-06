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
