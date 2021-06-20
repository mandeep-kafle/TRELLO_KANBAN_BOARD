import Body from "./Components/Body";
import apolloClient from './apolloSetup';
import { ApolloProvider } from '@apollo/react-hooks';

import Header from "./Components/Header.js";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <div className="app"> 
      <Header/>
      <Body />
      </div>
 
     
    </ApolloProvider>
  );
}

export default App;
