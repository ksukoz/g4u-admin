import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import Messages from "../common/Messages";

import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";

import Button from "@material-ui/core/Button";
import {
  getAllCommandsByName,
  deleteCommand
} from "../../actions/commandsActions";
import { IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

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
  success: {
    backgroundColor: "#43A047"
  },
  error: {
    backgroundColor: "#ff5e5e"
  },
  cross: {
    color: "#ff5e5e",
    marginLeft: "auto"
  },
  img: {
    height: 40,
    marginRight: 8
  },
  arrowButton: {
    "&:hover": {
      backgroundColor: "transparent",
      color: "#43A047"
    }
  },
  pagination: {
    marginLeft: "auto",
    width: "max-content"
  }
});

class Commands extends Component {
  state = {
    open: false,
    search: ""
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    if (this.props.messages) {
      this.setState({ open: false }, this.props.getAllCommandsByName());
    }

    this.setState({ open: false });
  };

  onChangeHandler = e => {
    if (e.target.value.replace(/[а-я]+/gi, "").length >= 3) {
      this.props.getAllCommandsByName(
        `?name=${e.target.value.replace(/[а-я]+/gi, "")}`
      );
    }
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value.replace(/[а-я]+/gi, "")
    });
  };

  onClickHandler = offset => e => {
    this.props.getAllCommandsByName(`?offset=${offset}`);
  };

  onDeleteClickHandler = id => e => {
    e.preventDefault();
    this.props.deleteCommand(id);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    }
  };

  componentDidMount = () => {
    this.props.getAllCommandsByName();
  };

  render() {
    const { classes } = this.props;
    const { commands } = this.props.commands;

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
        <Link className={classes.button_link} to={"/add-command"}>
          <Button variant="extendedFab" className={classes.button}>
            <FormattedMessage id="commands.add" />
          </Button>
        </Link>
        <List>
          <TextField
            className={classes.input}
            type="text"
            name="search"
            value={this.state.search}
            onChange={this.onChangeHandler}
            onInput={e => {
              e.target.value = e.target.value;
            }}
            label="Поиск"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            autoComplete="off"
          />
          {commands !== null && commands.filters !== null ? (
            <div className={classes.pagination}>
              <IconButton
                className={classes.arrowButton}
                disabled={commands.filters.prev === null}
                onClick={this.onClickHandler(commands.filters.prev)}
              >
                <ArrowBackIosIcon />
              </IconButton>

              <span style={{ fontSize: "2rem", color: "#43A047" }}>
                {+commands.filters.current + 1}
              </span>
              <IconButton
                className={classes.arrowButton}
                disabled={!commands.filters.next}
                onClick={this.onClickHandler(commands.filters.next)}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </div>
          ) : (
            ""
          )}
          {commands !== null && commands.all !== null
            ? commands.all.map(command => (
                <Link
                  className={classes.button_link}
                  to={`/commands/${command.command_id}`}
                  key={command.command_id}
                >
                  <MenuItem
                    className={classes.listItem}
                    value={command.command_id}
                  >
                    <img src={command.logo} alt="" className={classes.img} />
                    <span>{command.title}</span>
                    <Button
                      title="Заблокировать команду"
                      className={classes.cross}
                      onClick={this.onDeleteClickHandler(command.command_id)}
                      name={command.command_id}
                    >
                      &#10006;
                    </Button>
                  </MenuItem>
                </Link>
              ))
            : ""}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  commands: state.commands,
  errors: state.errors,
  messages: state.messages
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getAllCommandsByName, deleteCommand }
  )
)(Commands);
