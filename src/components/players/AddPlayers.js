import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { connect } from "react-redux";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { addPlayer, getPositions } from "../../actions/playerActions";

import InputFile from "../common/InputFile";

import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between"
  },
  form: {
    width: "49%"
  },
  media: {
    width: "49%"
  },
  img: {
    width: "100%"
  },
  input: {
    width: "32%"
  },
  input_wrap: {
    display: "flex",
    justifyContent: "space-between"
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
  }
});

class AddPlayers extends Component {
  state = {
    name: "",
    surname: "",
    patronymic: "",
    position_id: "",
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

  componentDidMount() {
    this.props.getPositions();
  }

  render() {
    const { classes } = this.props;
    const { positions } = this.props.players;

    let positionsList;
    if (positions !== null) {
      positionsList = positions.map(position => (
        <option key={position.position_id} value={position.position_id}>
          {position.type}
        </option>
      ));
    }

    return (
      <div className={classes.root}>
        <div className={classes.form}>
          <form className="player__form" onSubmit={this.onSubmitHandler}>
            <div className={classes.input_wrap}>
              <TextField
                label="Имя"
                name="name"
                className={classes.input}
                value={this.state.name}
                onChange={this.onChangeHandler}
                margin="normal"
              />
              <TextField
                label="Фамилия"
                name="surname"
                className={classes.input}
                value={this.state.surname}
                onChange={this.onChangeHandler}
                margin="normal"
              />
              <TextField
                label="Отчество"
                name="patronymic"
                className={classes.input}
                value={this.state.patronymic}
                onChange={this.onChangeHandler}
                margin="normal"
              />
            </div>
            <div className={classes.input_wrap}>
              <InputFile
                type="image"
                className={classes.input}
                name="photo"
                onChange={this.onChangeFileHandler}
              />

              <FormControl className="select" className={classes.input}>
                <InputLabel htmlFor="position_id">Выбрать позицию</InputLabel>
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
              <TextField
                id="birthday"
                label="Дата рождения"
                type="date"
                name="birthday"
                className={classes.input}
                value={this.state.birthday}
                onChange={this.onChangeHandler}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
            <div className={classes.input_wrap}>
              <TextField
                label="Рост"
                type="number"
                name="stature"
                className={classes.input}
                value={this.state.stature}
                onChange={this.onChangeHandler}
                margin="normal"
              />
              <TextField
                label="Вес"
                type="number"
                name="weight"
                className={classes.input}
                value={this.state.weight}
                onChange={this.onChangeHandler}
                margin="normal"
              />
              <TextField
                label="Телефон"
                type="tel"
                name="phone"
                className={classes.input}
                value={this.state.phone}
                onChange={this.onChangeHandler}
                margin="normal"
              />
            </div>
            <div className={classes.input_wrap}>
              <TextField
                label="Facebook"
                name="fb"
                className={classes.input}
                value={this.state.fb}
                onChange={this.onChangeHandler}
                margin="normal"
              />
              <TextField
                label="VK"
                name="vk"
                className={classes.input}
                value={this.state.vk}
                onChange={this.onChangeHandler}
                margin="normal"
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              className={classes.submit}
            >
              Сохранить
            </Button>
          </form>

          {this.state.image && (
            <div>
              <ReactCrop
                ref="crop"
                src={this.state.image}
                crop={this.state.crop}
                onChange={this.imageLoaded}
                onComplete={this.getCroppedImg}
              />
            </div>
          )}
        </div>
        <div className={classes.media}>
          {this.state.readyImage !== null ? (
            <img src={this.state.readyImage} className={classes.img} />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  players: state.players
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { addPlayer, getPositions }
  )
)(AddPlayers);
