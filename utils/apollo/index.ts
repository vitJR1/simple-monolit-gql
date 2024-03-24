import {GraphQLFormattedError} from "graphql/error";
import {GraphQLSchema} from "graphql/type";
import {ApolloServer} from "@apollo/server";
import {ApolloServerErrorCode} from "@apollo/server/errors";
import { Disposable } from 'graphql-ws'
import {useServer} from "graphql-ws/lib/use/ws";
import jwt from "jsonwebtoken";
import {SECRET_KEY} from "../../config";
import {buildWsServer} from "../ws";
import {server} from "../server";
import {
  ApolloServerPluginLandingPageLocalDefault
} from '@apollo/server/plugin/landingPage/default'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'

const apolloPlugins = ( serverCleanup: Disposable ) => {
    return [
      // BUILD_MODE !== 'main'
      //   ?
        ApolloServerPluginLandingPageLocalDefault(),
      //   :
      //   ApolloServerPluginLandingPageProductionDefault(),
      ApolloServerPluginDrainHttpServer({ httpServer: server }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      }
    ]
  }

const serverWsCleanupConfiguration = (schema: GraphQLSchema) => {
    return useServer({
      schema,
      context: (ctx, _message, _args) => {
        if(typeof ctx.connectionParams?.Authorization === 'string'){
          const tokenPayload = jwt.verify(ctx.connectionParams.Authorization, SECRET_KEY) as any
          return { user: tokenPayload }
        }
        throw Error('Can not init context')
      },
      onSubscribe: (ctx) => {
        if(
          ctx.connectionParams === undefined ||
          typeof ctx.connectionParams?.Authorization !== 'string'
        ){
          throw Error('connectionParams is undefined')
        }
      }
    }, buildWsServer(server))
  }

export const createServer = (schema: GraphQLSchema) => new ApolloServer( {
        schema,
        introspection: true,
        plugins: apolloPlugins(
          serverWsCleanupConfiguration(schema)
        ),
        formatError: ( formattedError: GraphQLFormattedError, _: unknown ) => {
            if (formattedError.extensions?.stacktrace !== undefined) {
              formattedError.extensions.stacktrace = undefined
            }
            if (
              formattedError.extensions?.code ===
              ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
            ) {
              return {
                ...formattedError,
                message: "Your query doesn't match the schema. Try double-checking it!"
              }
            }

            return formattedError
          }
    } )