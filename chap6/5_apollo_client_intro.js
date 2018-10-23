`Apollo Client A huge benefit of using Representational State Transfer (REST) is the ease with which you can handle caching. With REST, you can save the response data from a request in a cache under the URL that was used to access that request. Caching done, no problem.

Caching GraphQL is a little trickier. We don’t have a multitude of routes with a GraphQL API— everything is sent and received over a single endpoint, so we cannot simply save the data returned from a route under the URL that was used to request it.

To build a robust, performant application, we need a way to cache queries and their resulting objects. Having a localized caching solution is essential as we constantly strive to create fast, efficient apps.

We could create something like this ourselves, or we could lean on one of the vetted clients that already exist. The most prominent GraphQL client solutions available today are Relay and Apollo Client.

We’ve already been using several tools from the Apollo team on the server, but Apollo Client focuses specifically on sending and receiving requests from the client to the server.

It handles the network requests with Apollo Link and handles all caching with Apollo Cache.

Apollo Client then wraps the link and the cache and manages all interactions with the GraphQL service efficiently.

We’re going to be using React to build out our UI components, but we can apply many of the techniques described here to projects that use different libraries and frameworks.`
