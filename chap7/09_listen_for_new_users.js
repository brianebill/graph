`Listening for new users On the client, we can listen for new users by creating a constant called LISTEN_FOR_USERS.

This contains a string with our subscription that will return a new user’s githubLogin, name, and avatar: `

const LISTEN_FOR_USERS = gql `
  subscription {
    newUser {
      githubLogin
      name
      avatar
    }
  }
`

`Then, we can use the < Subscription /> component to listen for new users: `

<Subscription subscription={LISTEN_FOR_USERS}> {({ data, loading }) =>
  loading ? <p>loading a new user...</p> :
  <div><img src ={data.newUser.avatar} alt ="" />
  <h2 >{data.newUser.name}</h2></div>
</Subscription>

`As you can see here, the < Subscription /> component works like the < Mutation /> or < Query /> components.

You send it the subscription, and when a new user is received, their data is passed to a function.

The problem with using this component in our app is that the newUser subscription passes one new user at a time. So, the preceding component would show only the last new user that was created.

What we want to do is listen for new users when the PhotoShare client starts, and when we have a new user, we add them to our current local cache. When the cache is updated, the UI will follow, so there is no need to change anything about the UI for new users.`

`Let’s modify the App component. First, we convert it to a class component so that we can take advantage of React’s component lifecycle. When the component mounts, we start listening for new users via our subscription. When the App component unmounts, we stop listening by invoking the subscription’s unsubscribe method: `

import { withApollo } from 'react-apollo' 
...
class App extends Component {
  componentDidMount() {
    let { client } = this.props
    this.listenForUsers = client.subscribe({ query: LISTEN_FOR_USERS }).subscribe(({ data:{ newUser } }) => {
      const data = client.readQuery({ query: ROOT_QUERY })
      data.totalUsers + = 1
      data.allUsers = [ ...data.allUsers, newUser ]
      client.writeQuery({ query: ROOT_QUERY, data })
    })
  }
  componentWillUnmount() {
    this.listenForUsers.unsubscribe()
  }

  render() {
    ... }
}

export default withApollo(App)

`When we export the < App /> component, we use the withApollo function to pass the client to the App via props.

When the component mounts, we will use the client to start listening for new users.

When the component unmounts, we stop the subscription using the unsubscribe method.

The subscription is created using the client.subscribe().subscribe(). The first subscribe function is an Apollo Client method that is used to send the subscription operation to our service. It returns an observer object. The second subscribe function is a method of the observer object. It is used to subscribe handlers to the observer. The handlers are invoked every time the subscription pushes data to the client.

In the above code, we’ve added a handler that captures the information about each new users and adds them directly to the Apollo Cache using writeQuery. Now, when new users are added, they are instantly pushed into our local cache which immediately updates the UI. Because the subscription is adding every new user to the list in real time, there is no longer a need to update the local cache from src/Users.js. Within this file, you should remove the updateUserCache function as well as the mutation’s update property. You can see a completed version of the app component at the book’s website.
`
