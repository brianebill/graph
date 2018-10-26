`This is where split comes in handy. The split function will return one of two Apollo Links based upon a predicate. The first argument of the split function is the predicate. A predicate is a function that returns true or false.

The second argument of the split function represents the link to return when the predicate returns true, and the third argument represents the link to return when the predicate returns false.

Let’s implement a split link that will check to see if our operation happens to be a subscriptions. If it is a subscription, we will use the wsLink to handle the network, otherwise we will use the httpLink: `

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink, httpAuthLink
)

`The first argument is the predicate function. It will check the operation’s query AST using the getMainDefinition function.

If this operation is a subscription, then our predicate will return true.

When the predicate returns true, the link will return the wsLink.

When the predicate returns false the link will return the httpAuthLink.

Finally, we need to change our Apollo Client configuration to use our custom links by passing it the link and the cache: `

const client = new ApolloClient({ cache, link })

`Now our client is ready to handle subscriptions. In the next section, we will send our first subscription operation using Apollo Client.`
