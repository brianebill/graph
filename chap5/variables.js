So far, we have changed data by sending new string values as mutation arguments. As an alternative, you could use input variables. Variables replace the static value in the query so that we can pass dynamic values, instead. Let’s consider our addSong mutation. Instead of dealing with strings, let’s use variable names, which in GraphQL are always preceded by a $ character:

mutation createSong( $ title:String! $ numberOne:Int $ by:String!) {
  addSong( title: $ title, numberOne: $ numberOne, performerName: $ by) {
    id
    title
    numberOne
  }
}

The static value is replaced by a $ variable. Then, we state that the $ variable can be accepted by the mutation. From there, we map each of the $ variable names with the argument name. In GraphiQL or the Playground, there is a window for Query Variables. This is where we send the input data as a JSON object. Be sure to use the correct variable name as the JSON key: { "title": "No Scrubs", "numberOne": true, "by": "TLC" } Variables are very useful when sending argument data. Not only will this keep our mutations more organized in a test, but allowing dynamic inputs will be hugely helpful later when connecting a client interface.
