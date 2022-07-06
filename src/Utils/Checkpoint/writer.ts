import { ethers } from 'ethers'
import { AccountModel } from '../../Repository/Account/Account.Entity'
import { validateAndParseAddress } from 'starknet/utils/address'
import { ProjectModel } from '../../Repository/Project/Project.Entity'

export async function handleTransferSingle({ receipt }): Promise<void> {
  // console.log('Handle Lottery Ticket Mint', receipt.events)
  const idoId = BigInt(receipt.events[0].data[3]).toString() // Uint256
  const amount = BigInt(receipt.events[0].data[5]).toString() // Uint256
  const from = validateAndParseAddress(receipt.events[0].data[1])
  const to = validateAndParseAddress(receipt.events[0].data[2])
  // const toAddress = validateAndParseAddress(receipt.events[0].data[1])

  // const item = {
  //   idoId,
  //   mintedTo: toAddress,
  //   amountMinted,
  //   tx: tx.transaction_hash,
  //   mintedAt: block.timestamp,
  // }

  if (Number(from) === 0) {
    // Tickets being claimed
    const _project = await ProjectModel.findOne({ idoId }).exec()
    await ProjectModel.updateOne({ idoId }, { totalClaimedTickets: _project.totalClaimedTickets + Number(amount) })
    await AccountModel.updateOne({ address: to }, { hasClaimedTickets: true })
  } else if (Number(to) === 0) {
    // Tickets being burned
    // const _project = await ProjectModel.findOne({ idoId }).exec()
    // const _account = await AccountModel.findOne({ address: from }).exec()
    // await AccountModel.updateOne({ address: from }, {})
  }
}

export async function handleVaultDeposit({ receipt }): Promise<void> {
  // console.log('Handle Vault Deposit', receipt.events)
  const receiver = validateAndParseAddress(receipt.events[3].data[1])
  const assets = BigInt(receipt.events[3].data[2]).toString()
  const shares = BigInt(receipt.events[3].data[4]).toString()
  console.log(receiver, ethers.utils.formatUnits(assets, 'ether'), ethers.utils.formatUnits(shares, 'ether'))

  // const item = {
  //   idoId,
  //   mintedTo: toAddress,
  //   amountMinted,
  //   tx: tx.transaction_hash,
  //   mintedAt: block.timestamp,
  // }

  //
}

export async function handleVaultWithdraw({ receipt }): Promise<void> {
  // console.log('Handle Vault Deposit', receipt.events)
  const receiver = validateAndParseAddress(receipt.events[3].data[2])
  const assets = BigInt(receipt.events[3].data[3]).toString()
  const shares = BigInt(receipt.events[3].data[5]).toString()
  console.log(receiver, ethers.utils.formatUnits(assets, 'ether'), ethers.utils.formatUnits(shares, 'ether'))

  // const item = {
  //   idoId,
  //   mintedTo: toAddress,
  //   amountMinted,
  //   tx: tx.transaction_hash,
  //   mintedAt: block.timestamp,
  // }

  //
}

export async function handleDeploy(): Promise<void> {
  console.log('Handle deploy')
}
