import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { getStuffTypes, addStuffMember } from "../../actions/stuffActions";

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
    justifyContent: "space-between"
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
  success: {
    backgroundColor: "#43A047"
  },
  error: {
    backgroundColor: "#ff5e5e"
  }
});

class EditStuff extends Component {
  state = {
    open: false,
    openModal: false,
    name: "",
    surname: "",
    patronymic: "",
    type_id: "",
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
    this.setState({
      [e.target.name]: e.target.value.replace(/[а-я]+/gi, "")
    });
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

  handleCloseModal = () => {
    this.setState({ openModal: false });
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
    this.props.getStuffTypes();
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    }
  };

  render() {
    const { classes } = this.props;
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
      <div className={classes.root}>
        <div className={classes.form}>
          <Button onClick={() => this.props.history.goBack()}>Назад</Button>
          <form className="stuff__form" onSubmit={this.onSubmitHandler}>
            <TextField
              label={<FormattedMessage id="stuff.nameLabel" />}
              name="name"
              className={classes.input}
              value={this.state.name}
              onChange={this.onChangeHandler}
              margin="normal"
            />
            <TextField
              label={<FormattedMessage id="stuff.surnameLabel" />}
              name="surname"
              className={classes.input}
              value={this.state.surname}
              onChange={this.onChangeHandler}
              margin="normal"
            />
            <TextField
              label={<FormattedMessage id="stuff.patronimycLabel" />}
              name="patronymic"
              className={classes.input}
              value={this.state.patronymic}
              onChange={this.onChangeHandler}
              margin="normal"
            />

            <FormControl className={classes.input}>
              <InputLabel htmlFor="type_id">
                <FormattedMessage id="stuff.positionLabel" />
              </InputLabel>
              <Select
                className={classes.select}
                value={this.state.type_id}
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
              <FormattedMessage id="stuff.submit" />
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
  stuff: state.stuff,
  errors: state.errors,
  messages: state.messages
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getStuffTypes, addStuffMember }
  )
)(EditStuff);
