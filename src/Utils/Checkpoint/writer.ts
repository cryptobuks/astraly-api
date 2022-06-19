import { validateAndParseAddress } from 'starknet/utils/address'
import { ProjectModel } from '../../Repository/Project/Project.Entity'

export async function handleNewIDO({ block, tx, receipt }): Promise<void> {
  console.log('Handle New IDO', receipt.events)
  const idoId = BigInt(receipt.events[0].data[0]).toString()
  const idoAddress = validateAndParseAddress(receipt.events[0].data[1])

  await ProjectModel.create({
    idoId,
    tokenAddress: idoAddress,
    tx: tx.transaction_hash,
    created: block.timestamp,
  })
}
