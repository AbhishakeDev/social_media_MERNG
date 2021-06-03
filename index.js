const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./graphql/resolvers/index.js');
const { MONGODB } = require('./config.js');

const pubsub = new PubSub();

//pub sub is for publish and subscribe
//subscribe just listens for some event and as soon as some event occurs the subcription is invoked
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // this is from middleware
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
