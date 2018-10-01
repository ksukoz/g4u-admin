import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import {
  getSubtournaments,
  changeSubtournamentStatus
} from "../../actions/tournamentActions";

import Messages from "../common/Messages";

import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";

import Button from "@material-ui/core/Button";
import AlarmIcon from "@material-ui/icons/Alarm";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Commands from "./icons/commands.svg";
import Calendar from "./icons/calendar.svg";
import Arrow from "./icons/arrow.svg";

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
  button_fab: {
    background: "#fff",
    border: "1px solid #55a462",
    margin: "0 .5rem",

    "&:hover,&:active": {
      background: "#55a462"
    },

    "&:hover img,&:active img": {
      filter: "brightness(10)"
    },
    " &:hover svg,&:active svg": {
      fill: "#fff"
    },
    "& img, & svg": {
      width: "2rem",
      height: "auto",
      fill: "#55a462",
      transition: ".3s"
    }
  },
  submit: {
    backgroundColor: "#43A047",
    borderRadius: 40,
    color: "#fff",
    marginBottom: "1rem"
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid rgba(0,0,0,.2)",
    padding: "2rem 1rem"
  },
  success: {
    backgroundColor: "#43A047"
  },
  error: {
    backgroundColor: "#ff5e5e"
  },
  colorSwitchBase: {
    color: "#43A047",
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

class SubTournaments extends Component {
  state = {
    open: false,
    season: "",
    subtournamentsList: null
  };

  handleToggleChange = e => {
    let index = e.target.value;
    let subtournamentsArray = this.state.subtournamentsList;
    subtournamentsArray[+index].status =
      subtournamentsArray[+index].status === "1" ? "0" : "1";

    this.setState(
      { ...this.state, subtournamentsList: subtournamentsArray },
      this.props.changeSubtournamentStatus(subtournamentsArray[+index].id)
    );
  };

  // onLinkClickHandler = link => e => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   if (e.target.type === "checkbox") {
  //     this.handleToggleChange;
  //   } else {
  //     this.props.history.push(link);
  //   }
  // };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    if (this.props.messages) {
      this.setState(
        { open: false },
        this.props.getSubtournaments(this.props.match.url.replace(/\D/g, ""))
      );
    }

    this.setState({ open: false });
  };

  componentDidMount() {
    this.props.getSubtournaments(this.props.match.url.replace(/\D/g, ""));
    this.setState({
      ...this.state,
      season: this.props.match.url.replace(/\D/g, "")
    });
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    } else if (nextProps.tournaments.subtournaments !== null) {
      this.setState({
        ...this.state,
        subtournamentsList: nextProps.tournaments.subtournaments
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
        <Button
          onClick={() => this.props.history.goBack()}
          style={{ marginBottom: "1rem" }}
        >
          Назад
        </Button>
        <Link
          className={classes.button_link}
          to={
            this.state.season ? `/subtournaments/add/${this.state.season}` : "/"
          }
        >
          <Button variant="extendedFab" className={classes.button}>
            <FormattedMessage id="subtournaments.add" />
          </Button>
        </Link>
        <List>
          {this.state.subtournamentsList !== null
            ? this.state.subtournamentsList.map((subtournament, i) => (
                <MenuItem
                  className={classes.listItem}
                  key={subtournament.id}
                  value={subtournament.id}
                >
                  <h4>{subtournament.title}</h4>
                  <div className={classes.button_wrap}>
                    <FormControlLabel
                      control={
                        <Switch
                          classes={{
                            switchBase: classes.colorSwitchBase,
                            checked: classes.colorChecked,
                            bar: classes.colorBar
                          }}
                          checked={+subtournament.status}
                          onChange={this.handleToggleChange}
                          value={`${i}`}
                        />
                      }
                    />
                    <Link
                      to={
                        this.state.season
                          ? `/subtournaments/dates/${subtournament.id}`
                          : "/"
                      }
                    >
                      <Button variant="fab" className={classes.button_fab}>
                        {/* <FormattedMessage id="subtournaments.commands" /> */}
                        <AlarmIcon />
                      </Button>
                    </Link>
                    <Link
                      to={
                        this.state.season
                          ? `/subtournaments/commands/${subtournament.id}`
                          : "/"
                      }
                    >
                      <Button variant="fab" className={classes.button_fab}>
                        {/* <FormattedMessage id="subtournaments.commands" /> */}
                        <img src={Commands} alt="" />
                      </Button>
                    </Link>
                    <Link
                      to={
                        this.state.season
                          ? `/subtournaments/calendar/${subtournament.id}`
                          : "/"
                      }
                    >
                      <Button variant="fab" className={classes.button_fab}>
                        {/* <FormattedMessage id="subtournaments.commands" /> */}
                        <img src={Calendar} alt="" />
                      </Button>
                    </Link>
                    <Link
                      to={
                        this.state.season
                          ? `/subtournaments/commands/${subtournament.id}`
                          : "/"
                      }
                    >
                      <Button variant="fab" className={classes.button_fab}>
                        {/* <FormattedMessage id="subtournaments.commands" /> */}
                        <img src={Arrow} alt="" />
                      </Button>
                    </Link>
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
    { getSubtournaments, changeSubtournamentStatus }
  )
)(SubTournaments);
