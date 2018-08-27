import React, { Component } from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import { addLeague } from "../../actions/leagueActions";
import { getCountries } from "../../actions/locationActions";

import InputFile from "../common/InputFile";

import Messages from "../common/Messages";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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
  checkbox: {
    color: "#43A047",
    "&$checked": {
      color: "#43A047"
    }
  },
  checked: {},
  wrap: {
    display: "flex",
    justifyContent: "space-between"
  },
  input: {
    width: "100%",
    marginBottom: "1rem"
  },
  input_wrap: {
    width: "50%",
    marginBottom: "1rem"
  },
  media: {
    width: "40%"
  },
  select: {
    width: "100%",
    paddingTop: "1rem"
  },
  img: {
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

class AddLeague extends Component {
  state = {
    open: false,
    openModal: false,
    name: "",
    desc: "",
    status: false,
    country: "",
    image: null,
    readyImage: "",
    crop: {
      x: 30,
      y: 30,
      width: 30,
      height: 30,
      aspect: 16 / 9
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

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleChange = () => {
    this.setState({ status: !this.state.status });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const newLeague = {
      name: this.state.name,
      description: this.state.desc,
      status: this.state.status,
      country_id: this.state.country,
      photo: this.state.readyImage
    };

    this.props.addLeague(newLeague);
  };

  handleCloseModal = () => {
    this.setState({ openModal: false });
  };

  componentWillMount() {
    this.props.getCountries();
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    }
  };

  render() {
    const { classes } = this.props;
    const { countries } = this.props.location;
    let countriesList;
    if (countries !== null && countries !== undefined) {
      countriesList = countries.map(country => (
        <MenuItem key={country.id} value={country.iso}>
          {country.name}
        </MenuItem>
      ));
    }

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
          <form className={classes.input_wrap} onSubmit={this.onSubmitHandler}>
            <TextField
              label={<FormattedMessage id="leagues.nameLabel" />}
              name="name"
              className={classes.input}
              value={this.state.name}
              onChange={this.onChangeHandler}
              margin="normal"
            />
            <TextField
              id="multiline-flexible"
              label={<FormattedMessage id="leagues.descLabel" />}
              multiline
              rows="4"
              value={this.state.desc}
              onChange={this.onChangeHandler}
              className={classes.input}
              name="desc"
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
              label={<FormattedMessage id="leagues.showLabel" />}
            />
            <FormControl className={classes.input}>
              <InputLabel htmlFor="country">
                <FormattedMessage id="leagues.countryLabel" />
              </InputLabel>
              <Select
                value={this.state.country}
                className={classes.select}
                onChange={this.onChangeHandler}
                inputProps={{
                  name: "country",
                  id: "country"
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {countriesList}
              </Select>
            </FormControl>
            <InputFile
              type="image"
              className={classes.input}
              name="photo"
              onChange={this.onChangeFileHandler}
            />
            <Button size="large" type="submit" className={classes.submit}>
              <FormattedMessage id="leagues.submit" />
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
          <div className={classes.media}>
            {this.state.readyImage !== null ? (
              <img src={this.state.readyImage} className={classes.img} alt="" />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location,
  errors: state.errors,
  messages: state.messages
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { addLeague, getCountries }
  )
)(AddLeague);
