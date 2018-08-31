import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import {
  getCommands,
  addGame,
  getGames
} from "../../actions/tournamentActions";
import Messages from "../common/Messages";
import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import InputLabel from "@material-ui/core/InputLabel";

import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
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
    width: "40%",
    marginRight: 8
  },
  input_wrap: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem"
  },
  select: {
    width: "100%",
    paddingTop: "1rem",
    "& div div": {
      display: "flex"
    }
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
  rounds: {
    width: 500,
    marginBottom: "1rem"
  },
  roundsBtn: {
    border: "1px solid #43A047"
  },
  selected: {
    backgroundColor: "#43A047",
    color: "#fff"
  },
  flex: {
    display: "flex",
    "& span": {
      padding: "0 3rem"
    }
  },
  smSelect: {
    width: 100,
    marginRight: 8
  },
  success: {
    backgroundColor: "#43A047"
  },
  error: {
    backgroundColor: "#ff5e5e"
  }
});

class Calendar extends Component {
  state = {
    open: false,
    tours: null,
    tour: "",
    commands: null,
    home: "",
    guest: "",
    value: 1,
    subtour: "",
    games: null
  };

  handleChange = (event, value) => {
    this.setState({
      ...this.state,
      value,
      tours: Array.from(
        { length: (this.state.commands.length - 1) * value },
        (v, k) => k + 1
      )
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState(
      { open: false },
      this.props.getGames(this.props.match.url.replace(/\D/g, ""))
    );
  };

  onChangeHandler = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const newGame = {
      sub_id: this.state.subtour,
      command_id_in: this.state.home,
      command_id_out: this.state.guest,
      tour: this.state.tour
    };

    this.props.addGame(newGame);
  };

  componentDidMount() {
    this.props.getCommands(this.props.match.url.replace(/\D/g, ""));
    this.props.getGames(this.props.match.url.replace(/\D/g, ""));
    this.setState({
      ...this.state,
      subtour: this.props.match.url.replace(/\D/g, "")
    });
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    } else if (nextProps.tournaments.games !== null) {
      this.setState({
        ...this.state,
        games: nextProps.tournaments.games
      });
    } else if (nextProps.tournaments.commands !== null) {
      this.setState({
        ...this.state,
        commands: nextProps.tournaments.commands,
        tours: Array.from(
          { length: nextProps.tournaments.commands.length - 1 },
          (v, k) => k + 1
        )
      });
    }
  };

  render() {
    const { classes } = this.props;
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
        <BottomNavigation
          value={this.state.value}
          onChange={this.handleChange}
          showLabels
          className={classes.rounds}
        >
          <BottomNavigationAction
            classes={{ selected: classes.selected, root: classes.roundsBtn }}
            label="1 круг"
            value={1}
          />
          <BottomNavigationAction
            classes={{ selected: classes.selected, root: classes.roundsBtn }}
            label="2 круг"
            value={2}
          />
          <BottomNavigationAction
            classes={{ selected: classes.selected, root: classes.roundsBtn }}
            label="3 круг"
            value={3}
          />
          <BottomNavigationAction
            classes={{ selected: classes.selected, root: classes.roundsBtn }}
            label="4 круг"
            value={4}
          />
        </BottomNavigation>
        <form onSubmit={this.onSubmitHandler}>
          {this.state.tours !== null ? (
            <FormControl className={classes.smSelect}>
              <InputLabel htmlFor="tour">
                <FormattedMessage id="subtournaments.tours" />
              </InputLabel>
              <Select
                value={this.state.tour}
                className={classes.select}
                onChange={this.onChangeHandler}
                inputProps={{
                  name: "tour",
                  id: "tour"
                }}
              >
                <MenuItem value="" />
                {this.state.tours.map(tour => (
                  <MenuItem value={tour}>
                    {tour}
                    <FormattedMessage id="subtournaments.tours" />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            ""
          )}
          {this.state.commands !== null ? (
            <FormControl className={classes.input}>
              <InputLabel htmlFor="home">
                <FormattedMessage id="subtournaments.homeCommands" />
              </InputLabel>
              <Select
                value={this.state.home}
                className={classes.select}
                onChange={this.onChangeHandler}
                inputProps={{
                  name: "home",
                  id: "home"
                }}
              >
                <MenuItem value="" />
                {this.state.commands.map(command => (
                  <MenuItem
                    value={command.command_id}
                    disabled={
                      this.state.guest
                        ? this.state.guest === command.command_id
                        : this.state.guest
                    }
                  >
                    <Avatar
                      alt=""
                      src={command.logo}
                      style={{ marginRight: 8 }}
                    />
                    {command.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            ""
          )}
          {this.state.commands !== null ? (
            <FormControl className={classes.input}>
              <InputLabel htmlFor="guest">
                <FormattedMessage id="subtournaments.guestCommands" />
              </InputLabel>
              <Select
                value={this.state.guest}
                className={classes.select}
                onChange={this.onChangeHandler}
                inputProps={{
                  name: "guest",
                  id: "guest"
                }}
              >
                <MenuItem value="" />
                {this.state.commands.map(command => (
                  <MenuItem
                    value={command.command_id}
                    disabled={
                      this.state.home
                        ? this.state.home === command.command_id
                        : this.state.home
                    }
                  >
                    <Avatar
                      alt=""
                      src={command.logo}
                      style={{ marginRight: 8 }}
                    />
                    {command.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            ""
          )}

          <Button size="large" type="submit" className={classes.submit}>
            <FormattedMessage id="subtournaments.submit" />
          </Button>
        </form>
        <List>
          {this.state.games !== null
            ? this.state.games.map(game => (
                <MenuItem
                  className={classes.listItem}
                  key={game.id}
                  value={game.id}
                >
                  <div className={classes.flex}>
                    <div className={classes.flex}>{game.tour} тур</div>
                    <div className={classes.flex}>
                      <Avatar alt="" src={game.in.logo} />
                      {game.in.title}
                    </div>
                    <span>:</span>
                    <div className={classes.flex}>
                      {game.out.title}
                      <Avatar alt="" src={game.out.logo} />
                    </div>
                  </div>
                </MenuItem>
              ))
            : ""}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tournaments: state.tournaments,
  errors: state.errors,
  messages: state.messages
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getCommands, addGame, getGames }
  )
)(Calendar);
