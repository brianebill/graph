https://github.com/login/oauth/authorize?client_id=2a9c388d6bdea7f96f35&scope=user

mutation {
  githubAuth(code: "<enter code from github here>") {
    token
    user {
      githubLogin
      name
      avatar
    }
  }
}

query currentUser {
  me {
    githubLogin
    name
    avatar
  }
}

//add to headers in playground
{
  "Authorization": {
    "token": process.env.CLIENT_ID
  }
}

{
  "data": {
    "githubAuth": {
      "token": "<github auth token>",
      "user": {
        "githubLogin": "brianebill",
        "name": null,
        "avatar": "https://avatars2.githubusercontent.com/u/1240213?v=4"
      }
    }
  }
}
