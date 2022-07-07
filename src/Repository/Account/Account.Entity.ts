import { getModelForClass, modelOptions, prop, Ref, Severity } from '@typegoose/typegoose'
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql'
import { ObjectId } from '../../Utils/Types'
import { Quest } from '../Quest/Quest.Entity'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { AppFile } from '../File/File.Entity'

export enum SocialLinkType {
  DISCORD = 'DISCORD',
  TWITTER = 'TWITTER',
  TELEGRAM = 'TELEGRAM',
  FACEBOOK = 'FACEBOOK'
}

registerEnumType(SocialLinkType, {
  name: 'SocialLinkType'
})

@ObjectType()
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class SocialLink {
  @Field(() => SocialLinkType, { nullable: true })
  @prop({ enum: SocialLinkType, type: String})
  type: SocialLinkType

  @Field({ nullable: true })
  @prop()
  id: string

  // should not be exposed
  @prop()
  token: any
}

@ObjectType()
export class Account {
  @Field(() => ID)
  readonly _id!: ObjectId

  @Field({ nullable: true })
  @prop({
    required: true,
    unique: true,
  })
  address!: string

  @Field({ nullable: true })
  @prop()
  alias?: string

  @Field({ nullable: true })
  @prop()
  email?: string

  @Field({ nullable: true })
  @prop()
  bio?: string

  @Field({ nullable: true })
  @prop()
  bannerHash?: string

  @Field({ nullable: true })
  @prop({
    default() {
      Math.floor(Math.random() * 9999999)
    },
  })
  nonce!: number

  @Field(() => [Quest], { nullable: true })
  @prop({ ref: 'Quest' })
  questCompleted?: Array<Ref<Quest>>

  @prop({ ref: 'AppFile'})
  cover: Ref<AppFile>

  @Field({ nullable: true })
  @prop()
  avatar: string

  @Field(() => [SocialLink], { nullable: true })
  @prop({ type: () => [SocialLink]})
  socialLinks: SocialLink[]
}

export const AccountModel: ModelType<Account> = getModelForClass(Account, {
  schemaOptions: {
    timestamps: true,
    collection: 'accounts',
  },
})
