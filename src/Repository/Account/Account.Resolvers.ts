import { Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { Account } from './Account.Entity'

@Resolver()
export class AccountResolvers {
    @Query(() => String)
    hello () {
        return 'world'
    }

    @Authorized()
    @Mutation(() => Account)
    updateAccount () {

    }
}
