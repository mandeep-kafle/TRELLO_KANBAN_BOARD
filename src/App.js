import Body from "./Components/Body";
import apolloClient from './apolloSetup';
import { ApolloProvider } from '@apollo/react-hooks';



function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <div className="app"> 
      <Body />
      </div>
 
     
    </ApolloProvider>
  );
}

export default App;
