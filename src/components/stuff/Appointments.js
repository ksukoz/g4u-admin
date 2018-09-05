import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import { getStuffForAppoint } from "../../actions/stuffActions";
import {
  getGamesByName,
  addAppoint,
  getAppoints,
  deleteAppoint
} from "../../actions/tournamentActions";

import InputFile from "../common/InputFile";

import Messages from "../common/Messages";
// import Downshift from "downshift";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
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
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  inputWrap: {
    width: "49%"
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

class Appointments extends Component {
  state = {
    open: false,
    stuffName: "",
    stuffId: "",
    gameName: "",
    gameId: "",
    stuffList: null,
    gamesList: null
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value.replace(/[а-я]+/gi, "")
    });

    if (e.target.name === "stuffName") {
      this.setState({
        ...this.state,
        [e.target.name]: e.target.value.replace(/[а-я]+/gi, ""),
        stuffId: ""
      });

      if (e.target.value.length >= 3) {
        this.props.getStuffForAppoint(e.target.value);
      }
    } else if (e.target.name === "gameName") {
      this.setState({
        ...this.state,
        [e.target.name]: e.target.value.replace(/[а-я]+/gi, ""),
        gameId: ""
      });
      if (e.target.value.length >= 3) {
        this.props.getGamesByName(e.target.value);
      }
    }
  };

  onClickHandler = (type, value, id) => {
    if (type === "stuff") {
      this.setState({
        ...this.state,
        stuffName: value,
        stuffId: id,
        stuffList: null
      });
    } else if (type === "game") {
      this.setState({
        ...this.state,
        gameName: value,
        gameId: id,
        gamesList: null
      });
    }
  };

  onDelHandler = id => {
    this.props.deleteAppoint({ id: id });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const newAsign = {
      pers_id: this.state.stuffId,
      game_id: this.state.gameId
    };

    this.props.addAppoint(newAsign);
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false }, this.props.getAppoints());
  };

  componentWillMount = () => {
    this.props.getAppoints();
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    } else if (nextProps.tournaments.games && !this.state.gameId) {
      this.setState({
        ...this.state,
        gamesList: nextProps.tournaments.games
      });
    } else if (nextProps.stuff.members && !this.state.stuffId) {
      this.setState({ ...this.state, stuffList: nextProps.stuff.members });
    }
  };

  render() {
    const { classes } = this.props;
    const { appoints } = this.props.tournaments;

    let appointsList;
    if (appoints !== null && appoints !== undefined) {
      appointsList = appoints.map(
        appoint =>
          appoint.personal !== null ? (
            <TableRow key={appoint.id}>
              <TableCell component="th" scope="row">
                {`${appoint.personal.surename} ${appoint.personal.name} ${
                  appoint.personal.patronymic
                }`}
              </TableCell>
              <TableCell>
                <span>{appoint.personal.type}</span>
              </TableCell>
              <TableCell>
                <img
                  src={appoint.personal.photo}
                  style={{ width: "50px" }}
                  alt=""
                />
              </TableCell>
              <TableCell>&#x21d2;</TableCell>
              <TableCell component="th" scope="row">
                <img
                  src={appoint.game.in.logo}
                  style={{ width: "50px" }}
                  alt=""
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {appoint.game.in.title}
              </TableCell>
              <TableCell>
                <span>vs</span>
              </TableCell>
              <TableCell component="th" scope="row">
                {appoint.game.out.title}
              </TableCell>
              <TableCell component="th" scope="row">
                <img
                  src={appoint.game.out.logo}
                  style={{ width: "50px" }}
                  alt=""
                />
              </TableCell>
              <TableCell component="th" scope="row">
                <Button
                  className={classes.button}
                  onClick={this.onDelHandler.bind(this, appoint.id)}
                >
                  &#10006;
                </Button>
              </TableCell>
            </TableRow>
          ) : (
            ""
          )
      );
    }

    return (
      <div className={classes.wrap}>
        <div className={classes.form}>
          <form className={classes.form} onSubmit={this.onSubmitHandler}>
            <div className={classes.inputWrap}>
              <TextField
                label={<FormattedMessage id="combine.inputLabel" />}
                name="stuffName"
                className={classes.input}
                value={this.state.stuffName}
                onChange={this.onChangeHandler}
                margin="normal"
                autoComplete="off"
              />
              <Paper className={classes.listWrap}>
                {this.state.stuffList !== null ? (
                  <List className={classes.list}>
                    {this.state.stuffList.map(stuff => (
                      <MenuItem
                        key={stuff.id}
                        className={classes.listItem}
                        component="div"
                        onClick={this.onClickHandler.bind(
                          this,
                          "stuff",
                          `${stuff.surename} ${stuff.name} ${
                            stuff.patronymic
                          } - ${stuff.type}`,
                          stuff.id
                        )}
                      >
                        <span>
                          <img
                            src={stuff.photo}
                            style={{ width: "50px", marginRight: 8 }}
                            alt=""
                          />
                        </span>
                        <span>{`${stuff.surename} ${stuff.name} ${
                          stuff.patronymic
                        } - ${stuff.type}`}</span>
                      </MenuItem>
                    ))}
                  </List>
                ) : (
                  ""
                )}
              </Paper>
            </div>
            <div className={classes.inputWrap}>
              <TextField
                label={<FormattedMessage id="commands.nameLabel" />}
                name="gameName"
                className={classes.input}
                value={this.state.gameName}
                onChange={this.onChangeHandler}
                margin="normal"
                autoComplete="off"
              />
              <Paper className={classes.listWrap}>
                {this.state.gamesList !== null ? (
                  <List className={classes.list}>
                    {this.state.gamesList.map(game => (
                      <MenuItem
                        key={game.id}
                        className={classes.listItem}
                        component="div"
                        onClick={this.onClickHandler.bind(
                          this,
                          "game",
                          `${game.in.title} : ${game.out.title}`,
                          game.id
                        )}
                      >
                        <span>
                          <img
                            src={game.in.logo}
                            style={{ width: "25px", marginRight: 8 }}
                            alt=""
                          />
                        </span>
                        <span>{`${game.in.title} : ${game.out.title} `}</span>
                        <span>
                          <img
                            src={game.out.logo}
                            style={{ width: "25px", marginLeft: 8 }}
                            alt=""
                          />
                        </span>
                      </MenuItem>
                    ))}
                  </List>
                ) : (
                  ""
                )}
              </Paper>
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <FormattedMessage id="players.tableName" />
                </TableCell>
                <TableCell>
                  <FormattedMessage id="stuff.tablePosition" />
                </TableCell>
                <TableCell>
                  <FormattedMessage id="players.tableImage" />
                </TableCell>
                <TableCell />
                <TableCell />
                <TableCell>Принимающая команда</TableCell>
                <TableCell />
                <TableCell>Гостевая команда</TableCell>
                <TableCell />
                <TableCell>Удалить</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{appointsList}</TableBody>
          </Table>
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
  stuff: state.stuff,
  tournaments: state.tournaments,
  commands: state.commands,
  errors: state.errors,
  messages: state.messages
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    {
      getStuffForAppoint,
      getGamesByName,
      addAppoint,
      getAppoints,
      deleteAppoint
    }
  )
)(Appointments);
