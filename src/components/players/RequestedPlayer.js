import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  addPlayer,
  getPositions,
  getRequestedPlayer,
  acceptPlayerRequest,
  cancelPlayerRequest
} from "../../actions/playerActions";

import InputFile from "../common/InputFile";

import Messages from "../common/Messages";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  form: {
    width: "49%"
  },
  media: {
    width: "40%"
  },
  img: {
    width: "100%"
  },
  input: {
    width: "100%",
    marginBottom: ".5rem"
  },
  select: {
    width: "100%"
  },
  button: {
    marginBottom: "1rem",
    marginLeft: "1rem",
    padding: ".5rem 1rem",
    background: "#fff",
    border: "1px solid #55a462",
    borderRadius: 40,
    color: "#000",
    boxShadow: "none",
    "&:hover,&:active": {
      background: "#55a462"
    },

    "&:hover a,&:active": {
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

class RequestedPlayer extends Component {
  state = {
    open: false,
    openModal: false,
    name: "",
    surname: "",
    patronymic: "",
    position_id: "",
    leg: "",
    birthday: "",
    stature: "",
    weight: "",
    phone: "",
    fb: "",
    vk: "",
    image: null,
    readyImage: "",
    crop: {
      x: 30,
      y: 30,
      width: 30,
      height: 30,
      aspect: 1 / 1
    }
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

  componentDidMount() {
    this.props.getPositions();
    this.props.getRequestedPlayer(this.props.match.params.id);
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    } else if (nextProps.players && nextProps.players.requestedPlayer) {
      this.setState({
        ...this.state,
        name: nextProps.players.requestedPlayer.name,
        surname: nextProps.players.requestedPlayer.surename,
        patronymic: nextProps.players.requestedPlayer.patronymic,
        position_id: nextProps.players.requestedPlayer.position_id,
        leg: nextProps.players.requestedPlayer.leg,
        birthday: nextProps.players.requestedPlayer.birthday,
        stature: nextProps.players.requestedPlayer.stature,
        weight: nextProps.players.requestedPlayer.weight,
        phone: nextProps.players.requestedPlayer.phone,
        fb: nextProps.players.requestedPlayer.fb,
        vk: nextProps.players.requestedPlayer.vk,
        readyImage: nextProps.players.requestedPlayer.readyImage
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { positions } = this.props.players;

    let positionsList;
    if (positions !== null) {
      positionsList = positions.map(position => (
        <MenuItem key={position.position_id} value={position.position_id}>
          {position.type}
        </MenuItem>
      ));
    }

    return (
      <div className={classes.root}>
        <div className={classes.form}>
          <Button onClick={() => this.props.history.goBack()}>Назад</Button>
          <form className="player__form" onSubmit={this.onSubmitHandler}>
            <TextField
              label={<FormattedMessage id="players.nameLabel" />}
              name="name"
              className={classes.input}
              value={this.state.name}
              onChange={this.onChangeHandler}
              margin="normal"
              disabled
            />
            <TextField
              label={<FormattedMessage id="players.surnameLabel" />}
              name="surname"
              className={classes.input}
              value={this.state.surname}
              onChange={this.onChangeHandler}
              margin="normal"
              disabled
            />
            <TextField
              label={<FormattedMessage id="players.patronimycLabel" />}
              name="patronymic"
              className={classes.input}
              value={this.state.patronymic}
              onChange={this.onChangeHandler}
              margin="normal"
              disabled
            />

            <FormControl className={classes.input}>
              <InputLabel htmlFor="position_id">
                <FormattedMessage id="players.positionLabel" />
              </InputLabel>
              <Select
                className={classes.select}
                value={this.state.position_id}
                onChange={this.onChangeHandler}
                inputProps={{
                  name: "position_id",
                  id: "position_id"
                }}
                disabled
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {positionsList}
              </Select>
            </FormControl>
            <FormControl className={classes.input}>
              <InputLabel htmlFor="leg">
                <FormattedMessage id="players.legLabel" />
              </InputLabel>
              <Select
                className={classes.select}
                value={this.state.leg}
                onChange={this.onChangeHandler}
                inputProps={{
                  name: "leg",
                  id: "leg"
                }}
                disabled
              >
                <MenuItem value="left">
                  <FormattedMessage id="players.leftLeg" />
                </MenuItem>
                <MenuItem value="right">
                  <FormattedMessage id="players.rightLeg" />
                </MenuItem>
                <MenuItem value="both">
                  <FormattedMessage id="players.bothLeg" />
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="birthday"
              label={<FormattedMessage id="players.birthdayLabel" />}
              type="date"
              name="birthday"
              className={classes.birthday}
              value={this.state.birthday}
              onChange={this.onChangeHandler}
              InputLabelProps={{
                shrink: true
              }}
              disabled
            />
            <TextField
              label={<FormattedMessage id="players.statureLabel" />}
              type="number"
              name="stature"
              className={classes.input}
              value={this.state.stature}
              onChange={this.onChangeHandler}
              margin="normal"
              disabled
            />
            <TextField
              label={<FormattedMessage id="players.weightLabel" />}
              type="number"
              name="weight"
              className={classes.input}
              value={this.state.weight}
              onChange={this.onChangeHandler}
              margin="normal"
              disabled
            />
            <TextField
              label={<FormattedMessage id="players.phoneLabel" />}
              type="tel"
              name="phone"
              className={classes.input}
              value={this.state.phone}
              onChange={this.onChangeHandler}
              margin="normal"
              disabled
            />
            <TextField
              label={<FormattedMessage id="players.fbLabel" />}
              name="fb"
              className={classes.input}
              value={this.state.fb}
              onChange={this.onChangeHandler}
              margin="normal"
              disabled
            />
            <TextField
              label={<FormattedMessage id="players.vkLabel" />}
              name="vk"
              className={classes.input}
              value={this.state.vk}
              onChange={this.onChangeHandler}
              margin="normal"
              disabled
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.submit}
              onClick={() =>
                this.props.acceptPlayerRequest(this.props.match.params.id)
              }
            >
              Подтвердить
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              onClick={() =>
                this.props.cancelPlayerRequest(this.props.match.params.id)
              }
            >
              Отменить
            </Button>
          </form>
        </div>
        <div className={classes.media}>
          {this.state.readyImage !== null ? (
            <img src={this.state.readyImage} className={classes.img} alt="" />
          ) : (
            ""
          )}
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
  players: state.players,
  errors: state.errors,
  messages: state.messages
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    {
      addPlayer,
      getPositions,
      getRequestedPlayer,
      acceptPlayerRequest,
      cancelPlayerRequest
    }
  )
)(RequestedPlayer);
