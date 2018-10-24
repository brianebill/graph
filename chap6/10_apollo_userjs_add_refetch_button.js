`The results object also has several utility functions for pagination, refetching, and polling. Let’s use the refetch function to refetch the list of users when we click a button:`
const Users = () =>
  <Query query ={ ROOT_QUERY}>
    {({ data, loading, refetch }) =>
      loading ?
      <p>loading users...</p> :
      <UserList count ={data.totalUsers}
      users ={data.allUsers}
      refetchUsers ={refetch}/>
    }
  </Query >
`Here we’ve obtained a function that can be used to refetch the ROOT_QUERY or request the data from the server again. The refetch property is simply a function. We can pass it to the UserList where it can be added to a button click:`
const UserList = ({ count, users, refetch }) =>
  <div>
    <p>{count} Users</p>
    <button onClick ={() =>
      refetch()}> Refetch </button>
      <ul>
        {users.map( user =>
          <UserListItem
            key={user.githubLogin}
            name={user.name}
            avatar ={user.avatar}/>
        )}
      </ul>
    </div>
`In the UserList, we are using the refetch function to request the same root data from our GraphQL service. Whenever you click the “Refetch Users” button, another query will be sent to the GraphQL endpoint to refetch any data changes. This is one way to keep your user interface in sync with the data on the server.`
