`Consuming Subscriptions Assuming that you completed the challenge in the preceding sidebar, the PhotoShare server supports subscriptions for Photos and Users.

In this next section, we subscribe to the newUser subscription and immediately display any new users on the page. Before we can get started, we need to set up Apollo Client to handle subscriptions. Adding the WebSocketLink Subscriptions are used over WebSockets. To enable WebSockets on the server, we need to install a few additional packages:`

npm install apollo-link-ws apollo-utilities

npm install --save subscriptions-transport-ws

`From here, we want to add a WebSocket link to the Apollo Client configuration. Locate the src/index.js file in the photo-share-client project and add the following imports:`

import { InMemoryCache, HttpLink, ApolloLink, ApolloClient, split } from 'apollo-boost'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

`Notice that we’ve imported split from apollo-boost. We will use this to split GraphQL operations between HTTP requests and WebSockets. If the operation is a mutation or a query, Apollo Client will send an HTTP request. If the operation is a subscription, the client will connect to the WebSocket.

Under the hood of Apollo Client, network requests are managed with ApolloLink. In the current app, this has been responsible for sending HTTP requests to the GraphQL service. Any time we send an operation with the Apollo Client, that operation is sent to an Apollo Link to handle the network request. We can also use an Apollo Link to handle networking over WebSockets. We’ll need to set up two types of links to support WebSockets: an HttpLink and a WebsocketLink: `

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })
const wsLink = new WebSocketLink({ uri: ` ws:// localhost:4000/graphql `, options: { reconnect: true } })

`The httpLink can be used to send HTTP requests over the network to http:// localhost: 4000/ graphql and the wsLink can be used to connect to ws:// localhost: 4000/ graphql and consume data over WebSockets. Links are composable. That means they can be chained together to build custom pipelines for our GraphQL operations.

In addition to being able to send an operation to a single ApolloLink, we can send an operation through a chain of reusable links where each link in the chain can manipulate the operation before it reaches the last link in the chain which handles the request and returns a result.

Lets create a link chain with the httpLink by adding a custom Apollo Link that is responsible for adding the authorization header to the operation: `

const authLink = new ApolloLink(
  (operation, forward) => {
    operation.setContext( context => ({
      headers: {
        ...context.headers,
        authorization: localStorage.getItem('token')
      }
    }))
  return forward( operation)
})

const httpAuthLink = authLink.concat( httpLink)

`The httpLink is concatenated to the authLink to handle user authorization for HTTP requests. Keep in mind that this .concat function is not the same function that you’ll find in JavaScript that concatenates arrays.

This is a special function that concatenates Apollo Links. Once concatenated, we have more appropriately named the link httpAuthLink to describe the behavior more clearly. When an operation is sent to this link, it will first be passed to the authLink where the authorization header is added to the operation before it is forwarded to the httpLink to handle the network request.

If you are familiar with middleware in Express or Redux, the pattern is similar. Now we need to tell the client which link to use.



`
