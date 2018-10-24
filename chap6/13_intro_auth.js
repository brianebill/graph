`Authorization In Chapter 5, we built a mutation to authorize a user with GitHub. In the following section, we show you how to set up user authorization on the client side.

The process of authorizing a user involves several steps. The bold steps indicate the functionality we’ll add to the client:

Client Redirects the user to GitHub with the client_id
User Allows access to account information on GitHub for the client application
GitHub Redirects back to the website with code: http:// localhost: 3000? code = XYZ
Client Sends GraphQL Mutation authUser(code) with code
API Requests a GitHub access_token with client_id, client_secret, and client_code
GitHub Responds with access_token that can be used with future info requests
API Request user info with access_token GitHub Responds with user info: name, github_login, avatar_url
API Resolves authUser( code) mutation with AuthPayload, which contains a token and the user
Client Saves token to send with future GraphQL requests
`
