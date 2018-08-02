import React, { Component } from "react";
import { connect } from "react-redux";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { getStuffTypes, addStuffMember } from "../../actions/stuffActions";

import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Button from "@material-ui/core/Button";

class AddStuff extends Component {
  state = {
    name: "",
    surname: "",
    patronymic: "",
    type_id: 1,
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

    const newStuffMember = {
      name: this.state.name,
      surename: this.state.surname,
      patronymic: this.state.patronymic,
      type_id: +this.state.type_id,
      photo: this.state.readyImage
    };

    this.props.addStuffMember(newStuffMember);
  };

  componentDidMount() {
    this.props.getStuffTypes();
  }

  render() {
    const { options } = this.props.stuff;

    let optionsList;
    if (options !== null) {
      optionsList = options.map(option => (
        <MenuItem key={option.id} value={option.id}>
          {option.type_ru}
        </MenuItem>
      ));
    }

    return (
      <div>
        <form className="stuff__form" onSubmit={this.onSubmitHandler}>
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
            <InputLabel htmlFor="type_id">Выбрать должность</InputLabel>
            <Select
              value={this.state.type}
              onChange={this.onChangeHandler}
              inputProps={{
                name: "type_id",
                id: "type_id"
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {optionsList}
            </Select>
          </FormControl>
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
  stuff: state.stuff
});

export default connect(
  mapStateToProps,
  { getStuffTypes, addStuffMember }
)(AddStuff);
