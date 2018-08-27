import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { addPlayer, getPositions } from "../../actions/playerActions";

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

class AddPlayers extends Component {
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

  getCroppedImg = () => {
    let img = new Image();
    let crop = this.state.crop;
    img.src = this.state.image;
    const targetX = (img.width * crop.x) / 100;
    const targetY = (img.height * crop.y) / 100;
    const targetWidth = (img.width * crop.width) / 100;
    const targetHeight = (img.height * crop.height) / 100;

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      img,
      targetX,
      targetY,
      targetWidth,
      targetHeight,
      0,
      0,
      targetWidth,
      targetHeight
    );

    this.setState({ readyImage: canvas.toDataURL("image/jpeg") });

    return canvas.toDataURL("image/jpeg");
  };

  imageLoaded = crop => {
    this.setState({ crop });
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const newPlayer = {
      name: this.state.name,
      surename: this.state.surname,
      patronymic: this.state.patronymic,
      position_id: +this.state.position_id,
      leg: this.state.leg,
      photo: this.state.readyImage,
      birthday: this.state.birthday,
      stature: this.state.stature,
      weight: this.state.weight,
      phone: this.state.phone,
      FB: this.state.fb,
      VK: this.state.vk
    };

    this.props.addPlayer(newPlayer);
  };

  handleCloseModal = () => {
    this.setState({ openModal: false });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  componentDidMount() {
    this.props.getPositions();
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
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
          <form className="player__form" onSubmit={this.onSubmitHandler}>
            <TextField
              label={<FormattedMessage id="players.nameLabel" />}
              name="name"
              className={classes.input}
              value={this.state.name}
              onChange={this.onChangeHandler}
              margin="normal"
            />
            <TextField
              label={<FormattedMessage id="players.surnameLabel" />}
              name="surname"
              className={classes.input}
              value={this.state.surname}
              onChange={this.onChangeHandler}
              margin="normal"
            />
            <TextField
              label={<FormattedMessage id="players.patronimycLabel" />}
              name="patronymic"
              className={classes.input}
              value={this.state.patronymic}
              onChange={this.onChangeHandler}
              margin="normal"
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
            />
            <TextField
              label={<FormattedMessage id="players.statureLabel" />}
              type="number"
              name="stature"
              className={classes.input}
              value={this.state.stature}
              onChange={this.onChangeHandler}
              margin="normal"
            />
            <TextField
              label={<FormattedMessage id="players.weightLabel" />}
              type="number"
              name="weight"
              className={classes.input}
              value={this.state.weight}
              onChange={this.onChangeHandler}
              margin="normal"
            />
            <TextField
              label={<FormattedMessage id="players.phoneLabel" />}
              type="tel"
              name="phone"
              className={classes.input}
              value={this.state.phone}
              onChange={this.onChangeHandler}
              margin="normal"
            />
            <TextField
              label={<FormattedMessage id="players.fbLabel" />}
              name="fb"
              className={classes.input}
              value={this.state.fb}
              onChange={this.onChangeHandler}
              margin="normal"
            />
            <TextField
              label={<FormattedMessage id="players.vkLabel" />}
              name="vk"
              className={classes.input}
              value={this.state.vk}
              onChange={this.onChangeHandler}
              margin="normal"
            />

            <InputFile
              type="image"
              className={classes.input}
              name="photo"
              onChange={this.onChangeFileHandler}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              className={classes.submit}
            >
              {<FormattedMessage id="players.save" />}
            </Button>
          </form>

          <Dialog
            open={this.state.openModal}
            onClose={this.handleCloseModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              {this.state.image && (
                <ReactCrop
                  style={{ width: "100%" }}
                  ref="crop"
                  src={this.state.image}
                  crop={this.state.crop}
                  onChange={this.imageLoaded}
                  onComplete={this.getCroppedImg}
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseModal} autoFocus>
                <FormattedMessage id="stuff.close" />
              </Button>
            </DialogActions>
          </Dialog>
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
    { addPlayer, getPositions }
  )
)(AddPlayers);
