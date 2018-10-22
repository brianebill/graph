const { GraphQLScalarType } = require('graphql')

module.exports = {
  Photo: {
    id: parent => parent.id || parent._id,
    url: parent => `/img/photos/${parent._id}.jpg`,
    postedBy: (parent, args, { db }) => db.collection('users').findOne({ githubLogin: parent.userID }) 
    // taggedUsers: parent => tags
    // .filter(tag => tag.photoID === parent.id) // Returns an array of tags that only contain the current photo
    // .map(tag => tag.userID) // Converts the array of tags into an array of userIDs
    // .map(userID => users.find( u => u.githubLogin === userID)) // Converts array of userIDs into an array of user objects
  },

  User: {
    postedPhotos: parent => { return photos.filter(p => p.githubUser === parent.githubLogin) },
    inPhotos: parent => tags
    // Returns an array of tags that only contain the current user
    .filter(tag => tag.userID === parent.id)
    // Converts the array of tags into an array of photoIDs
    .map(tag => tag.photoID)
    // Converts array of photoIDs into an array of photo objects
    .map(photoID => photos.find( p => p.id === photoID))
  },

  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'A valid date time value.',
    parseValue: value => new Date(value),
    serialize: value => new Date(value).toISOString(),
    parseLiteral: ast => ast.value
  })
}
