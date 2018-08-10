import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { loginUser } from "../../actions/authActions";

import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

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
  error: {
    color: "#ff5e5e",
    paddingBottom: "2rem"
  }
};

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: ""
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(user, this.props.history);
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors.length > 0) {
      this.setState({
        ...this.state,
        error: nextProps.errors
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { isAuthenticated } = this.props.auth;

    if (isAuthenticated === true) {
      return <Redirect to="/" />;
    }

    return (
      <Paper className={classes.root}>
        <h1>Войти</h1>
        <p>Войти в свой аккаунт</p>
        <form onSubmit={this.onSubmitHandler}>
          <div>
            <TextField
              className={classes.input}
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onChangeHandler}
              label="Ваш email"
            />
          </div>
          <div>
            <TextField
              className={classes.input}
              type="password"
              name="password"
              label="Ваш пароль"
              value={this.state.password}
              onChange={this.onChangeHandler}
            />
          </div>
          <Button variant="contained" type="submit" className={classes.submit}>
            Войти
          </Button>
          <div className={classes.error}>
            <small variant="caption" component="small">
              {this.state.error}
            </small>
          </div>
        </form>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { loginUser }
  )
)(withRouter(Login));
