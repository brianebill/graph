One of the most powerful features of GraphQL is introspection. Introspection is the ability to query details about the current API’s schema. Introspection is how those nifty GraphQL documents are added to the GraphiQL Playground interface. You can send queries to every GraphQL API that return data about a given API’s schema. For example, if we want to know what GraphQL types are available to us in Snowtooth, we can view that information by running a __schema query, as demonstrated here:

query {
  __schema {
    types {
      name
      description
    }
  }
}

When we run this query, we see every type available on the API, including root types, custom types, and even scalar types. If we want to see the details of a particular type, we can run the __type query and send the name of the type that we want to query as an argument:

query liftDetails {
  __type( name:" Lift") {
    name
    fields {
      name
      description
      type {
        name
      }
    }
  }
}

When getting to know a new GraphQL API, it is a good idea to find out what fields are available on the root types:

query roots {
  __schema {
    queryType {
      ... typeFields
    }
    mutationType {
      ... typeFields
    }
    subscriptionType {
      ... typeFields
    }
  }
}

fragment typeFields on __Type {
  name
  fields {
    name
  }
}

An introspection query follows the rules of the GraphQL query language. The redundancy of the preceding query has been reduced by using a fragment. We are querying the name of the type and the available fields of each root type. Introspection gives the client the ability to find out how the current API schema works.
