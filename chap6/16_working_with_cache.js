`Working with the Cache As developers, we’re in the network request minimization business. We don’t want our users to have to make extraneous requests. In order to minimize the number of network requests that our apps send, we can dig deeper into how to customize the Apollo Cache.

Fetch Policies By default, Apollo Client stores data in a local JavaScript variable. Every time we create a client, a cache is created for us. Every time we send an operation, the response is cached locally. The fetchPolicy tells Apollo Client where to look for data to resolve an operation: either the local cache or a network request.

The default fetchPolicy is cache-first. This means that the client will look locally in the cache for data to resolve the operation. If the client can resolve the operation without sending a network request, it will do so. However, if data to resolve the query is not in the cache then the client will send a network request to the GraphQL service.

Another type of fetchPolicy is cache-only. This policy tells the client to only look in the cache and never send a network request. If the data to fulfill the query does not exist in the cache, then an error will be thrown. Take a look at src/ Users.js, and find the Query inside the Users component. We can change the fetch policy of individual queries simply by adding the fetchPolicy property:`

< Query query ={{ query: ROOT_QUERY }} fetchPolicy =" cache-only" >

`At present, if we set the policy for this Query to cache-only and refresh the browser, we should see an error because Apollo Client is only looking in the cache for the data to resolve our query and that data is not present when the app starts. To clear the error, change the fetch policy to cache-and-network:`

< Query query ={{ query: ROOT_QUERY }} fetchPolicy =" cache-and-network" >

`The application works again. The cache-and-network policy always resolves the query immediately from the cache and additionally sends a network request to get the latest data. If the local cache does not exist, as is the case when the app starts, this policy will simply retrieve the data from the network. Other policies include:`

network-only `Always sends a network request to resolve a query`
no-cache `Always sends a network request to resolve the data and it doesn’t cache the resulting response.`

`Persisting The Cache - It is possible to save the cache locally on the client. This unlocks the power of the cache-first policy, because the cache will already exist when the user returns to the application.

In this case, the cache-first policy will immediately resolve the data from the existing local cache and not send a request to the network at all. To save cache data locally, we’ll need to install an npm package:`

npm install apollo-cache-persist

`The apollo-cache-persist package contains a function that enhance the cache by saving it to a local store whenever it changes.

To implement cache persistance, we’ll need to create our own cache object and add it to the client when we configure our application. Add the following code to the src/ index.js file: `

import ApolloClient, { InMemoryCache }
from 'apollo-boost' import { persistCache }
from 'apollo-cache-persist'

const cache = new InMemoryCache()
persistCache({ cache, storage: localStorage })
const client = new ApolloClient({ cache, ... })

`First, we’ve created our own cache instance using the InMemoryCache constructor provided with apollo-boost. Next, we imported the persistCache method from apollo-cache-persist. Using InMemoryCache, we create a new cache instance and send it to the persistCache method along with a storage location. We’ve chosen to save the cache in the browser window’s localStorage store. This means that once we start our application, we should see the value of our cache saved to our store.

You can check for it by adding the following syntax: `

console.log( localStorage[' apollo-cache-persist'])

`The next step is to check localStorage on startup to see if we already have a cache saved. If we do, then we’ll want to initialize our local cache with that data before creating the client: `

const cache = new InMemoryCache()
persistCache({ cache, storage: localStorage })
if (localStorage[' apollo-cache-persist']) {
  let cacheData = JSON.parse( localStorage[' apollo-cache-persist'])
  cache.restore( cacheData)
}

`Now our application will load any cached data before it starts. If we do have data saved under the key apollo-cache-persist, then we’ll use the cache.restore( cacheData) method to add it to the cache instance.

We’ve successfully minimized the number of network requests to our service simply by using Apollo Client’s cache effectively.

In the next section, we will learn about how we can write data directly to the local cache.` 
