import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import { getCommandsByName } from "../../actions/commandsActions";
import {
  addCommands,
  getCommands,
  deleteCommands
} from "../../actions/tournamentActions";

import Messages from "../common/Messages";
// import Downshift from "downshift";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    color: "#55a462",
    "&$checked": {
      color: "#55a462"
    }
  },
  checkbox: {
    color: "#43A047",
    "&$checked": {
      color: "#43A047"
    }
  },
  checked: {},
  wrap: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  form: {
    width: "49%"
  },
  imgWrap: {
    display: "flex"
  },
  img: {
    height: 42,
    marginLeft: "1rem"
  },
  input: {
    width: "100%",
    marginBottom: ".5rem"
  },
  select: {
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
    padding: 0
  },
  listItem: {
    padding: "8px",
    height: "auto"
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
  chip: {
    backgroundColor: "#effcf1",
    marginLeft: "1rem",
    "&:focus": {
      backgroundColor: "#effcf1"
    }
  },
  birthday: {
    marginTop: "1rem",
    width: "100%"
  },
  success: {
    backgroundColor: "#43A047"
  },
  error: {
    backgroundColor: "#ff5e5e"
  }
});

class AddTournamentCommand extends Component {
  state = {
    open: false,
    commands: [],
    commandsList: [],
    name: "",
    id: ""
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });

    this.props.getCommandsByName(`${e.target.value}`);
  };

  onClickHandler = command => {
    let addedCommand = this.state.commands;
    addedCommand.push(command);

    const addCommand = {
      command_id: command.command_id,
      sub_id: this.props.match.url.replace(/\D/g, "")
    };

    this.props.addCommands(addCommand);

    this.setState({
      ...this.state,
      commands: addedCommand,
      commandsList: null,
      name: ""
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  handleDelete = e => {
    let commands = this.state.commands;
    const deletedCommand = {
      sub_id: this.props.match.url.replace(/\D/g, ""),
      command_id: ""
    };

    if (e.target.parentNode.tagName !== "DIV") {
      deletedCommand.command_id = e.target.parentNode.parentNode.id;
      this.setState({
        ...this.state,
        commands: commands.filter(
          command => command.command_id !== e.target.parentNode.parentNode.id
        )
      });
      this.props.deleteCommands(deletedCommand);
    } else {
      deletedCommand.command_id = e.target.parentNode.id;
      this.setState({
        ...this.state,
        commands: commands.filter(
          command => command.command_id !== e.target.parentNode.id
        )
      });
      this.props.deleteCommands(deletedCommand);
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    } else if (nextProps.commands.commands) {
      this.setState({
        ...this.state,
        commandsList: nextProps.commands.commands
      });
    } else if (nextProps.tournaments.commands) {
      this.setState({
        ...this.state,
        commands: nextProps.tournaments.commands
      });
    }
  };

  componentWillMount() {
    this.props.getCommands(this.props.match.url.replace(/\D/g, ""));
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
        <div className={classes.wrap}>
          <div className={classes.form}>
            <form className="player__form" onSubmit={this.onSubmitHandler}>
              <TextField
                label={<FormattedMessage id="subtournaments.addCommands" />}
                name="name"
                className={classes.input}
                value={this.state.name}
                onChange={this.onChangeHandler}
                margin="normal"
                autoComplete="off"
              />
              <Paper className={classes.listWrap}>
                {this.state.commandsList !== null ? (
                  <List className={classes.list}>
                    {this.state.commandsList.map(command => {
                      if (
                        this.state.commands.every(
                          mainCommand =>
                            mainCommand.command_id !== command.command_id
                        )
                      ) {
                        return (
                          <MenuItem
                            key={command.command_id}
                            className={classes.listItem}
                            component="div"
                            onClick={this.onClickHandler.bind(this, command)}
                          >
                            <span>
                              <img
                                src={command.logo}
                                style={{ width: "50px", marginRight: 8 }}
                                alt=""
                              />
                            </span>
                            <span>{command.title}</span>
                          </MenuItem>
                        );
                      }
                    })}
                  </List>
                ) : (
                  ""
                )}
              </Paper>
              <div className={classes.chipsWrap}>
                {this.state.commands.length > 0
                  ? this.state.commands.map(command => (
                      <Chip
                        id={command.command_id}
                        key={command.command_id}
                        avatar={<Avatar src={command.logo} />}
                        label={command.title}
                        onDelete={this.handleDelete}
                        className={classes.chip}
                      />
                    ))
                  : ""}
              </div>
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                className={classes.submit}
              >
                {<FormattedMessage id="commands.submit" />}
              </Button>
            </form>
          </div>

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
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  tournaments: state.tournaments,
  commands: state.commands,
  errors: state.errors,
  messages: state.messages
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getCommandsByName, addCommands, getCommands, deleteCommands }
  )
)(AddTournamentCommand);
