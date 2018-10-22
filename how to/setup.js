npm init -y
npm install apollo-server graphql nodemon

// nodemon will watch files for changes and restart the server when we make changes. This way, we won’t have to stop and restart the server every time we make a change.

//Let’s add the command for nodemon to the package.json on the scripts key:

"scripts": { "start": "nodemon -e js, json, graphql" }

// Now every time we run npm start, our index.js file will run and nodemon will watch for changes in any files with a js, json, or graphql extension.

//A schema defines the query operations that clients are allowed to make and also how different types are related. A schema describes the data requirements but doesn’t perform the work of getting that data. That work is handled by resolvers. A resolver is a function that returns data for a particular field. Resolver functions return data in the type and shape specified by the schema. Resolvers can be asynchronous and can fetch or update data from a REST API, database, or any other service.

// In our index.js file at the root of the project, let’s add the totalPhotos field to the Query:

const typeDefs = ` type Query { totalPhotos: Int! } `
const resolvers = { Query: { totalPhotos: () = > 42 } }

//The typeDefs variable is where we define our schema. It’s just a string. Whenever we create a query like totalPhotos, it should be backed by a resolver function of the same name. The type definition describes which type the field should return. The resolver function returns the data of that type from somewhere— in this case, just a static value of 42. It is also important to note that the resolver must be defined under an object with the same typename as the object in the schema. The totalPhotos field is a part of the query object. The resolver for this field must also be a part of the Query object. We have created initial type definitions for our root query. We’ve also created our first resolver that backs the totalPhotos query field. 

// 1. Require 'apollo-server'

const { ApolloServer } = require(' apollo-server')

const typeDefs = ` type Query { totalPhotos: Int! } `
const resolvers = { Query: {
