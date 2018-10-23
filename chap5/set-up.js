// A Query is a GraphQL type. We call it a root type because it’s a type that maps to an operation, and operations represent the roots of our query document.

//When we write queries, we are selecting the fields that we need by encapsulating them in curly brackets. These blocks are referred to as selection sets.

// To create the schema and enable the execution of queries against the schema, we will use Apollo Server:
//  1. Require Apollo service
const { ApolloServer } = require(' apollo-server')

//The typeDefs variable is where we define our schema. It’s just a string. Whenever we create a query like totalPhotos, it should be backed by a resolver function of the same name. The type definition describes which type the field should return.
const typeDefs = `
  type Query {
    totalPhotos: Int!
  }

  type Mutation {
    postPhoto( name: String! description: String): Boolean!
  }
  `
//The resolver function returns the data of that type from somewhere— in this case, just a static value of 42. It is also important to note that the resolver must be defined under an object with the same typename as the object in the schema.

// 1. A data type to store our photos in memory
var photos = []

const resolvers = {
  Query:
    { // 2. Return the length of the photos array
      totalPhotos: () = > photos.length
    },

  Mutation:
    { // 3. Mutation and postPhoto resolver
      // the parent of the postPhoto resolver is a Mutation. The parent does not currently contain any data that we need to use, but it is always the first argument sent to a resolver.
      //The second argument sent to the postPhoto resolver is the GraphQL arguments that were sent to this operation: the name and, optionally, the description. The args variable is an object that contains these two fields: {name, description}. Right now, the arguments represent one photo object, so we push them directly into the photos array.
      postPhoto(parent, args) { photos.push(args) return true }
    }
}

//The totalPhotos field is a part of the query object. The resolver for this field must also be a part of the Query object.

//We have created initial type definitions for our root query. We’ve also created our first resolver that backs the totalPhotos query field.

// 2. Create a new instance of the server.
// 3. Send it an object with typeDefs (the schema) and resolvers
const server = new ApolloServer({ typeDefs, resolvers })

// 4. Call listen on the server to launch the web server
server .listen() .then(({ url}) = > console.log( ` GraphQL Service running on ${ url} `))

// run npm start
