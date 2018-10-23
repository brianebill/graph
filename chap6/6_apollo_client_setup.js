`To begin, we need to scaffold the frontend of this project using create-react-app.`

npm install -g create-react-app

`Once installed, you can create a React project anywhere on your computer with:`

create-react-app photo-share-client

`To start the application, navigate to the photo-share-client folder and`

run npm start.

`You’ll need to install a few packages to build a GraphQL client with Apollo tools. First, you’ll need graphql which includes the GraphQL language parser. Then you’ll need a package called apollo-boost. Apollo Boost includes the Apollo packages necessary for creating an Apollo Client and sending operations to that client. Finally, we’ll need react-apollo. React Apollo is an npm library that contains React components that we will use to construct a user interface with Apollo. Let’s install these three packages at the same time:`

npm install graphql apollo-boost react-apollo

`Now we are ready to create our client. The ApolloClient constructor found in apollo-boost can be used to create our first client. Open the src/ index.js file and replace the code in that file with the following:`
import ApolloClient from 'apollo-boost'
const client = new ApolloClient({ uri: 'http:// localhost: 4000/ graphql' })

`Using the ApolloClient constructor, we’ve created a new client instance. The client is ready to handle all network communication with the GraphQL service hosted at http://localhost:4000/graphql.

For example, we can use the client to send a query to the PhotoShare Service:`

import ApolloClient, { gql } from 'apollo-boost'
const client = new ApolloClient({ uri: 'http:// localhost: 4000/ graphql' })
const query = gql ` { totalUsers totalPhotos } `
client.query({ query})
.then(({ data }) => console.log(' data', data))
.catch( console.error)

`This code uses the client to send a query for the total photo count and the total user count. To make this happen, we imported the gql function from apollo-boost.

This function is a part of the graphql-tag package that was automatically included with apollo-boost. The gql function is used to parse a query into an AST or abstract syntax tree. We can send the AST to the client by invoking client.query({ query}). This method returns a promise. It sends the query as an HTTP request to our GraphQL service and resolves the data returned from that service. In the above example, we are logging the response to the console:`

{ totalUsers: 4, totalPhotos: 7, Symbol( id): "ROOT_QUERY" }

`In addition to handling all network requests to our GraphQL service, the client also caches the responses locally in memory. At any point, we can take a look at the cache by invoking client.extract():`

console.log(' cache', client.extract())
client.query({query})
.then(() = > console.log('cache', client.extract()))
.catch( console.error)

`Here we have a look at the cache before the query is sent, and another look at it after the query has been resolved. We can see that we now have the results saved in a local object which is managed by the client:`

{ ROOT_QUERY: { totalPhotos: 4, totalUsers: 7 } }

`The next time we send the client a query for this data, it will read it from the cache as opposed to sending another network request to our service.

Apollo Client provides us with options to specify when, and how often, we should send HTTP requests over the network.

Apollo Client is used to handle all network requests to our GraphQL service.

Additionally, by default, it automatically caches the results locally and defers to the local cache to improve our applications`
