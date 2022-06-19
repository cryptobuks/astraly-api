import { InputType } from 'type-graphql'

@InputType()
export class UpdateAccountInputType {
  alias?: string
  email?: string
  bio?: string
  signature!: string
  signatureAddress!: string
}
