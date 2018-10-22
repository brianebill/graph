The third type of operation available with GraphQL is the subscription. There are times when a client might want to have real-time updates pushed from the server. A subscription allows us to listen to the GraphQL API for real-time data changes. Subscriptions in GraphQL came from a real-life use case at Facebook. The team wanted a way to show real-time information about the number of likes (Live Likes) that a post was getting without refreshing the page. Live Likes are a real-time use case that is powered by subscriptions. Every client is subscribed to the like event and sees likes being updated in real time. Just like the mutation and the query, a subscription is a root type. Data changes clients can listen to are defined in an API schema as fields under the subscription type. Writing the GraphQL query to listen for a subscription is also similar to how we would define other operations. For example, with Snowtooth, we can listen for the status change of any lift with a subscription:

subscription {
  liftStatusChange {
    name
    capacity
    status
  }
}

When we run this subscription, we listen for lift status changes over a WebSocket. Notice that clicking the play button in the GraphQL Playground doesn’t immediately return data. When the subscription is sent to the server, the subscription is listening for any changes to the data. To see data pushed to the subscription, we need to make a change. We need to open a new window or tab to send that change via a mutation. After a subscription operation is running in a GraphQL Playground tab, we cannot run anymore operations using the same window or tab.
