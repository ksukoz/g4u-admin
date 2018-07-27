import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { getLeagues } from '../../actions/leagueActions';

class Leagues extends Component {
  componentDidMount = () => {
    this.props.getLeagues();
  }

  render() {
    const { leagues } = this.props.league;
    if (leagues !== null)  console.log(leagues)


    return (
      <div>
        {}
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
