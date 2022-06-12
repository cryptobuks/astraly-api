import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { Field, ID, ObjectType } from 'type-graphql'
import { ObjectId } from '../../Utils/Types'
import { Quest } from '../Quest/Quest.Entity'

@ObjectType()
export class Account {
    @Field(() => ID)
    readonly _id!: ObjectId

    @Field({ nullable: true })
    @prop({
        required: true,
        unique: true
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
    bannerHast?: string

    @Field({ nullable: true })
    @prop({ default: 0 })
    nonce!: number

    @Field(() => [Quest], { nullable: true })
    @prop({ ref: 'Quest' })
    questCompleted?: Ref<Quest>[]
}

export const AccountModel = getModelForClass(Account, {
    schemaOptions: {
        timestamps: true,
        collection: 'accounts'
    }
})
