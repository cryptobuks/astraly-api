import { buildSchema as tsBuildSchema } from 'type-graphql'
import { AccountResolvers } from '../Repository/Account/Account.Resolvers'
import { appAuthChecker } from '../Modules/Auth/AuthChecker'

export const buildSchema = () => {
  return tsBuildSchema({
    resolvers: [
        AccountResolvers
    ],
      validate: false,
    authChecker: appAuthChecker
  })
}
