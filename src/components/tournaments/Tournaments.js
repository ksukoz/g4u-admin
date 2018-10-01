import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import { getLeagues, getSubLeagues } from "../../actions/leagueActions";
import {
  getTournaments,
  changeTournamentStatus
} from "../../actions/tournamentActions";

import Messages from "../common/Messages";

import List from "@material-ui/core/List";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
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
    width: "max-content",
    color: "#000",
    textDecoration: "none",
    transition: ".3s"
  },
  link: {
    width: "100%",
    textDecoration: "none",
    "& li": {
      display: "flex",
      justifyContent: "space-between"
    }
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
  },
  colorSwitchBase: {
    color: "#fff",
    "&$colorChecked": {
      color: "#43A047",
      "& + $colorBar": {
        backgroundColor: "#43A047"
      }
    }
  },
  colorBar: {},
  colorChecked: {}
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
        [e.target.name]: JSON.parse(e.target.value),
        subLeague: "",
        tournamentsList: null
      });

      this.props.getSubLeagues(JSON.parse(e.target.value).id);
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
      this.props.getTournaments(e.target.value);
    }
  };

  handleToggleChange = e => {
    let index = e.target.value;
    let tournamentArray = this.state.tournamentsList;
    tournamentArray[+index].show_in_app =
      tournamentArray[+index].show_in_app === "1" ? "0" : "1";

    this.setState(
      { ...this.state, tournamentsList: tournamentArray },
      this.props.changeTournamentStatus(tournamentArray[+index].tournament_id)
    );
  };

  onLinkClickHandler = link => e => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target.type === "checkbox") {
      this.handleToggleChange;
    } else {
      this.props.history.push(link);
    }
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    if (this.props.messages) {
      this.setState(
        { open: false },
        this.props.getTournaments(this.state.subLeague)
      );
    }

    this.setState({ open: false });
  };

  componentDidMount = () => {
    this.props.getLeagues();
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    }
    if (nextProps.league.subLeagues) {
      this.setState({ ...this.state, subLeagues: nextProps.league.subLeagues });
    }
    if (nextProps.tournaments.list) {
      this.setState({
        ...this.state,
        tournamentsList: nextProps.tournaments.list
      });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevProps.errors !== this.props.errors ||
      prevProps.messages !== this.props.messages
    ) {
      this.setState({
        ...this.state,
        open: true
      });
    } else if (prevProps.league.subLeagues !== this.props.league.subLeagues) {
      this.setState({
        ...this.state,
        subLeagues: this.props.league.subLeagues
      });
    } else if (prevProps.tournaments.list !== this.props.tournaments.list) {
      this.setState({
        ...this.state,
        tournamentsList: this.props.tournaments.list
      });
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
        {this.props.errors ? (
          <Messages
            open={this.state.open}
            message={this.props.errors}
            onClose={this.handleClose}
            classes={classes.error}
          />
        ) : this.props.messages ? (
          <Messages
            open={this.state.open}
            message={this.props.messages}
            onClose={this.handleClose}
            classes={classes.success}
          />
        ) : (
          ""
        )}
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
              ? this.state.tournamentsList.map((tournament, i) => (
                  <Link
                    className={classes.link}
                    to={`/seasons/${tournament.tournament_id}`}
                    key={tournament.tournament_id}
                    onClick={this.onLinkClickHandler(
                      `/seasons/${tournament.tournament_id}`
                    )}
                  >
                    <MenuItem
                      className={classes.listItem}
                      value={tournament.tournament_id}
                    >
                      {tournament.title}
                      <FormControlLabel
                        control={
                          <Switch
                            classes={{
                              switchBase: classes.colorSwitchBase,
                              checked: classes.colorChecked,
                              bar: classes.colorBar
                            }}
                            checked={+tournament.show_in_app}
                            onChange={this.handleToggleChange}
                            value={`${i}`}
                          />
                        }
                      />
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
    { getLeagues, getSubLeagues, getTournaments, changeTournamentStatus }
  )
)(Tournaments);
