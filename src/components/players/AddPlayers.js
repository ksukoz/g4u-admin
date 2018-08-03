import React, { Component } from "react";
import { connect } from "react-redux";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { addPlayer, getPositions } from "../../actions/playerActions";

import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Button from "@material-ui/core/Button";

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
      x: 20,
      y: 10,
      width: 30,
      height: 10,
      aspect: 1 / 1
    }
  };

  onChange = e => {
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
      <div>
        <form className="player__form" onSubmit={this.onSubmitHandler}>
          <TextField
            label="Имя"
            name="name"
            className="text-field"
            value={this.state.name}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <TextField
            label="Фамилия"
            name="surname"
            className="text-field"
            value={this.state.surname}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <TextField
            label="Отчество"
            name="patronymic"
            className="text-field"
            value={this.state.patronymic}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <input ref="file" type="file" onChange={this.onChange} />
          {this.state.readyImage !== null ? (
            <img
              style={{ width: "100px" }}
              src={this.state.readyImage}
              alt="Обрезанное изображение"
            />
          ) : (
            ""
          )}
          <FormControl className="select">
            <InputLabel htmlFor="position_id">Выбрать позицию</InputLabel>
            <Select
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
            value={this.state.birthday}
            onChange={this.onChangeHandler}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            label="Рост"
            type="number"
            name="stature"
            className="text-field"
            value={this.state.stature}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <TextField
            label="Вес"
            type="number"
            name="weight"
            className="text-field"
            value={this.state.weight}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <TextField
            label="Телефон"
            type="tel"
            name="phone"
            className="text-field"
            value={this.state.phone}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <TextField
            label="Facebook"
            name="fb"
            className="text-field"
            value={this.state.fb}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <TextField
            label="VK"
            name="vk"
            className="text-field"
            value={this.state.vk}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            className="btn"
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
    );
  }
}

const mapStateToProps = state => ({
  players: state.players
});

export default connect(
  mapStateToProps,
  { addPlayer, getPositions }
)(AddPlayers);
