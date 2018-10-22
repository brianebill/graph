mutation {
  addFakeUsers(count: 3) {
    name
  }
}

mutation {
  fakeUserAuth(githubLogin:"jDoe") { 
    token
  }
}
