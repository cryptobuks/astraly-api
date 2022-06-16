import { buildSchema as tsBuildSchema } from 'type-graphql'
import { AccountResolvers } from '../Repository/Account/Account.Resolvers'
import { appAuthChecker } from '../Modules/Auth/AuthChecker'
import { AuthResolvers } from '../Modules/Auth/AuthResolvers'

export const buildSchema = () => {
    return tsBuildSchema({
        resolvers: [
            AuthResolvers,
            AccountResolvers
        ],
        validate: false,
        authChecker: appAuthChecker
    })
}
