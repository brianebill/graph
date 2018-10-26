`Uploading Files There’s one last step to creating our PhotoShare application— actually uploading a photo. In order to upload a file with GraphQL, we need to modify both the API and the client so that they can handle multipart/ form-data, the encoding type that is required to pass a file with a POST body over the internet. We are going to take an additional step that will allow us to pass a file as a GraphQL argument so that the file itself can be handled directly within the resolver.

To help us with this implementation, we are going to use two npm packages: `

apollo-upload-client and apollo-upload-server.

`Both of these packages are designed to pass files from a web browser over HTTP.

apollo-upload-client will be responsible for capturing the file in the browser and passing it along to the server with the operation.

apollo-upload-server is designed to handle files passed to the server from apollo-upload-client.

apollo-upload-server captures the file and maps it to the appropriate query argument before sending it to the resolver as an argument.

Handling Uploads on the Server Apollo Server automatically incorporates the apollo-upload-server.

There is no need to install that npm in your API project because it’s already there and working. The GraphQL API needs to be ready to accept an uploaded file.

An Upload custom scalar type is provided in the Apollo Server. It can be used to capture the file stream, mimetype, and encoding of an uploaded file.

We’ll start with the schema first, adding a custom scalar to our type definitions. In the schema file, we’ll add the Upload scalar: `

scalar Upload input PostPhotoInput {
  name: String!
  category: Photo_Category = PORTRAIT
  description: String,
  file: Upload!
}

`The Upload type will allow us to pass the contents of a file with our PostPhotoInput. This means that we will receive the file itself in the resolver.

The Upload type contains information about the file including an upload stream that we can use to save the file. Let’s use this stream in the postPhoto mutation.

Add the following code to the bottom of the postPhoto mutation found in resolvers/ Mutation.js: `

const { uploadStream } = require('../ lib')
const path = require(' path') ...
async postPhoto( root, args, { db, user, pubsub }) => {
  ...

  var toPath = path.join(__dirname, '..', 'assets', 'photos', `${newPhoto.id}.jpg`)
  await { stream } = args.input.file
  await uploadStream(stream, toPath)
  // await uploadFile(input.file, toPath)
  pubsub.publish('photo-added', { newPhoto })
  return newPhoto
},

`In this example, the uploadStream function would return a promise which would be resolved when the upload is complete. The file argument contains the upload stream that can be piped to a writeStream and saved locally to the assets/ photos directory.

Each newly posted photo will be named based upon its unique identifier. We are only handling JPEG images in this example for brevity.

If we want to serve these photo files from the same API, we will have to add some middleware to our Express application that will allow us to serve static JPEG images. In the index.js file where we set up our Apollo Server, we can add the`

express.static middleware

`that allows us to serve local static files over a route:`

 const path = require(' path') ...
 app.use(
   '/img/photos',
   express.static(path.join(__dirname, 'assets', 'photos'))
 )

 `This bit of code will handle serving the static files from assets/photos to /img/photos for HTTP requests. With that, our server is in place and can now handle photo uploads. 
`
