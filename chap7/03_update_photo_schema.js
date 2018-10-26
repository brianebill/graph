`implement them. Posting photos We want to know when any of our users post a photo. This is a good use case for a subscription. Just like everything else in GraphQL, to implement subscriptions we need to start with the schema first. Let’s add a subscription type to the schema just below the definition for the Mutation type:`

type Subscription {
  newPhoto: Photo!
}

`The newPhoto subscription will be used to push data to the client when photos are added. We send a subscription operation with the following GraphQL query language operation:`

subscription {
  newPhoto {
    url
    category
    postedBy {
      githubLogin
      avatar
    }
  }
}

`This subscription will push data about new photos to the client. Just like a Query or Mutation, GraphQL allows us to request data about specific fields with selection sets. With this subscription every time there is a new photo, we will receive its url and category along with the githubLogin and avatar of the user who posted this photo.

When a subscription is sent to our service, the connection remains open. It is listening for data changes. Every photo that is added will push data to the subscriber. If you set up a subscription with GraphQL Playground, you will notice that the Play button will change to a red Stop button. The Stop button means that the subscription is currently open and listening for data. When you press the Stop button, the subscription will be unsubscribed. It will stop listening for data changes.
