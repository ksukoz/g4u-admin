import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import { getGameById, editGame } from "../../actions/tournamentActions";
import { getStadiumByName } from "../../actions/stadiumAction";

import Messages from "../common/Messages";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import { DateTimePicker } from "material-ui-pickers";
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
  }
});

class EditGame extends Component {
  state = {
    open: false,
    tournament: "",
    name: "",
    status: false,
    start: new Date(),
    finish: new Date(),
    stadiumName: "",
    stadiumId: "",
    stadiumsList: null
  };

  onChangeStartHandler = date => {
    this.setState({
      start: date._d
    });
    console.log(Date.now(date._d));
  };

  onChangeHandler = e => {
    if (!e.target.value) {
      this.setState({
        [e.target.name]: e.target.value,
        stadiumsList: null
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
      this.props.getStadiumByName(e.target.value);
    }
  };

  onClickHandler = (type, name, id) => {
    if (type === "stadium") {
      this.setState({
        ...this.state,
        stadiumName: name,
        stadiumId: id,
        stadiumsList: null
      });
    }
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const editedGame = {
      game_id: this.props.match.url.replace(/\D/g, ""),
      date: Date.parse(this.state.start),
      stadiums_id: this.state.stadiumId
    };

    this.props.editGame(editedGame);
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

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    } else if (nextProps.tournaments.game) {
      this.setState({
        ...this.state,
        start: nextProps.tournaments.game.date
          ? new Date(+nextProps.tournaments.game.date)
          : new Date()
      });
    } else if (nextProps.stadiums.stadiums) {
      this.setState({
        ...this.state,
        stadiumsList: nextProps.stadiums.stadiums
      });
    }
  };

  componentDidMount() {
    this.props.getGameById(this.props.match.url.replace(/\D/g, ""));
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
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker
              name="start"
              value={this.state.start}
              onChange={this.onChangeStartHandler}
            />
          </MuiPickersUtilsProvider>
          <div className={classes.inputWrap}>
            <TextField
              label={<FormattedMessage id="commands.nameLabel" />}
              name="stadiumName"
              className={classes.input}
              value={this.state.stadiumName}
              onChange={this.onChangeHandler}
              margin="normal"
              autoComplete="off"
            />
            <Paper className={classes.listWrap}>
              {this.state.stadiumsList !== null ? (
                <List className={classes.list}>
                  {this.state.stadiumsList.map(stadium => (
                    <MenuItem
                      key={stadium.stadiums_id}
                      className={classes.listItem}
                      component="div"
                      onClick={this.onClickHandler.bind(
                        this,
                        "stadium",
                        `${stadium.title}, ${stadium.address}`,
                        stadium.stadiums_id
                      )}
                    >
                      <span>{`${stadium.title}, ${stadium.address}`}</span>
                    </MenuItem>
                  ))}
                </List>
              ) : (
                ""
              )}
            </Paper>
          </div>
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
  messages: state.messages,
  stadiums: state.stadiums,
  tournaments: state.tournaments
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getGameById, getStadiumByName, editGame }
  )
)(EditGame);
