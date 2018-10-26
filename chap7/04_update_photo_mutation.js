`It is finally time to take a look at the postPhoto mutation: the mutation that adds new photos to the database. We want to publish new photo details to our subscription from this mutation:`

async postPhoto( root, args, {db, currentUser, pubsub }) {
  if (!currentUser) { throw new Error('only an authorized user can post a photo') }
  const newPhoto = {
    ...args.input,
    userID:
    currentUser.githubLogin,
    created: new Date()
  }
  const { insertedIds } = await db.collection('photos').insert(newPhoto)
  newPhoto.id = insertedIds[0]
  pubsub.publish('photo-added', {newPhoto})
  return newPhoto
},

`This resolver expects that an instance of pubsub has been added to context. We’ll do that in the next step.

pubsub is a mechanism that can publish events and send data to our subscription resolver.

It’s like the Node.js EventEmitter.

You can use it to publish events and send data to every handler that has subscribed to an event. Here, we publish a photo-added event just after we insert a new photo to the database. The details of the new photo are passed as the second argument of the pubsub.publish method. This will pass details about the new photo to every handler that has subscribed to photo-added events. Next, let’s add the Subscription resolver that will be used to subscribe to photo-added events:

This resolver expects that an instance of pubsub has been added to context. We’ll do that in the next step. 
`
