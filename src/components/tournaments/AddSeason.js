import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import { addSeason } from "../../actions/tournamentActions";

import Messages from "../common/Messages";

import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
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

class AddSeason extends Component {
  state = {
    open: false,
    tournament: "",
    name: "",
    status: false
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value.replace(/[а-я]+/ig, "")
    });
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
      tournament: this.props.match.url.replace(/\D/g, "")
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
            label={<FormattedMessage id="seasons.nameLabel" />}
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
            className={classes.input}
            label={<FormattedMessage id="seasons.showLabel" />}
          />
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
    { addSeason }
  )
)(AddSeason);
