`Up to this point, we have implemented GraphQL queries and mutations using the HTTP protocol. HTTP gives us a way to send and receive data between the client and the server, but it does not help us connect to a server and listen for state changes. Before WebSockets were introduced, the only way to listen for state changes on the server was to incrementally send HTTP requests to the server to determine whether anything had changed. We saw how to easily implement polling with the query tag in Chapter 6.

Apollo Server already supports subscriptions. It wraps a couple of npm packages that are routinely used to set up WebSockets in GraphQL applications:

graphql-subscriptions
subscriptions-transport-ws

The graphql-subscriptions package is an npm package that provides an implementation of the publisher/subscriber design pattern, PubSub. PubSub is essential for publishing data changes that client subscribers can consume. subscriptions-transport-ws is a WebSocket server and client that allows transporting subscriptions over WebSockets. Apollo Server automatically incorporates both of these packages to support subscriptions out of the box.

By default, Apollo Server sets up a WebSocket at`

ws://localhost: 4000.

`If you use the simple server configuration that we demonstrated at the beginning of Chapter 5, you’re using a configuration that supports WebSockets out of the box. Because we are working with apollo-server-express, we’ll have to take few steps to make subscriptions work.

Locate the index.js file in the photo-share-api and import the createServer function from the http module:`

const { createServer } = require('http')

`Apollo Server will automatically set up subscription support, but to do so, it needs an HTTP server. We’ll use createServer to create one.

Locate the code at the bottom of the start function where the GraphQL service is started on a specific port with app.listen(...). Replace this code with the following:`

const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)
httpServer.listen({ port: 4000 }, () =>
  console.log(`GraphQL Server running at localhost:4000${server.graphqlPath}`)
)

`First, we create a new httpServer using the Express app instance.
The httpServer is ready to handle all of the HTTP requests sent to it based upon our current Express configuration.
We also have a server instance where we can add WebSocket support. The next line of code,`

server.installSubscriptionHandlers(httpServer)

`is what makes the WebSockets work. This is where Apollo Server adds the necessary handlers to support subscriptions with WebSockets. In addition to an HTTP server, our backend is now ready to receive requests at`

ws://localhost:4000/graphql
