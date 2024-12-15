
const express = require('express')
const {ApolloServer} = require('apollo-server-express');
const app = express()
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');
require('./models/users');
const port = 3000

let apolloServer;
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs , 
    resolvers
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({app});
  console.log(`��� Server ready at ${apolloServer.graphqlPath}`);
}

startServer();


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})