import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Account, AccountModel } from './Account.Entity'
import { Context } from 'koa'
import { UpdateAccountInputType } from './AccountInputTypes'
import { validateSignature } from '../../Utils/Starknet/validateSignature'
import { AppFileModel } from '../File/File.Entity'

@Resolver()
export class AccountResolvers {
  @Query(() => String)
  hello(): string {
    return 'world'
  }

  @Authorized()
  @Mutation(() => Account)
  async updateAccount(@Arg('data') data: UpdateAccountInputType, @Ctx() { address }: Context): Promise<Account> {

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

    const {
      alias: _a,
      ...savableData
    } = data

    if (savableData.cover) {
      const file = await AppFileModel.findById(savableData.cover).exec()

      if (!file) {
        savableData.cover = null
      }

      file.isUsed = true
      await file.save()
    }

    return await AccountModel.findOneAndUpdate(
      {
        address,
      },
      {
       ...savableData
      },
      {
        new: true,
      }
    ).exec()
  }

  @Authorized()
  @Query(() => Account)
  async me(@Ctx() { address }: Context): Promise<Account> {
    return await AccountModel.findOne({
      address,
    }).exec()
  }

  @Query(() => Account)
  async getAccount(@Arg('address') address: string): Promise<Partial<Account>> {
    const account = await AccountModel.findOne({
      address,
    }).exec()

    if (!account) {
      return null
    }

    return {
      address,
      bio: account.bio,
      alias: account.alias,
      questCompleted: account.questCompleted,
    }
  }

  @Authorized()
  @Query(() => Number)
  async nonce(@Ctx() { address }: Context): Promise<number> {
    const account = await AccountModel.findOne({
      address,
    }).exec()

    return account.nonce
  }
}
