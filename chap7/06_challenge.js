`Challenge: newUser subscription

Can you implement a newUser subscription?

Whenever new users are added to the database via the githubLogin or the addFakeUsers mutation, can you publish a new-user event to a subscription?

Hint: when handling addFakeUsers, you might need to publish the event a number of times, once for each user added. If you get stuck, you can find the answer in the repo.

Add schema:`
type Subscription {
  newPhoto: Photo!
  newUser: User!
}

`Update mutation:`

addFakeUsers: async (root, { count }, { db, pubsub }) => {
  var randomUserApi = `https://randomuser.me/api/?results=${count}`
  var { results } = await fetch(randomUserApi).then(res => res.json())
  var users = results.map( r => ({
    githubLogin: r.login.username,
    name: `${r.name.first} ${r.name.last}`,
    avatar: r.picture.thumbnail,
    githubToken: r.login.sha1
  }))

  var newUsers = await db.collection('users')
      .find()
      .sort({ _id: -1 })
      .limit(count)
      .toArray()

  newUsers.forEach(newUser => pubsub.publish('user-added', {newUser}))
  return users
},

`Add subscription resolver:`

module.exports = {
  newPhoto: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('photo-added')
  },
  newUser: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('user-added')
  }
}

`test query in graphql:`

subscription {
  newUser {
    name
  }
}

`And it works`
