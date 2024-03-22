import { expressMiddleware } from '@apollo/server/express4'
import crypto from 'crypto'
import { type ApolloServer, type BaseContext } from '@apollo/server'
import { plainToInstance } from 'class-transformer'
import { Context } from '../../src/utils/Context'

export const graphqlMiddleware = (server: ApolloServer<BaseContext>) => expressMiddleware(server, {
  context: async ({ req }): Promise<Context> => {
    const requestId = crypto.randomUUID()

    const authorization = req.headers.authorization ?? ''

    return plainToInstance(Context, {
      requestId,
      user: undefined,
      token: authorization,
    })
  }
})
