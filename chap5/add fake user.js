mutation {
  addFakeUsers(count: 1) {
    name
  }
}

mutation {
  fakeUserAuth(githubLogin:"jDoe") {
    token
  }
}
