import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { Project, ProjectModel } from './Project.Entity'
import { DocumentType } from '@typegoose/typegoose'
import { UserAccess } from '../../Modules/Auth/AuthChecker'
import { ProjectInput } from './Project.InputTypes'

@Resolver()
export class ProjectResolvers {
    @Query(() => [Project])
    async searchProjects (@Arg('search') search?: string): Promise<Array<DocumentType<Project>>>{
        const regex = new RegExp(`${search}`, 'ig')
        return await ProjectModel.find({
            name: regex
        }).exec()
    }

    @Authorized([UserAccess.Admin])
    @Query(() => [Project])
    async projects (): Promise<Array<DocumentType<Project>>> {
        return await ProjectModel.find({}).exec()
    }

    @Authorized([UserAccess.Admin])
    @Mutation(() => Project, { nullable: true })
    updateProject (@Arg('data') data: ProjectInput): void {
        console.log(data)
    }

}
