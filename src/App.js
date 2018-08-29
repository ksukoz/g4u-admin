import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ConnectedIntlProvider from "./components/common/ConnectedIntlProvider";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

import Login from "./components/auth/Login";

import "./App.css";
import Leagues from "./components/leagues/Leagues";
import AddFranchise from "./components/leagues/AddFranchise";
import Stuff from "./components/stuff/Stuff";
import AddStuff from "./components/stuff/AddStuff";
import MergeStuff from "./components/merge/MergeStuff";
import Header from "./components/layout/Header";

import { setUser } from "./actions/authActions";
import AddSubLeague from "./components/leagues/AddSubLeague";
import Players from "./components/players/Players";
import Navbar from "./components/layout/Navbar";
import MergePlayers from "./components/merge/MergePlayers";
import Merge from "./components/merge/Merge";
import AddPlayers from "./components/players/AddPlayers";
import AddCountries from "./components/settings/AddCountries";
import AddCommands from "./components/commands/AddCommands";
import Tournaments from "./components/tournaments/Tournaments";
import AddTournaments from "./components/tournaments/AddTournaments";
import Seasons from "./components/tournaments/Seasons";
import AddSeason from "./components/tournaments/AddSeason";

if (localStorage.getItem("admin-user")) {
  const user = JSON.parse(localStorage.getItem("admin-user"));
  store.dispatch(setUser(user));
}

class App extends Component {
  render() {
    return (
      <ConnectedIntlProvider>
        <Router>
          <div className="App">
            <Route exact path="/login" component={Login} />
            <PrivateRoute path="/" component={Header} />
            <div className="main">
              <PrivateRoute path="/" component={Navbar} />
              <div className="container">
                <Switch>
                  <PrivateRoute exact path="/" component={Leagues} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/leagues" component={Leagues} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/subleagues"
                    component={AddSubLeague}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/franchise/add"
                    component={AddFranchise}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/tournaments"
                    component={Tournaments}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path={`/tournaments/add/:id`}
                    component={AddTournaments}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path={`/seasons/:id`}
                    component={Seasons}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path={`/seasons/add/:id`}
                    component={AddSeason}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/stuff" component={Stuff} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/players" component={Players} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/commands"
                    component={AddCommands}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/add-player"
                    component={AddPlayers}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/merge/stuff"
                    component={MergeStuff}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/add-stuff" component={AddStuff} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/merge/players"
                    component={MergePlayers}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/merge" component={Merge} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/settings"
                    component={AddCountries}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      </ConnectedIntlProvider>
    );
  }
}

export default App;
