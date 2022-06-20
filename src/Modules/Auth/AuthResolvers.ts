import { Arg, Query } from 'type-graphql'
import jwt from 'jsonwebtoken'
import { createAccountByAddress } from '../../Repository/Account/AccountService'
import { globals } from '../../Utils/Globals'
import { getParsedAddress } from '../../Utils/Starknet'

export class AuthResolvers {
  @Query(() => String)
  async getToken(@Arg('address') address: string): Promise<string> {
    const parsedAddress = getParsedAddress(address)

    if (!parsedAddress) {
      throw new Error('invalid address')
    }

    createAccountByAddress(parsedAddress).catch((err) => {
      console.error('could not create or get account with address', {
        address,
        parsedAddress,
        err,
      })
    })

    return jwt.sign(
      {
        data: parsedAddress,
      },
      globals.JWT_KEY,
      { expiresIn: '24h' }
    )
  }
}