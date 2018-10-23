`To get started with react-apollo, all we need to do is create a client and add it to our user interface with a component called ApolloProvider. Replace the code found in the index.js file with the following:`

import React from 'react'
import { render } from 'react-dom'
import App from './ App'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
const client = new ApolloClient({ uri: 'http:// localhost: 4000/ graphql' })

render(
  <ApolloProvider client={ client}>
    <App/> 
  </ApolloProvider >,
  document.getElementById(' root')
)

`This is all the code you will need to get started using Apollo with React.

Here, we’ve created a client and then placed that client in React’s global scope with the help of a component called the ApolloProvider.

Any child component wrapped by the ApolloProvider will have access to the client. That means that the <App/> component and any of its children are ready to receive data from our GraphQL service via Apollo Client.`
