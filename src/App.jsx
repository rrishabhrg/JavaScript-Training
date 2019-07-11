/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Home } from './pages/Home';

// Connecting out site to the GraphQL API
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  headers: {
    token: localStorage.getItem('token'),
  }
});

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="root">
          <Home />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
