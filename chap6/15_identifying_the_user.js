`Identifying the User Our next task is to add a token to the authorization header for each request. Remember, the photo-share-api service that we created in the last chapter will identify users who pass an authorization token in the header. All we have to do is make sure any token saved to localStorage is sent along with every request sent to our GraphQL service. Let’s modify the src/ index.js file. We need to find the line where we create the Apollo Client and replace it with this code:`

const client = new ApolloClient({ uri: 'http:// localhost: 4000/ graphql', request: operation = > { operation.setContext( context = > ({ headers: { ... context.headers, authorization: localStorage.getItem(' token') } })) } })

`We’ve now added a request method to our Apollo Client configuration. This method pass the details about every operation just before it is sent to the GraphQL service. Here we are setting the context of every operation to include an authorization header that contains the token saved to local storage. Don’t worry, if we don’t have a token saved the value of this header will simply be null and our service will assume that there a user has not been authorized. Now that we’ve added the authorization token to every header, our me field should return data about the current user.

Let’s display that data in our UI. Find the render method in the AuthorizedUser component and replace it with this code:`

render() {
  return ( < Mutation mutation ={ GITHUB_AUTH_MUTATION} update ={ this.authorizationComplete} refetchQueries ={[{ query: ROOT_QUERY }]} > {mutation = > { this.githubAuthMutation = mutation return ( < Me signingIn ={ this.state.signingIn} requestCode ={ this.requestCode} logout ={() = > localStorage.removeItem(' token')} /> ) }} </ Mutation > ) }

`Instead of rendering a button, this Mutation component now renders a component called Me. The Me component will either display information about the current user who is logged in or the authorize button. It will need to know whether or not the user is currently in the process of signing in. It also needs to access the requestCode methods of the AuthorizedUser component.

Finally, we need to provide a function that can log the current user out. For now, we’ll just remove the token from localStorage when the user logs out. All of these values have been passed down to the Me component as properties. It’s now time to create the Me component. Add the following code above the declaration of the AuthorizedUser component:`

const Me = ({ logout, requestCode, signingIn }) = > < Query query ={ ROOT_QUERY} > {({ loading, data }) = > data.me ? < CurrentUser {... data.me} logout ={ logout} /> : loading ? < p > loading... </ p > : < button onClick ={ requestCode} disabled ={ signingIn} > Sign In with GitHub </ button > } </ Query > const CurrentUser = ({ name, avatar, logout }) = > < div > < img src ={ avatar} width ={ 48} height ={ 48} alt ="" /> < h1 >{ name} </ h1 > < button onClick ={ logout} > logout </ button > </ div >

`The Me component renders a Query component to obtain the data about the current user from the ROOT_QUERY. If there is a token, the me field in the ROOT_QUERY will not be null. Within the query component, we check to see if data.me is null. If there is data under this field, we will display the CurrentUser component and pass the data about the current user to this component as properties.

The code {... data.me} uses the spread operator to pass all of the fields to the CurrentUser component as individual properties. Additionally, the logout function is passed to the CurrentUser component. When the user clicks the logout button, this function will be invoked and their token removed.`
