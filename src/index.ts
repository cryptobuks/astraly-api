import 'dotenv/config'

import 'reflect-metadata'
import Koa from 'koa'
import KoaRouter from '@koa/router'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import { ApolloServer } from 'apollo-server-koa'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { buildSchema } from './Utils/schema'
import Logger from './Utils/Logger'
import { globals } from './Utils/Globals'
import { initCheckpoint } from './Utils/Checkpoint'
import { connectToDb } from './Utils/Db'
import { initGlobals } from './Utils/Globals/init'
import { generateQuestsData } from './Utils/Seed/generateQuestsData'

initGlobals()

const app = new Koa()
app.use(cors())
app.use(
  bodyParser({
    formLimit: '500mb',
    jsonLimit: '500mb',
  })
)

const startServer = async (): Promise<void> => {
  await connectToDb(globals.DB_HOST, globals.DB_NAME)
  await generateQuestsData()

  const schema = await buildSchema()
  const server = new ApolloServer({
    schema,
    context: async ({ ctx }) => {
      let jwtToken = ctx?.request.headers.authorization || ''

      let address = ''

      if (jwtToken) {
        try {
          jwtToken = jwtToken.replace('Bearer ', '')
          const { data } = jwt.verify(jwtToken, globals.JWT_KEY) as JwtPayload
          address = data
        } catch (e) {
          console.error('CTX, INVALID JWT')
        }
      }

      return {
        jwtToken,
        address,
      }
    },
  })

  app.listen({ port: globals.PORT, host: globals.HOST }, () => {
    Logger.info(`🚀 Server ready at http://${globals.HOST}:${globals.PORT}${server.graphqlPath}, ${globals.API_URL}`)
  })

  await server.start()

  server.applyMiddleware({ app, path: `/api${server.graphqlPath}` })

  const apiRouter = new KoaRouter()

  apiRouter.get('/api', (ctx) => {
    ctx.body = 'hello captain'
  })

  app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

  await initCheckpoint()
}

void startServer()
