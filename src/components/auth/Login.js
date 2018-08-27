import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import { loginUser } from "../../actions/authActions";

import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import Messages from "../common/Messages";

const styles = {
  root: {
    width: "max-content",
    margin: "0 auto",
    textAlign: "center",
    marginTop: "25vh",
    padding: "2rem 5rem"
  },
  input: {
    width: 300,
    marginBottom: "1rem"
  },
  submit: {
    backgroundColor: "#43A047",
    borderRadius: 40,
    width: 300,
    color: "#fff",
    marginBottom: "1rem"
  },
  success: {
    backgroundColor: "#43A047"
  },
  error: {
    backgroundColor: "#ff5e5e"
  }
};

class Login extends Component {
  state = {
    open: false,
    email: "",
    password: ""
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
      lang: this.props.lang.locale
    };

    this.props.loginUser(user, this.props.history);
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    }
  };

  render() {
    const { classes } = this.props;
    const { isAuthenticated } = this.props.auth;

    if (isAuthenticated === true) {
      return <Redirect to="/" />;
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
        <Paper className={classes.root}>
          <h1>
            <FormattedMessage id="login.heading" />
          </h1>
          <p>
            <FormattedMessage id="login.text" />
          </p>
          <form onSubmit={this.onSubmitHandler}>
            <div>
              <TextField
                className={classes.input}
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.onChangeHandler}
                label={<FormattedMessage id="login.emailLabel" />}
              />
            </div>
            <div>
              <TextField
                className={classes.input}
                type="password"
                name="password"
                label={<FormattedMessage id="login.passwordLabel" />}
                value={this.state.password}
                onChange={this.onChangeHandler}
              />
            </div>
            <Button
              variant="contained"
              type="submit"
              className={classes.submit}
            >
              <FormattedMessage id="login.submit" />
            </Button>
            <div className={classes.error}>
              <small variant="caption" component="small">
                {this.state.error}
              </small>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  messages: state.messages,
  lang: state.lang
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { loginUser }
  )
)(withRouter(Login));
