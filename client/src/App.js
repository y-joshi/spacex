import logo from './spacex-logo.png';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/client';
import Launches from './components/Launches';
import Launch from './components/Launch';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route exact path="/" component={Launches} >
          <div className="container">
            <img src={logo} alt="SpaceX" style={{ width: 300, height: 150, display: 'block', margin: 'auto' }} />
            <Launches />
          </div>
        </Route>
        <Route exact path="/launch/:flight_number" component={Launch} />
      </Router>
    </ApolloProvider>
  );
}

export default App;
