`So far, we’ve talked a lot about reading data. Queries describe all of the reads that happen in GraphQL. To write new data, we use mutations. Mutations are defined like queries. They have names. They can have selection sets that return object types or scalars. The difference is that mutations perform some sort of a data change that affects the state of your backend data. For example, a dangerous mutation to implement would look like this:`

mutation burnItDown {
  deleteAllData
}

`The Mutation is a root object type. The API’s schema defines the fields that are available on this type. The API in the preceding example has the power to wipe out all data to the client by implementing a field called deleteAllData that returns a scalar type: true if all of the data was successfully deleted`

`Let’s consider another mutation. But instead of destroying something, let’s create something:`

mutation createSong {
  addSong( title:" No Scrubs", numberOne: true, performerName:" TLC") {
    id
    title
    numberOne
  }
}

const resolvers = {
  Query: { ... },
  Mutation: { ... },
  Photo: {
    url: parent => `http://yoursite.com/img/${parent.id}.jpg `
  }
}

`Because we are going to use a resolver for photo URLs, we’ve added a Photo object to our resolvers. This Photo resolver added to the root is called a trivial resolver. Trivial resolvers are added to the top level of the resolvers object, but they are not required.`

`When we select a photo’s url in our query, the corresponding resolver function is invoked. The first argument sent to resolvers is always the parent object. In this case, the parent represents the current Photo object that is being resolved. We’re assuming here that our service handles only JPEG images. Those images are named by their photo ID and can be found on the http://yoursite.com/img/route. Because the parent is the photo, we can obtain the photo’s ID through this argument and use it to automatically generate a URL for the current photo.`
