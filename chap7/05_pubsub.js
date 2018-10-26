`Next, let’s add the Subscription resolver that will be used to subscribe to photo-added events:`

const resolvers = { ...
  Subscription: {
    newPhoto: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('photo-added') }
    }
  }

`The Subscription resolver is a root resolver. It should be added directly to the resolver object right next to the Query and Mutation resolvers.

Within the Subscription resolver, we need to define resolvers for each field. Since we defined the newPhoto field in our schema, we need to make sure a newPhoto resolver exists in our resolvers.

Unlike Query or Mutation resolvers, Subscription resolvers contain a subscribe method. The subscribe method receives the parent, args, and context just like the any other resolver functions.

Inside of this method, we subscribe to specific events. In this case, we are using the `
pubsub.asyncIterator
`to subscribe to photo-added events. Any time a photo-added event is raised by pubsub, it will be passed through this new photo subscription.`

`The postPhoto resolver and the newPhoto subscription resolver both expect there to be an instance of pubsub in context. Let’s modify the context to include pubsub. Locate the index.js file and make the following changes:
`
const { ApolloServer, PubSub } = require('apollo-server-express')
...
async function start() {
  ...
  const pubsub = new PubSub()
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, connection }) => {
      const githubToken = req ?
        req.headers.authorization :
        connection.context.Authorization

      const currentUser = await db .collection('users').findOne({ githubToken })
      return { db, currentUser, pubsub }
    }
  })
  ...
}

`First, we need to import the PubSub constructor from apollo-server-express package.

We use this constructor to create a pubsub instance and add it to context.

You may have also notice that we change the context function.

Queries and mutations will still use HTTP. When we send either of these operations to the GraphQL Service the request argument, req, is sent to the context handler.

However, when the operation is a Subscription, there is no HTTP request so the req argument is null.

Information for subscriptions is instead passed when the client connects to the WebSocket. In this case, the WebSocket connection argument will be sent to the context function instead.

When we have a subscription we’ll have to pass authorization details through the connection’s context, not the HTTP request headers. Now we are ready to try out our new subscription. Open the playground and start a subscription:`

subscription {
  newPhoto {
    name
    url
    postedBy {
      name
    }
  }
}

`Once the subscription is running, open a new Playground tab and run the postPhoto mutation. Every time you run this mutation, you will see your new photo data sent to the subscription.`
