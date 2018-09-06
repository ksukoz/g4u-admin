import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import { getGameById } from "../../actions/tournamentActions";

import Messages from "../common/Messages";

import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { DateTimePicker } from "material-ui-pickers";
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

class EditGame extends Component {
  state = {
    open: false,
    tournament: "",
    name: "",
    status: false,
    start: new Date(),
    finish: new Date()
  };

  onChangeStartHandler = date => {
    this.setState({
      start: date._d
    });
  };

  onChangeFinishHandler = date => {
    this.setState({
      finish: date._d
    });
    console.log(date._d);
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const newSeason = {
      title: this.state.name,
      status: this.state.status,
      tournament_id: this.state.tournament
    };

    this.props.addSeason(newSeason);
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

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    }
  };

  componentDidMount() {
    this.props.getGameById(this.props.match.url.replace(/\D/g, ""));
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
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker
              name="start"
              value={this.state.start}
              onChange={this.onChangeStartHandler}
            />
            <DateTimePicker
              name="finish"
              value={this.state.finish}
              onChange={this.onChangeFinishHandler}
            />
          </MuiPickersUtilsProvider>
          <Button size="large" type="submit" className={classes.submit}>
            <FormattedMessage id="seasons.submit" />
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
    { getGameById }
  )
)(EditGame);
