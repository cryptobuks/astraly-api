import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Quest, QuestModel } from './Quest.Entity'
import { AppContext } from '../../Utils/Types/context'
import { AccountModel } from '../Account/Account.Entity'
import { QuestHistoryModel } from './QuestHistory.Entity'
import fs from 'fs'

@Resolver()
export class QuestResolvers {
    @Authorized()
    @Mutation(() => Quest)
    async completeQuest (
        @Arg('questId') questId: string,
        @Ctx() { address } : AppContext
    ) {
        const account = await AccountModel.findOne({
            address
        }).exec()

        if (!account) {
            throw new Error('account not found')
        }

        const quest = await QuestModel.findById(questId).exec()

        if (!quest) {
            throw new Error('quest not found')
        }

        await AccountModel.findByIdAndUpdate(account, {
            $push: { questCompleted: quest }
        }).exec()

        await QuestHistoryModel.create({
            quest,
            idoId: quest.idoId,
            address,
            completionDate: new Date()
        })

        return quest
    }

    @Authorized()
    @Query(() => String)
    async getMerkleProof (
        @Arg('idoId') idoId: string,
        @Ctx() { address }: AppContext
    ) {
        const account = await AccountModel.findOne({
            address
        }).exec()

        if (!account) {
            throw new Error('account not found')
        }

        // TODO get proofs
        // const proofs = JSON.parse(
        //     fs.readFileSync(`scripts/data/proofs_${idoID}.json`),
        //     "utf-8"
        // )

        const proofs = {
            idoId
        }

        // @ts-ignore
        const proof = proofs[address]

        if (!proof) {
            throw new Error('no proof found for address')
        }

        return proof
    }
}
