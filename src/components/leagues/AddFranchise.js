import React, { Component } from "react";
import { addFranchise } from "../../actions/leagueActions";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import Messages from "../common/Messages";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  form: {
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
    width: "20%"
  },
  input_wrap: {
    display: "flex",
    justifyContent: "space-between",
    width: "80%"
  },
  select: {
    width: "100%",
    paddingTop: "1rem"
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

class AddFranchise extends Component {
  state = {
    open: false,
    name: "",
    login: "",
    email: "",
    password: ""
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value.replace(/[^a-zA-Z0-9]+/, "")
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const newFranchise = {
      name: this.state.name,
      login: this.state.login,
      email: this.state.email,
      password: this.state.password
    };

    this.props.addFranchise(newFranchise);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
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
        <form onSubmit={this.onSubmitHandler} className={classes.form}>
          <div className={classes.input_wrap}>
            <TextField
              label={<FormattedMessage id="franchise.nameLabel" />}
              name="name"
              className={classes.input}
              value={this.state.name}
              onChange={this.onChangeHandler}
              margin="normal"
            />
            <TextField
              label={<FormattedMessage id="franchise.loginLabel" />}
              name="login"
              className={classes.input}
              value={this.state.login}
              onChange={this.onChangeHandler}
              margin="normal"
            />
            <TextField
              label={<FormattedMessage id="franchise.emailLabel" />}
              name="email"
              type="email"
              className={classes.input}
              value={this.state.email}
              onChange={this.onChangeHandler}
              margin="normal"
            />
            <TextField
              label={<FormattedMessage id="franchise.passwordLabel" />}
              name="password"
              type="password"
              className={classes.input}
              value={this.state.password}
              onChange={this.onChangeHandler}
              margin="normal"
            />
          </div>
          <Button
            variant="contained"
            className={classes.submit}
            size="large"
            type="submit"
          >
            {<FormattedMessage id="franchise.submit" />}
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
    { addFranchise }
  )
)(AddFranchise);
