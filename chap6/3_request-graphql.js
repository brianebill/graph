graphql-request

`Though cURL and fetch work well, there are other frameworks that you can use to send GraphQL operations to an API. One of the most notable examples of this is graphql-request. graphql-request wraps fetch requests in a promise that can be used to make requests to the GraphQL server. It also handles the details of making the request and parsing the data for you. To get started with graphql-request, you first need to install it:`

npm install graphql-request

`From there, you import and use the module as request. Be sure to keep the photo service running on port 4000: import { request } from 'graphql-request'`

var query = `query listUsers { allUsers { name avatar } }`
request('http://localhost:4000/graphql', query)
.then( console.log)
.catch( console.error)

`The request function takes in url and query, makes the request to the server, and returns the data in one line of code. The data returned is, as expected, a JSON response of all of the users:`

{
  "allUsers": [
    {
      "name": "sharon adams",
      "avatar": "http://..."
    },
    {
      "name": "sarah ronau",
      "avatar": "http://..."
    },
    {
      "name": "paul young",
      "avatar": "http://..."
    },
  ]
}

`You can also send mutations with graphql-request:`

import { request } from 'graphql-request'
var url = 'http://localhost:4000/graphql'
var mutation = `
  mutation populate($count: Int!) {
    addFakeUsers( count: $ count) {
      id
      name
    }
  }
`
var variables = { count: 3 }
request( url, mutation, variables)
.then( console.log)
.catch( console.error)
