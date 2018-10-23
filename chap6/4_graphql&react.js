`Our file starts with an import of both React and ReactDOM.`

import React from 'react'
import ReactDOM from 'react-dom'
import { request } from 'graphql-request'

var url = 'http://localhost:4000/graphql'
var query = `
  query listUsers {
    allUsers {
      avatar
      name
    }
  }
`
var mutation = `
  mutation populate($count: Int!) {
    addFakeUsers(count: $count) {
      githubLogin
    }
  }
`

`We then create an App component. App maps over the users that are passed as props and creates div elements containing their avatar and username.`
const App = ({ users =[] }) =>
  <div> {
    users.map(user =>
      <div key={user.githubLogin}>
        <img src ={user.avatar} alt ="" />
        {user.name}
      </div>
    )}
    <button onClick={addUser}>Add User</button>
  </div>
`This little app also handles mutations. In the App component, the button has an onClick event that calls the addUser function. When invoked, this sends the mutation and then calls requestAndRender to issue a new request for the services users and rerenders the < App /> with the new list of users.`

`The render function renders the App to the #root element and passes in allUsers as a property.`
const render = ({ allUsers =[] }) =>
  ReactDOM.render(<App users={allUsers}/>,
    document.getElementById('root')
  )

const addUser = () =>
  request( url, mutation, {count: 1})
  .then(requestAndRender)
  .catch( console.error)

`From there, requestAndRender calls request from graphql-request. This issues the query, receives the data, and then calls render, which provides the data to the App component.`
const requestAndRender = () =>
  request(url, query)
  .then( render)
  .catch( console.error)

requestAndRender()
