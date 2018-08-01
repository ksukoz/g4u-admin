import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getLeagues } from "../../actions/leagueActions";
import { getRegions } from "../../actions/locationActions";
import AddLeague from "./AddLeague";

class Leagues extends Component {
  onClickHandler = e => {
    this.props.history.push(`/leagues/${e.target.dataset.id}`);
    this.props.getRegions(e.target.dataset.iso);
    this.props.league.currentLeague = e.target.dataset.id;
  };
  componentDidMount = () => {
    this.props.getLeagues();
  };

  render() {
    const { leagues } = this.props.league;
    let leaguesList;
    if (leagues !== null) {
      leaguesList = leagues.map(league => (
        <li
          key={league.id}
          data-iso={league.country}
          data-id={league.id}
          onClick={this.onClickHandler}
        >
          {league.title}
        </li>
      ));
    }

    return (
      <div>
        <AddLeague />
        <ul>{leaguesList}</ul>
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
