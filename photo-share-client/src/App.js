import React from 'react'
import Users from './Users'
//import { BrowserRouter } from 'react-router-dom'
//import AuthorizedUser from './AuthorizedUser'
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
