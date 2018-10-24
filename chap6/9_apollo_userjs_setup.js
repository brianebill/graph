`Create a new file called src/ Users.js and place this code inside of that file:`

import React from 'react'
import { Query } from 'react-apollo'
import { ROOT_QUERY } from './App'
const Users = () =>
  <Query query={ROOT_QUERY}>
    {result =>
      <p>Users are loading: { result.loading ? "yes" : "no"}</p>
    }
  </Query>

export default Users

`Now you should see the error clear, and the message “Users are loading: no” should be displayed in the browser`

`Under the hood, the Query component is sending the ROOT_QUERY to our GraphQL service and caching the result locally. We obtain the result using a React technique called render props.

Render props allow us to pass properties as function arguments to child components. Notice that we are obtaining the result from a function and returning a paragraph element. The result contains more information than just the response data. It will tell us whether or not an operation is loading via the result.loading property.

In the preceding example, we can tell the user whether or not the current query is loading.

Once the data has loaded, it will be passed along with the result.

Instead of displaying “yes” or “no” when the client is loading data, we can display UI components instead. Let’s adjust the Users.js file:`

const Users = () =>
  <Query query ={ROOT_QUERY}>
  {({ data, loading }) => loading ?
   <p> loading users... </p> :
   <UserList count ={data.totalUsers} users ={ data.allUsers}/> }
  </Query>

const UserList = ({ count, users }) =>
  <div>
    <p>{count} Users</p>
    <ul>
      {users.map(user =>
        <UserListItem
          key ={user.githubLogin}
          name ={ user.name}
          avatar ={ user.avatar}/>
        )}
      </ul>
    </div>

  const UserListItem = ({ name, avatar }) =>
    <li>
      <img src ={avatar} width ={48} height ={48} alt =""/>
      {name}
    </li>
