import { API_URL, API_KEY } from "./config.js";
import { onError } from "@apollo/client/link/error";
import Body from "./Components/Body";
import Form from "./Components/Form";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({
    uri: `${API_URL}`,
    headers: {
      "x-hasura-admin-secret": `${API_KEY}`,
    },
  }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">hello</div>
      <Body />
      <Form />
    </ApolloProvider>
  );
}

export default App;
