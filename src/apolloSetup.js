import { API_URL, API_KEY,WEB_SOCKET } from "./config.js";
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-boost';
import { onError } from "@apollo/client/link/error";
  
 
  const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
      graphqlErrors.map(({ message, location, path }) => {
        alert(`Graphql error ${message}`);
      });
    }
  });

export default new ApolloClient({
  link: new HttpLink({
    uri: `${API_URL}`,
    headers: {
      "x-hasura-admin-secret": `${API_KEY}`,
    },
  }),
  cache: new InMemoryCache(),
});