`Updating the Cache - The Query component is capable of reading directly from the cache. That’s what makes a fetch policy like cache-only possible. We are also able to interact directly with the Apollo Cache. We can read current data from the cache or write data directly to the cache.

Every time we change data stored in the cache, react-apollo detects that change and re-renders all of the effected components. All we have to do is change the cache and the UI will automatically update to match the change. Data is read from the Apollo Cache using GraphQL. You read queries. Data is written to the Apollo Cache using GraphQL, you write data to queries. Consider the ROOT_QUERY that is located in src/ App.js: `

export const ROOT_QUERY = gql `
  query allUsers { totalUsers allUsers { ... userInfo } me { ... userInfo } } fragment userInfo on User { githubLogin name avatar }
`

`This query has three fields in its selection set: totalUsers, allUsers, and me. We can read any data that we currently have stored in our cache using the cache.readQuery method: `

let { totalUsers, allUsers, me } = cache.readQuery({ query: ROOT_QUERY })

`In this line of code, we’ve obtained the values for totalUsers, allUsers, and me that were stored in the cache.

We can also write data directly to the totalUsers, allUsers, and me fields of the ROOT_QUERY using the cache.writeQuery method: `

cache.writeQuery({ query: ROOT_QUERY, data: { me: null, allUsers: [], totalUsers: 0 } })

`In this example, we are clearing all of the data from our cache and resetting default values for all of the fields in the ROOT_QUERY. Because we are using react-apollo, this change would trigger a UI update and clear the entire list of users from the current DOM. A good place to write data directly to the cache is inside of the logout function in the AuthorizedUser component. At present this function is removing the user’s token, but the UI does not update until the “Refetch” button has been clicked or the browser is refreshed.

To improve this feature, we will clear out the current user from the cache directly when the user logs out. First we need to make sure that this component has access to the client in its props. One of the fastest ways to pass this property is to use the withApollo higher order component. This will add the client to the AuthorizedUser component’s properties.

Since this component already uses the withRouter higher order component, we will use the compose function to make sure that the AuthorizedUser component is wrapped with both higher order components: `

import { Query, Mutation, withApollo, compose } from 'react-apollo'
class AuthorizedUser extends Component { ... }
export default compose( withApollo, withRouter)( AuthorizedUser)

`Using compose, we assemble the withApollo and withRouter functions into a single function.

withRouter adds the Router’s history to the properties, and withApollo adds Apollo Client to the properties.

This means that we can access Apollo Client in our logout method and use it to remove the details about the current user from the cache: `

logout = () = > {
  localStorage.removeItem(' token') let data = this.props.client.readQuery({ query: ROOT_QUERY }) data.me = null this.props.client.writeQuery({ query: ROOT_QUERY, data }) }

`The above code not only removes the current user’s token from localStorage, it clears the me field for the current user saved in the cache. Now when users log out, they will see the “Sign In with GitHub” button immediately without having to refresh the browser. This button is rendered only when the ROOT_QUERY doesn’t have any values for me.

Another place that we can improve our application thorough working directly with the cache is in the src/ Users.js file.

Currently, when we click the “Add Fake User” button, a mutation is sent to the GraphQL service. The Mutation component that renders the “Add Fake User” button contains the following property: `

refetchQueries ={[{ query: ROOT_QUERY }]}

`This property tells the client to send an additional query to our service once the mutation has completed. However, we are already receiving a list of the new fake users in the response of the mutation itself: `

mutation addFakeUsers( $ count:Int!) { addFakeUsers( count: $ count) { githubLogin name avatar } }

`Since we already have a list of the new fake users, there is no need to go back to the server for the same information. What we need to do is obtain this new list of users in the mutation’s response and add it directly to the cache. Once the cache changes, the UI will follow.

Find the Mutation component in the Users.js file that handles the addFakeUsers mutation and replace the refetchQueries with an update property: `

< Mutation mutation ={ ADD_FAKE_USERS_MUTATION} variables ={{ count: 1 }}
  update ={ updateUserCache} >
  {addFakeUsers =>
    < button onClick ={ addFakeUsers} >
      Add Fake User
    </ button >
  }
</ Mutation >

`Now, when the mutation has completed, the response data will be sent to a function called updateUserCache: `

const updateUserCache = (cache, { data:{ addFakeUsers } }) = > { let data = cache.readQuery({ query: ROOT_QUERY }) data.totalUsers + = addFakeUsers.length data.allUsers = [ ... data.allUsers, ... addFakeUsers ] cache.writeQuery({ query: ROOT_QUERY, data }) }

`When the Mutation component invokes the updateUserCache function, it sends the cache and the data that has been returned in the mutation’s response. We want to add the fake users to the current cache, so we’ll read the data that is already in the cache using cache.readQuery({ query: ROOT_QUERY }) and add to it.

First, we’ll increment the total users, data.totalUsers + = addFakeUsers.length. Then, we’ll concatenate the current list of users with the fake users that we’ve received from the mutation. Now that the current data has been changed, it can be written back to the cache using `

cache.writeQuery({ query: ROOT_QUERY, data })

`Replacing the data in the cache will cause the UI to update and display the new fake user. At this point, we have completed the first version of the User portion of our app. We can list all users, add fake users, and sign in with GitHub. We have built a full stack GraphQL application using Apollo Server and Apollo Client. The Query and Mutation components are tools that we can use to quickly begin developing clients with Apollo Client and React.

In Chapter   7, we see how we can incorporate subscriptions and file uploading into the PhotoShare application. We also discuss emerging tools in the GraphQL ecosystem that you can incorporate into your projects.
