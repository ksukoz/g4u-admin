import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import { addSubTournament } from "../../actions/tournamentActions";

import Messages from "../common/Messages";

import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  checkbox: {
    color: "#43A047",
    "&$checked": {
      color: "#43A047"
    }
  },
  checked: {},
  form: {
    width: "49%"
  },
  input: {
    width: "100%",
    marginBottom: ".5rem"
  },
  select: {
    width: "100%"
  },
  button: {
    margin: theme.spacing.unit,
    background: "transparent",
    color: "rgba(0,0,0,.5)",
    transition: ".3s",
    "&:hover, &:active": {
      backgroundColor: "#43A047",
      color: "#fff"
    }
  },
  submit: {
    backgroundColor: "#43A047",
    borderRadius: 40,
    color: "#fff",
    marginBottom: "1rem"
  },
  success: {
    backgroundColor: "#43A047"
  },
  error: {
    backgroundColor: "#ff5e5e"
  }
});

class AddSubtournament extends Component {
  state = {
    open: false,
    season: "",
    name: "",
    position: "",
    stat: "",
    status: false,
    type: ""
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value.replace(/[^a-zA-Z0-9]+/, "")
    });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const newSubTournament = {
      title: this.state.name,
      // type: this.state.type,
      stat_type: this.state.stat,
      status: this.state.status,
      rait_type: this.state.position,
      season_id: this.state.season
    };

    this.props.addSubTournament(newSubTournament);
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    if (this.props.messages) {
      this.setState({ open: false }, this.props.history.goBack());
    }

    this.setState({ open: false });
  };

  toggleChange = e => {
    this.setState({ [e.target.name]: !this.state[e.target.name] });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    }
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      season: this.props.match.url.replace(/\D/g, "")
    });
  }

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
        <Button onClick={() => this.props.history.goBack()}>Назад</Button>
        <form className="player__form" onSubmit={this.onSubmitHandler}>
          <TextField
            label={<FormattedMessage id="subtournaments.nameLabel" />}
            name="name"
            className={classes.input}
            value={this.state.name}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="status"
                checked={this.state.status}
                classes={{ root: classes.checkbox, checked: classes.checked }}
                onChange={this.toggleChange}
              />
            }
            label={<FormattedMessage id="subtournaments.showLabel" />}
          />
          <FormControl className={classes.input}>
            <InputLabel htmlFor="stat">
              <FormattedMessage id="subtournaments.statLabel" />
            </InputLabel>
            <Select
              value={this.state.stat}
              className={classes.select}
              onChange={this.onChangeHandler}
              inputProps={{
                name: "stat",
                id: "stat"
              }}
            >
              <MenuItem value="" />
              <MenuItem value="league">
                <FormattedMessage id="subtournaments.leagueLabel" />
              </MenuItem>
              <MenuItem value="cup">
                <FormattedMessage id="subtournaments.cupLabel" />
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="position">
              <FormattedMessage id="subtournaments.positionLabel" />
            </InputLabel>
            <Select
              value={this.state.position}
              className={classes.select}
              onChange={this.onChangeHandler}
              inputProps={{
                name: "position",
                id: "position"
              }}
            >
              <MenuItem value="" />
              <MenuItem value="difference">
                <FormattedMessage id="subtournaments.differenceLabel" />
              </MenuItem>
              <MenuItem value="meeting">
                <FormattedMessage id="subtournaments.meetingLabel" />
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="type">
              <FormattedMessage id="subtournaments.typeLabel" />
            </InputLabel>
            <Select
              value={this.state.type}
              className={classes.select}
              onChange={this.onChangeHandler}
              inputProps={{
                name: "type",
                id: "type"
              }}
            >
              <MenuItem value="" />
            </Select>
          </FormControl>
          <Button size="large" type="submit" className={classes.submit}>
            <FormattedMessage id="subtournaments.submit" />
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  messages: state.messages
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { addSubTournament }
  )
)(AddSubtournament);
