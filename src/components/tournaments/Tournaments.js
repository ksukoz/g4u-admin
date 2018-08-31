import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import { getLeagues, getSubLeagues } from "../../actions/leagueActions";
import { getTournaments } from "../../actions/tournamentActions";

import List from "@material-ui/core/List";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between"
  },
  checkbox: {
    color: "#43A047",
    "&$checked": {
      color: "#43A047"
    }
  },
  checked: {},
  input: {
    width: "40%"
  },
  input_wrap: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem"
  },
  select: {
    width: "100%",
    paddingTop: "1rem"
  },
  button: {
    display: "block",
    marginBottom: "2rem",
    padding: "1rem 5rem",
    background: "#fff",
    border: "1px solid #55a462",
    boxShadow: "none",
    "&:hover,&:active": {
      background: "#55a462"
    },

    "&:hover a,&:active": {
      color: "#fff"
    }
  },
  button_link: {
    display: "block",
    width: "100%",
    color: "#000",
    textDecoration: "none",
    transition: ".3s"
  },
  submit: {
    backgroundColor: "#43A047",
    borderRadius: 40,
    color: "#fff",
    marginBottom: "1rem"
  },
  listItem: {
    border: "1px solid rgba(0,0,0,.2)"
  },
  success: {
    backgroundColor: "#43A047"
  },
  error: {
    backgroundColor: "#ff5e5e"
  }
});

class Tournaments extends Component {
  state = {
    open: false,
    name: "",
    status: false,
    league: null,
    subLeague: "",
    region: "",
    city: "",
    subLeagues: null,
    tournamentsList: null
  };

  onLeagueChange = e => {
    if (e.target.name === "league") {
      this.setState({
        [e.target.name]: JSON.parse(e.target.value)
      });

      this.props.getSubLeagues(JSON.parse(e.target.value).id);
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
      this.props.getTournaments(e.target.value);
    }
  };

  componentDidMount = () => {
    this.props.getLeagues();
  };

  componentWillReceiveProps = nextProps => {
    // console.log(nextProps.tournaments);
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    } else if (nextProps.tournaments.list !== null) {
      this.setState({
        ...this.state,
        tournamentsList: nextProps.tournaments.list
      });
    } else if (nextProps.league.subLeagues !== null) {
      this.setState({ ...this.state, subLeagues: nextProps.league.subLeagues });
    }
  };

  render() {
    const { classes } = this.props;
    const { leagues } = this.props.league;
    let leaguesList;

    if (leagues !== null) {
      leaguesList = leagues.map(league => (
        <MenuItem
          key={league.id}
          value={JSON.stringify({ country: league.country, id: league.id })}
          data-id={league.id}
        >
          {league.title}
        </MenuItem>
      ));
    }

    return (
      <div>
        <div className={classes.input_wrap}>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="league">
              <FormattedMessage id="subLeagues.leagueLabel" />
            </InputLabel>
            <Select
              value={
                this.state.league !== null
                  ? JSON.stringify(this.state.league)
                  : ""
              }
              className={classes.select}
              onChange={this.onLeagueChange}
              inputProps={{
                name: "league",
                id: "league"
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {leaguesList}
            </Select>
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="subLeague">
              <FormattedMessage id="leagues.subLeagueLabel" />
            </InputLabel>
            <Select
              value={this.state.subLeague}
              className={classes.select}
              onChange={this.onLeagueChange}
              inputProps={{
                name: "subLeague",
                id: "subLeague"
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.state.subLeagues !== null
                ? this.state.subLeagues.map(league => (
                    <MenuItem key={league.sblgId} value={league.sblgId}>
                      {league.name}
                    </MenuItem>
                  ))
                : ""}
            </Select>
          </FormControl>
        </div>
        <Link
          className={classes.button_link}
          to={
            this.state.subLeague
              ? `/tournaments/add/${this.state.subLeague}`
              : "/"
          }
        >
          <Button
            variant="extendedFab"
            className={classes.button}
            disabled={!this.state.subLeague}
          >
            <FormattedMessage id="tournaments.add" />
          </Button>
        </Link>
        <div>
          <List>
            {this.state.tournamentsList !== null
              ? this.state.tournamentsList.map(tournament => (
                  <Link
                    className={classes.button_link}
                    to={`/seasons/${tournament.tournament_id}`}
                    key={tournament.tournament_id}
                  >
                    <MenuItem
                      className={classes.listItem}
                      value={tournament.tournament_id}
                    >
                      {tournament.title}
                    </MenuItem>
                  </Link>
                ))
              : ""}
          </List>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tournaments: state.tournaments,
  league: state.league,
  errors: state.errors,
  messages: state.messages
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getLeagues, getSubLeagues, getTournaments }
  )
)(Tournaments);
