import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Login from "./components/auth/Login";

import "./App.css";
import Leagues from "./components/leagues/Leagues";
import AddFranchise from "./components/leagues/AddFranchise";
import Stuff from "./components/stuff/Stuff";
import MergeStuff from "./components/merge/MergeStuff";
import Header from "./components/layout/Header";

import { setUser } from "./actions/authActions";
import AddSubLeague from "./components/leagues/AddSubLeague";
import AddPlayers from "./components/players/AddPlayers";
import Navbar from "./components/layout/Navbar";

if (localStorage.user) {
  store.dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            {/* <Navbar /> */}
            <div>
              {/* <Route exact path='/' component={News} /> */}
              <Route exact path="/leagues" component={Leagues} />
              <Route exact path="/subleagues" component={AddSubLeague} />
              <Route exact path="/franchise/add" component={AddFranchise} />
              <Route exact path="/stuff" component={Stuff} />
              <Route exact path="/players" component={AddPlayers} />
              <Route exact path="/mergestuff" component={MergeStuff} />

              <Route exact path="/login" component={Login} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
