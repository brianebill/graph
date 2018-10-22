https://github.com/login/oauth/authorize?client_id=2a9c388d6bdea7f96f35&scope=user

//localhost 4000
//CLIENT_ID = 2a9c388d6bdea7f96f35
//SECRET = 5574bb36cf79bf828ad83b13a24b30d263474bba
// code = 2381b5904adb4fe47366

// localhost 3000
// CLIENT_ID = a087283ca5e006f1d8fb
// SECRET = 504908e52a7080975441433a06d5d79b58693fe3
// code = 1ec2524c7fb5a7cb058d

mutation {
  githubAuth(code: "b8fe6e0d57e500b13a10") {
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
    "token": "cd2bdf0e7e1ea57095b9a1676dd22c09aeb51fe0"
  }
}

{
  "data": {
    "githubAuth": {
      "token": "cd2bdf0e7e1ea57095b9a1676dd22c09aeb51fe0",
      "user": {
        "githubLogin": "brianebill",
        "name": null,
        "avatar": "https://avatars2.githubusercontent.com/u/1240213?v=4"
      }
    }
  }
}
