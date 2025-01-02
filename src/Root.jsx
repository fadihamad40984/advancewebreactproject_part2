import React from 'react';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:4000', // Your GraphQL server URL
  cache: new InMemoryCache(),   // Apollo Cache
});

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default Root;
