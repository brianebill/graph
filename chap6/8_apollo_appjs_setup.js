`The Query Component Using Apollo Client, we need a way to handle queries to fetch data to load into our React UI. The Query component will take care of fetching data, handling loading state, and updating our UI.

We can use the Query component anywhere within the ApolloProvider. The Query component sends a query using the client. Once resolved, the client will return the results that we’ll use to construct the user interface.

Open the src/ App.js file and replace the code that is currently inside of this file with the following:`

import React from 'react'

import Users from './ Users'
import { gql } from 'apollo-boost'
export const ROOT_QUERY = gql `
  query allUsers {
    totalUsers
    allUsers {
      githubLogin
      name
      avatar
    }
  }
`

const App = () => <Users/>
export default App

`In the App component, we’ve created a query called ROOT_QUERY. Remember, one of the benefits of using GraphQL is to request everything you’ll need to construct your UI and receive all of that data in a single response. That means we are going to request both the totalUsers count and the allUsers array in a query that we’ve created in the root of our application.

Using the gql function, we’ve converted our string query an AST object named ROOT_QUERY, and we’ve exported this object so that other components can use it.

At this point, you should see an error. This is because we’ve told the App to render a component that we have not created.`
