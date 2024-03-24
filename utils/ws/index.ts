import {WebSocketServer} from "ws";
import {Server} from 'http'

export const buildWsServer = (server: Server) => new WebSocketServer({
    server: server,
    path: '/graphql',
    handleProtocols: (_protocols, _request) => 'graphql-ws'
})