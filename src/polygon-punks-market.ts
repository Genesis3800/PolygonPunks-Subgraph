import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  Assign as AssignEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PunkBidEntered as PunkBidEnteredEvent,
  PunkBidWithdrawn as PunkBidWithdrawnEvent,
  PunkBought as PunkBoughtEvent,
  PunkNoLongerForSale as PunkNoLongerForSaleEvent,
  PunkOffered as PunkOfferedEvent,
  PunkTransfer as PunkTransferEvent,
  Transfer as TransferEvent
} from "../generated/PolygonPunksMarket/PolygonPunksMarket"
import {
  Approval,
  ApprovalForAll,
  Assign,
  OwnershipTransferred,
  PunkBidEntered,
  PunkBidWithdrawn,
  PunkBought,
  PunkNoLongerForSale,
  PunkOffered,
  PunkTransfer,
  Transfer
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAssign(event: AssignEvent): void {
  let entity = new Assign(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.to = event.params.to
  entity.punkIndex = event.params.punkIndex

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePunkBidEntered(event: PunkBidEnteredEvent): void {
  let entity = new PunkBidEntered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.punkIndex = event.params.punkIndex
  entity.value = event.params.value
  entity.fromAddress = event.params.fromAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePunkBidWithdrawn(event: PunkBidWithdrawnEvent): void {
  let entity = new PunkBidWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.punkIndex = event.params.punkIndex
  entity.value = event.params.value
  entity.fromAddress = event.params.fromAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePunkBought(event: PunkBoughtEvent): void {
  let entity = new PunkBought(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.punkIndex = event.params.punkIndex
  entity.value = event.params.value
  entity.fromAddress = event.params.fromAddress
  entity.toAddress = event.params.toAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePunkNoLongerForSale(
  event: PunkNoLongerForSaleEvent
): void {
  let entity = new PunkNoLongerForSale(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.punkIndex = event.params.punkIndex

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePunkOffered(event: PunkOfferedEvent): void {
  let entity = new PunkOffered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.punkIndex = event.params.punkIndex
  entity.minValue = event.params.minValue
  entity.toAddress = event.params.toAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePunkTransfer(event: PunkTransferEvent): void {
  let entity = new PunkTransfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.punkIndex = event.params.punkIndex

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
