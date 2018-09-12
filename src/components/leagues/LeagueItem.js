import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { getCurrentLeague } from "../../actions/leagueActions";
import {
  getUsersByName,
  addAdminToLeague,
  deleteAdminFromLeague
} from "../../actions/userActions";

import Messages from "../common/Messages";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  form: {
    display: "flex"
  },
  inputWrap: {
    width: "70%"
  },
  input: {
    width: "100%"
  },
  listWrap: {
    position: "relative",
    zIndex: 2
  },
  list: {
    position: "absolute",
    width: "100%",
    background: "#fff",
    boxShadow: "0 5px 1rem rgba(0,0,0,.5)",
    padding: 0,
    height: 200,
    overflowY: "scroll",
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#43A047",
      outline: "1px solid slategrey"
    },
    "&::-webkit-scrollbar": {
      width: 5
    }
  },
  listItem: {
    padding: "8px",
    height: "auto"
  },
  submit: {
    backgroundColor: "#43A047",
    borderRadius: 40,
    color: "#fff",
    marginBottom: "1rem"
  },
  button_link: {
    display: "block",
    width: "100%",
    color: "#000",
    textDecoration: "none",
    transition: ".3s"
  },
  cross: {
    color: "#ff5e5e",
    marginLeft: "auto"
  },
  pencil: {
    color: "#55a462",
    float: "right"
  },
  success: {
    backgroundColor: "#43A047"
  },
  error: {
    backgroundColor: "#ff5e5e"
  },
  listUser: {
    border: "1px solid rgba(0,0,0,.5)",
    padding: 0
  },
  listUserItem: {
    border: "1px solid rgba(0,0,0,.2)"
  }
});

class LeagueItem extends Component {
  state = {
    open: false,
    userName: "",
    userList: null
  };

  onClickHandler = (value, id) => {
    this.setState({
      ...this.state,
      userName: value,
      userId: id,
      userList: null
    });
  };

  onChangeHandler = e => {
    if (e.target.value.length >= 3) {
      this.props.getUsersByName(`${e.target.value}`);
    }

    this.setState({
      [e.target.name]: e.target.value.replace(/[а-я]+/gi, "")
    });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    this.props.addAdminToLeague(this.props.match.params.id, {
      usId: this.state.userId
    });
  };

  // onDelHandler = id => {

  // };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState(
      { open: false },
      this.props.getCurrentLeague(this.props.match.params.id)
    );
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    } else if (nextProps.users && nextProps.users.userList) {
      this.setState({
        ...this.state,
        userList: nextProps.users.userList
      });
    }
  };

  componentDidMount = () => {
    this.props.getCurrentLeague(this.props.match.params.id);
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
          <div className={classes.inputWrap}>
            <TextField
              label={<FormattedMessage id="combine.inputUserLabel" />}
              name="userName"
              className={classes.input}
              value={this.state.userName}
              onChange={this.onChangeHandler}
              margin="normal"
              autoComplete="off"
            />
            <Paper className={classes.listWrap}>
              {this.state.userList !== null ? (
                <List className={classes.list}>
                  {this.state.userList.map(user => (
                    <MenuItem
                      key={user.id}
                      className={classes.listItem}
                      component="div"
                      onClick={this.onClickHandler.bind(
                        this,
                        user.nickname,
                        user.id
                      )}
                    >
                      <span>{user.nickname}</span>
                    </MenuItem>
                  ))}
                </List>
              ) : (
                ""
              )}
            </Paper>
          </div>
          <Button
            variant="extendedFab"
            type="submit"
            className={classes.submit}
          >
            Добавить администратора
          </Button>
        </form>
        <List className={classes.listUser}>
          {this.props.league.currentLeague &&
          this.props.league.currentLeague.personal
            ? this.props.league.currentLeague.personal.map(user => (
                <MenuItem
                  key={user.id}
                  className={classes.listUserItem}
                  component="div"
                >
                  <span>{user.nickname}</span>
                  <Button
                    className={classes.cross}
                    onClick={() =>
                      this.props.deleteAdminFromLeague(
                        this.props.match.params.id,
                        {
                          usId: user.id
                        }
                      )
                    }
                  >
                    &#10006;
                  </Button>
                </MenuItem>
              ))
            : ""}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  league: state.league,
  users: state.users,
  errors: state.errors,
  messages: state.messages
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    {
      getCurrentLeague,
      getUsersByName,
      addAdminToLeague,
      deleteAdminFromLeague
    }
  )
)(LeagueItem);
