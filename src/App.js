import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Login from './components/auth/Login';

import './App.css';
import Leagues from './components/leagues/Leagues';
import Stuff from './components/stuff/Stuff';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {/* <Route exact path='/' component={News} /> */}
            <Route exact path='/leagues' component={Leagues} />
            <Route exact path='/stuff' component={Stuff} />

            <Route exact path='/login'component={Login} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
