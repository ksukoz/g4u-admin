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
import { getCommands, deleteCommand } from "../../actions/commandsActions";

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
  }
});

class Commands extends Component {
  state = {
    open: false
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    if (this.props.messages) {
      this.setState({ open: false }, this.props.getCommands());
    }

    this.setState({ open: false });
  };

  onClickHandler = e => {
    e.preventDefault();
    if (!e.target.name) {
      this.props.deleteCommand(e.target.parentNode.name);
    } else {
      this.props.deleteCommand(e.target.name);
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    }
  };

  componentDidMount = () => {
    this.props.getCommands();
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
          {commands !== null
            ? commands.map(command => (
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
                      onClick={this.onClickHandler}
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
    { getCommands, deleteCommand }
  )
)(Commands);
