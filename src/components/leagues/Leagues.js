import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getLeagues } from "../../actions/leagueActions";
import { getRegions } from "../../actions/locationActions";
import AddLeague from "./AddLeague";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

class Leagues extends Component {
  componentDidMount = () => {
    this.props.getLeagues();
  };

  render() {
    const { leagues } = this.props.league;
    let leaguesList;
    if (leagues !== null) {
      leaguesList = leagues.map(league => (
        <ListItem button>
          <ListItemText primary={league.title} key={league.id} />
        </ListItem>
      ));
    }

    return (
      <div>
        <AddLeague />
        <List>{leaguesList}</List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  league: state.league
});

export default connect(
  mapStateToProps,
  { getLeagues, getRegions }
)(withRouter(Leagues));
