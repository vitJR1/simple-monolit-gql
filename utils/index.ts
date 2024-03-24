import {buildSchemaPromise} from "./apollo/schema";
import source from "./database";
import {createServer} from "./apollo";
import {addDataSourceToRequest} from "./database/middleware";
import {graphqlMiddleware} from "./graphql/graphqlMiddleware";
import app from "./express";
import "./server";

(async () => {
    const schema = await buildSchemaPromise

    const dataSources = await source.initialize()

    const apolloServer = createServer(schema)

	await apolloServer.start()

    app.use(addDataSourceToRequest(dataSources))
    app.use( '/graphql', graphqlMiddleware( apolloServer ) )
})()