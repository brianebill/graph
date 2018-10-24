`Polling is another option that is available with the Query component. When we add the pollInterval prop to the Query component, data is automatically fetched over and over again based on a given interval:`

<Query query ={ ROOT_QUERY} pollInterval ={ 1000} >

`Setting a pollInterval automatically refetches the data at a specified time. In this case, we will refetch the data from the server every second. Be careful when using polling as this code actually sends a new network request every second. In addition to loading, data, and refetch, the response object has some additional options:`

stopPolling `A function that stops polling`
startPolling `A function that will start polling`
fetchMore `A function that can be used to fetch the next page of data`

`Before we continue, remove any pollInterval properties from the Query component. We do not want polling to take place as we continue to iterate on this example.`
