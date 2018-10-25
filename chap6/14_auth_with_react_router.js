`Authorizing the User It is now time to authorize the user. To facilitate this example, we use React Router, which we install via npm:`

npm install react-router-dom

`Let’s modify our main <App/> component. We’ll incorporate the BrowserRouter, and we’ll add a new component, AuthorizedUser, that we can use to authorize users with GitHub:`

import React from 'react'
import Users from './ Users'
import { BrowserRouter } from 'react-router-dom'
import { gql } from 'apollo-boost'
import AuthorizedUser from './ AuthorizedUser'

export const ROOT_QUERY = gql `
  query allUsers {
    totalUsers
    allUsers {
      ...userInfo
    }
    me {
      ...userInfo
    }
  } fragment userInfo on User {
    githubLogin
    name
    avatar
  }
`

const App = () =>
  <BrowserRouter>
    <div>
      <AuthorizedUser/><Users/>
    </div>
  </BrowserRouter>

export default App

`BrowserRouter wraps all of the other components that we want to render. We also will add a new AuthorizedUser component, which we will build in a new file. We should see an error until we add that component.

We’ve also modified the ROOT_QUERY to get it ready for authorization.

We are now additionally asking for the me field, which returns information about the current user when someone is logged in. When a user is not logged in, this field will simply return null.

Notice that we’ve added a fragment called userInfo to the query document. This allows us obtain the same information about a User in two places: the me field and the allUsers field.

The AuthorizedUser component should redirect the user to GitHub to request a code. That code should be passed back from GitHub to our app at http://localhost:3000

In a new file called AuthorizedUser.js, let’s implement this process:`

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class AuthorizedUser extends Component {
  state = { signingIn: false }
  componentDidMount() {
    if (window.location.search.match(/ code =/)) {
      this.setState({ signingIn: true })
      const code = window.location.search.replace("? code =", "")
      alert( code) this.props.history.replace('/')
    }
  }
  requestCode() {
    var clientID = <YOUR_GITHUB_CLIENT_ID>
    window.location = `https:// github.com/ login/ oauth/ authorize? client_id = ${ clientID}& scope = user `
  }

  render() {
    return (
      <button onClick ={ this.requestCode} disabled ={ this.state.signingIn} >
      Sign In with GitHub
      </ button >
    )
  }
}

export default withRouter(AuthorizedUser)

`The AuthorizedUser component renders a “Sign In with GitHub” button. Once clicked, this button will redirect the user to GitHub’s OAuth process. Once authorized, GitHub will pass a code back to the browser: http:// localhost: 3000? code = XYZGNARLYSENDABC. If the code is found in the query string, the component parses it from the window’s location and displays it in an alert box to the user before removing it with the history property that was sent to this component with React Router.

Instead of sending the user an alert with the GitHub code, we need to send it to the githubAuth mutation:`

import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { ROOT_QUERY } from './App'

const GITHUB_AUTH_MUTATION = gql `
  mutation githubAuth( $ code:String!) {
    githubAuth( code: $ code) {
      token
    }
  }
`

`The above mutation will be used to authorize the current user. All we need is the code.

Let’s add this mutation to the render method of this component:`

render() {
  return (
    < Mutation mutation ={ GITHUB_AUTH_MUTATION}
      update ={ this.authorizationComplete}
      refetchQueries ={[{ query: ROOT_QUERY }]} >
      {
        mutation => {
          this.githubAuthMutation = mutation
          return (
            < button onClick ={ this.requestCode} disabled ={ this.state.signingIn} >
              Sign In with GitHub
            </ button >
          )
        }
      }
    </ Mutation >
  )
}

`The Mutation component is tied to the GITHUB_AUTH_MUTATION. Once completed, it will invoke the component’s authorizationComplete method and refetch the ROOT_QUERY.

The mutation function has been added to the scope of the AuthorizedUser component by setting: this.githubAuthMutation = mutation. We can now invoke this this.githubAuthMutation() function when we are ready (when we have a code).

Instead of alerting the code, we will send it along with the mutation to authorize the current user.

Once authorized, we will save the resulting token to localStorage and use the router’s history property to remove the code from the window’s location:`

class AuthorizedUser extends Component {
  state = { signingIn: false }
  authorizationComplete = (cache, { data }) => {
    localStorage.setItem(' token', data.githubAuth.token)
    this.props.history.replace('/')
    this.setState({ signingIn: false })
  }
  componentDidMount() {
    if (window.location.search.match(/ code =/)) {
      this.setState({ signingIn: true })
      const code = window.location.search.replace("? code =", "")
      this.githubAuthMutation({ variables: {code} })
    }
  }
  ...
}

`To start the authorization process, invoke this.githubAuthMutation() and add the code to the operation’s variables. Once complete, the authorizationComplete method will be called. The data passed to this method is the data that we selected in the mutation. It has a token. We’ll save the token locally and use React Router’s history to remove the code query string from the window’s location bar. At this point, we will have signed in the current user with GitHub. The next step will be to make sure that we send this token along with every request in the HTTP headers.`
