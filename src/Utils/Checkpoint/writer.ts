// import { validateAndParseAddress } from 'starknet/utils/address'
import { ProjectModel } from '../../Repository/Project/Project.Entity'
// import { AccountModel } from '../../Repository/Account/Account.Entity'

export async function handleLotteryTicketMint({ receipt }): Promise<void> {
  console.log('Handle Lottery Ticket Mint', receipt.events)
  const idoId = BigInt(receipt.events[0].data[3]).toString()
  const amountMinted = BigInt(receipt.events[0].data[4]).toString()
  // const toAddress = validateAndParseAddress(receipt.events[0].data[1])

  // const item = {
  //   idoId,
  //   mintedTo: toAddress,
  //   amountMinted,
  //   tx: tx.transaction_hash,
  //   mintedAt: block.timestamp,
  // }

  const _project = await ProjectModel.findOne({ idoId }).exec()
  await ProjectModel.updateOne({ idoId }, { totalClaimedTickets: _project.totalClaimedTickets + Number(amountMinted) })
}
