import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Account, AccountModel } from './Account.Entity'
import { Context } from 'koa'
import { UpdateAccountInputType } from './AccountInputTypes'
import { validateSignature } from '../../Utils/Starknet/validateSignature'

@Resolver()
export class AccountResolvers {
    @Query(() => String)
    hello () {
        return 'world'
    }

    @Authorized()
    @Mutation(() => Account)
    updateAccount (@Arg('data') data: UpdateAccountInputType, @Ctx() { address }: Context) {
        if (!validateSignature(address, data.signature, data.signatureAddress)) {
            throw new Error('invalid signature')
        }

        // const account = AccountModel.findOne({
        //     address
        // }).exec()
        //
        // if (!account) {
        //     console.error('how the f ?', {
        //         address,
        //         data
        //     })
        //     throw new Error('could not find account',)
        // }

        // TODO: manage image

        return AccountModel.findOneAndUpdate({
            address
        }, {
            alias: data.alias,
            bio: data.bio,
            email: data.email
        }, {
            new: true
        }).exec()
    }

    @Authorized()
    @Query(() => Account)
    async me (@Ctx() { address }: Context) {
        return AccountModel.findOne({
            address
        }).exec()
    }

    @Query(() => Account)
    async getAccount(@Arg('address') address: string) {
        const account = await AccountModel.findOne({
            address
        }).exec()

        if (!account) {
            return null
        }

        return {
            address,
            bio: account.bio,
            alias: account.alias,
        }
    }

    @Authorized()
    @Query(() => Number)
    async nonce (@Ctx() { address }: Context) {
        const account = await AccountModel.findOne({
            address
        }).exec()

        return account.nonce
    }
}
