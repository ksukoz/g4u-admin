import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { getLeagues } from '../../actions/leagueActions';
import AddLeague from './AddLeague';

class Leagues extends Component {
  componentDidMount = () => {
    this.props.getLeagues();
  }

  render() {
    const { leagues } = this.props.league;
    let leaguesList;
    if (leagues !== null) {
      leaguesList = leagues.map(league => (
        <li key={league.id}>{league.title}</li>
      ))
    }


    return (
      <div>
        <AddLeague />
        <ul>{leaguesList}</ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  league: state.league
});

export default connect(
  mapStateToProps,
  { getLeagues }
)(withRouter(Leagues));
