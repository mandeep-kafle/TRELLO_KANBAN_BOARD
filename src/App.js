import Body from "./Components/Body";
import apolloClient from './apolloSetup';
import { ApolloProvider } from '@apollo/react-hooks';



function App() {
  return (
    <ApolloProvider client={apolloClient}>
      
      <Body />
     
    </ApolloProvider>
  );
}

export default App;
