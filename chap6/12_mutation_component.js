`The Mutation Component When we want to send mutations to the GraphQL service, we can use the Mutation component. In the next example, we use this component to handle the addFakeUsers mutation. When we send this mutation, we write the new list of users directly to the cache. To begin, let’s import the Mutation component and add a mutation to the Users.js file:`

import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

...

const ADD_FAKE_USERS_MUTATION = gql `
  mutation addFakeUsers($count:Int!) {
    addFakeUsers(count: $ count) {
      githubLogin
      name
      avatar
    }
  }
`

`Once we have the mutation, we can use it in combination with the Mutation component. This component will pass a function to its children via render props. This function can be used to send the mutation when we are ready:`

const UserList = ({ count, users, refetchUsers }) =>
  <div>
    <p>{count} Users</p>
    <button onClick ={() =>
      refetchUsers()} >
      Refetch Users
    </button>
    <Mutation mutation={ADD_FAKE_USERS_MUTATION} variables={{ count: 1 }}>
      {addFakeUsers =>
        <button onClick={addFakeUsers}>
          Add Fake Users
        </button>}
    </Mutation>
    <ul>
      {users.map(user =>
        <UserListItem key={user.githubLogin} name={user.name} avatar={user.avatar}/>
      )}
    </ul>
  </div>

`Just as we sent query as a prop to the Query component, we will send a mutation prop to the Mutation component. Notice also that we’re using the variables property. This will send the necessary query variables with the mutation. In this case, it sets the count to 1, which will cause the mutation to add one fake user at a time. The Mutation component uses a function, addFakeUsers, that will send the mutation once it has been invoked. When the user clicks the “Add Fake Users” button, the mutation will be sent to our API. Currently, these users are being added to the database, but the only way to see the changes is to click the “Refetch Users” button. We can tell the Mutation component to refetch specific queries once the mutation has completed instead of waiting for our users to click a button: `

<Mutation mutation={ADD_FAKE_USERS_MUTATION} variables={{ count: 1 }} refetchQueries={[{ query: ROOT_QUERY }]}>
  {addFakeUsers =>
    <button onClick={ addFakeUsers}>
      Add Fake Users
    </button>
  }
</Mutation>

`refetchQueries is a property that lets you specify which queries to refetch after sending a mutation. Simply place a list of objects that contain queries. Each of the query operations found in this list will refetch data after the mutation has completed.`
