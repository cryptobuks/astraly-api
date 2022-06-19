import { buildSchema as tsBuildSchema } from 'type-graphql'
import { AccountResolvers } from '../Repository/Account/Account.Resolvers'
import { appAuthChecker } from '../Modules/Auth/AuthChecker'
import { AuthResolvers } from '../Modules/Auth/AuthResolvers'
import { GraphQLSchema } from 'graphql'

export const buildSchema = async (): Promise<GraphQLSchema> => {
  return await tsBuildSchema({
    resolvers: [AuthResolvers, AccountResolvers],
    validate: false,
    authChecker: appAuthChecker,
  })
}
