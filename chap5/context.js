`Context can be an object or a function. For our application to work, we need it to be a function so that we can set the context every time there is a request. When context is a function, it is invoked for every GraphQL request. The object that is returned by this function is the context that is sent to the resolver.

In the context function, we can capture the authorization header from the request and parse it for the token. After we have a token, we can use it to look up a user in our database. If we have a user, they will be added to context. If not, the value for user in context will be null. 

With this code in place, it is time to add the me query. First, we need to modify our typeDefs:`

type Query {
  me: User ...
}
