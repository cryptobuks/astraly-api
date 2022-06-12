import { Field, ID, ObjectType } from 'type-graphql'
import { getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from '../../Utils/Types'

@ObjectType()
export class Quest {
    @Field(() => ID)
    readonly _id!: ObjectId
}

export const QuestModel = getModelForClass(Quest, {
    schemaOptions: {
        timestamps: true,
        collection: 'quests'
    }
})
