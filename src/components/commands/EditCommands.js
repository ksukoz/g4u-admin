import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import {
  getCommandById,
  getCommandsByName,
  editCommand,
  clearCommands
} from "../../actions/commandsActions";
import { getPlayersByName } from "../../actions/playerActions";

import InputFile from "../common/InputFile";

import Messages from "../common/Messages";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
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
    width: "100%"
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

class EditCommands extends Component {
  state = {
    open: false,
    name: "",
    playerName: "",
    playerId: "",
    double: "",
    doubleId: "",
    image: "",
    country: null,
    playersList: null,
    commandsList: null,
    command: null,
    region: "",
    status: "",
    city: ""
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value.replace(/[а-я]+/gi, "")
    });

    if (e.target.name === "playerName" && e.target.value.length >= 3) {
      this.props.getPlayersByName(`${e.target.value}&tied=1`);
    } else if (e.target.name === "double" && e.target.value.length >= 3) {
      this.props.getCommandsByName(`${e.target.value}&sub=1`);
    }
  };

  onRadioChangeHandler = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  onChangeFileHandler = e => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      this.setState({ ...this.state, openModal: true });
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener(
        "load",
        () => {
          this.setState({
            image: reader.result
          });
        },
        false
      );
    }
  };

  onClickHandler = (type, player, id) => {
    if (type === "player") {
      this.setState({
        ...this.state,
        playerName: player,
        playerId: id,
        playersList: null
      });
    } else if (type === "command") {
      this.setState({
        ...this.state,
        double: player,
        doubleId: id,
        commandsList: null
      });
    }
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const editedCommand = {
      title: this.state.name,
      status: this.state.status,
      logo: this.state.image
    };

    if (this.state.playerId) {
      editedCommand.player_id = this.state.playerId;
    } else if (this.state.doubleId) {
      editedCommand.sub_command_id = this.state.doubleId;
    }

    this.props.editCommand(
      this.props.match.url.replace(/\D/g, ""),
      editedCommand
    );
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

  toggleChange = () => {
    this.setState({ status: !this.state.status });
  };

  componentDidMount = () => {
    this.props.getCommandById(this.props.match.url.replace(/\D/g, ""));
    this.props.clearCommands();
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    } else if (nextProps.players.members) {
      this.setState({ ...this.state, playersList: nextProps.players.members });
    } else if (nextProps.commands.commands) {
      this.setState({
        ...this.state,
        commandsList: nextProps.commands.commands
      });
    } else if (
      nextProps.commands.command &&
      nextProps.players &&
      nextProps.commands.commands === null
    ) {
      this.setState({
        ...this.state,
        command: nextProps.commands.command,
        name: nextProps.commands.command.title,
        status: nextProps.commands.command.status === "1" ? true : false,
        playerName: nextProps.commands.command.name,
        double: nextProps.commands.command.subtitle
          ? nextProps.commands.command.subtitle
          : "",

        image: nextProps.commands.command.logo
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrap}>
        <div className={classes.form}>
          <Button onClick={() => this.props.history.goBack()}>Назад</Button>
          <form className="player__form" onSubmit={this.onSubmitHandler}>
            <TextField
              label={<FormattedMessage id="commands.nameLabel" />}
              name="name"
              className={classes.input}
              value={this.state.name}
              onChange={this.onChangeHandler}
              margin="normal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.status}
                  classes={{ root: classes.checkbox, checked: classes.checked }}
                  onChange={this.toggleChange}
                />
              }
              className={classes.input}
              label={<FormattedMessage id="commands.showLabel" />}
            />
            <div className={classes.imgWrap}>
              <InputFile
                type="png"
                name="photo"
                onChange={this.onChangeFileHandler}
              />
              {this.state.image ? (
                <img className={classes.img} src={this.state.image} alt="" />
              ) : (
                ""
              )}
            </div>
            <TextField
              label={<FormattedMessage id="commands.captainLabel" />}
              name="playerName"
              className={classes.input}
              value={this.state.playerName}
              onChange={this.onChangeHandler}
              margin="normal"
              autoComplete="off"
            />
            <Paper className={classes.listWrap}>
              {this.state.playersList !== null ? (
                <List className={classes.list}>
                  {this.state.playersList.map(player => (
                    <MenuItem
                      key={player.player_id}
                      className={classes.listItem}
                      component="div"
                      onClick={this.onClickHandler.bind(
                        this,
                        "player",
                        `${player.surename} ${player.name} ${
                          player.patronymic
                        }`,
                        player.player_id
                      )}
                    >
                      <span>
                        <img
                          src={player.photo}
                          style={{ width: "50px", marginRight: 8 }}
                          alt=""
                        />
                      </span>
                      <span>{`${player.surename} ${player.name} ${
                        player.patronymic
                      }`}</span>
                    </MenuItem>
                  ))}
                </List>
              ) : (
                ""
              )}
            </Paper>
            <TextField
              label={<FormattedMessage id="commands.doubleLabel" />}
              name="double"
              className={classes.input}
              value={this.state.double}
              onChange={this.onChangeHandler}
              margin="normal"
              autoComplete="off"
            />
            <Paper className={classes.listWrap}>
              {this.state.commandsList !== null ? (
                <List className={classes.list}>
                  {this.state.commandsList.map(command => (
                    <MenuItem
                      key={command.command_id}
                      className={classes.listItem}
                      component="div"
                      onClick={this.onClickHandler.bind(
                        this,
                        "command",
                        command.title,
                        command.command_id
                      )}
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
                  ))}
                </List>
              ) : (
                ""
              )}
            </Paper>
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
    );
  }
}

const mapStateToProps = state => ({
  location: state.location,
  players: state.players,
  commands: state.commands,
  errors: state.errors,
  messages: state.messages
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    {
      getCommandById,
      getCommandsByName,
      getPlayersByName,
      editCommand,
      clearCommands
    }
  )
)(EditCommands);
