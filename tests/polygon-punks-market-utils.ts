import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
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
} from "../generated/PolygonPunksMarket/PolygonPunksMarket"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createAssignEvent(to: Address, punkIndex: BigInt): Assign {
  let assignEvent = changetype<Assign>(newMockEvent())

  assignEvent.parameters = new Array()

  assignEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  assignEvent.parameters.push(
    new ethereum.EventParam(
      "punkIndex",
      ethereum.Value.fromUnsignedBigInt(punkIndex)
    )
  )

  return assignEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPunkBidEnteredEvent(
  punkIndex: BigInt,
  value: BigInt,
  fromAddress: Address
): PunkBidEntered {
  let punkBidEnteredEvent = changetype<PunkBidEntered>(newMockEvent())

  punkBidEnteredEvent.parameters = new Array()

  punkBidEnteredEvent.parameters.push(
    new ethereum.EventParam(
      "punkIndex",
      ethereum.Value.fromUnsignedBigInt(punkIndex)
    )
  )
  punkBidEnteredEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )
  punkBidEnteredEvent.parameters.push(
    new ethereum.EventParam(
      "fromAddress",
      ethereum.Value.fromAddress(fromAddress)
    )
  )

  return punkBidEnteredEvent
}

export function createPunkBidWithdrawnEvent(
  punkIndex: BigInt,
  value: BigInt,
  fromAddress: Address
): PunkBidWithdrawn {
  let punkBidWithdrawnEvent = changetype<PunkBidWithdrawn>(newMockEvent())

  punkBidWithdrawnEvent.parameters = new Array()

  punkBidWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "punkIndex",
      ethereum.Value.fromUnsignedBigInt(punkIndex)
    )
  )
  punkBidWithdrawnEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )
  punkBidWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "fromAddress",
      ethereum.Value.fromAddress(fromAddress)
    )
  )

  return punkBidWithdrawnEvent
}

export function createPunkBoughtEvent(
  punkIndex: BigInt,
  value: BigInt,
  fromAddress: Address,
  toAddress: Address
): PunkBought {
  let punkBoughtEvent = changetype<PunkBought>(newMockEvent())

  punkBoughtEvent.parameters = new Array()

  punkBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "punkIndex",
      ethereum.Value.fromUnsignedBigInt(punkIndex)
    )
  )
  punkBoughtEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )
  punkBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "fromAddress",
      ethereum.Value.fromAddress(fromAddress)
    )
  )
  punkBoughtEvent.parameters.push(
    new ethereum.EventParam("toAddress", ethereum.Value.fromAddress(toAddress))
  )

  return punkBoughtEvent
}

export function createPunkNoLongerForSaleEvent(
  punkIndex: BigInt
): PunkNoLongerForSale {
  let punkNoLongerForSaleEvent = changetype<PunkNoLongerForSale>(newMockEvent())

  punkNoLongerForSaleEvent.parameters = new Array()

  punkNoLongerForSaleEvent.parameters.push(
    new ethereum.EventParam(
      "punkIndex",
      ethereum.Value.fromUnsignedBigInt(punkIndex)
    )
  )

  return punkNoLongerForSaleEvent
}

export function createPunkOfferedEvent(
  punkIndex: BigInt,
  minValue: BigInt,
  toAddress: Address
): PunkOffered {
  let punkOfferedEvent = changetype<PunkOffered>(newMockEvent())

  punkOfferedEvent.parameters = new Array()

  punkOfferedEvent.parameters.push(
    new ethereum.EventParam(
      "punkIndex",
      ethereum.Value.fromUnsignedBigInt(punkIndex)
    )
  )
  punkOfferedEvent.parameters.push(
    new ethereum.EventParam(
      "minValue",
      ethereum.Value.fromUnsignedBigInt(minValue)
    )
  )
  punkOfferedEvent.parameters.push(
    new ethereum.EventParam("toAddress", ethereum.Value.fromAddress(toAddress))
  )

  return punkOfferedEvent
}

export function createPunkTransferEvent(
  from: Address,
  to: Address,
  punkIndex: BigInt
): PunkTransfer {
  let punkTransferEvent = changetype<PunkTransfer>(newMockEvent())

  punkTransferEvent.parameters = new Array()

  punkTransferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  punkTransferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  punkTransferEvent.parameters.push(
    new ethereum.EventParam(
      "punkIndex",
      ethereum.Value.fromUnsignedBigInt(punkIndex)
    )
  )

  return punkTransferEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}
