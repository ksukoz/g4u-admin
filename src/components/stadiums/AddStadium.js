/*global google*/

import React, { Component } from "react";
import Geosuggest from "react-geosuggest";
import { compose, withProps, lifecycle } from "recompose";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoBox
} from "react-google-maps";

import Messages from "../common/Messages";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";

import FormControlLabel from "@material-ui/core/FormControlLabel";

import Button from "@material-ui/core/Button";
import { addStadium } from "../../actions/stadiumAction";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAwlzhR2g7O7r4r4pwVUz-Hc60Oz4T3GqY&language=en&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidUpdate() {}
  })
)(props => (
  <GoogleMap
    defaultZoom={17}
    defaultCenter={props.defaultCenter}
    onClick={props.onClick}
  >
    {props.isMarkerShown && (
      <Marker
        position={{ lat: props.lat, lng: props.lng }}
        onClick={props.onToggleOpen}
      />
    )}
  </GoogleMap>
));

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
  input: {
    width: "100%"
  },
  input_wrap: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem"
  },
  select: {
    width: "100%",
    paddingTop: "1rem"
  },
  button: {
    display: "block",
    marginBottom: "2rem",
    padding: "1rem 5rem",
    background: "#fff",
    border: "1px solid #55a462",
    boxShadow: "none",
    "&:hover,&:active": {
      background: "#55a462"
    },

    "&:hover a,&:active": {
      color: "#fff"
    }
  },
  button_link: {
    display: "block",
    width: "100%",
    color: "#000",
    textDecoration: "none",
    transition: ".3s"
  },
  submit: {
    backgroundColor: "#43A047",
    borderRadius: 40,
    color: "#fff",
    marginBottom: "1rem"
  },
  listItem: {
    border: "1px solid rgba(0,0,0,.2)"
  },
  success: {
    backgroundColor: "#43A047"
  },
  error: {
    backgroundColor: "#ff5e5e"
  },
  mapContainer: {
    width: "100%",
    height: "calc(100vh - (3rem + 64px))",
    "& > div:last-child": {
      height: "100%"
    }
  }
});

class AddStadium extends Component {
  state = {
    open: false,
    name: "",
    title: "",
    status: false,
    defaultCenter: null
  };

  onClick = e => {
    const newStadium = {
      title: this.state.title,
      address: this.state.name,
      status: 1,
      latitude: this.state.defaultCenter.lat,
      longitude: this.state.defaultCenter.lng
    };

    this.props.addStadium(newStadium);
  };

  toggleChange = e => {
    this.setState({ [e.target.name]: !this.state[e.target.name] });
  };

  onChangeHandler = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  onSuggestSelect = place => {
    if (place) {
      const { location } = place;
      const that = this;
      let address;

      let geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        {
          location: {
            lat: parseFloat(location.lat),
            lng: parseFloat(location.lng)
          }
        },
        (results, status) => {
          if (status == "OK") {
            address = results[0].formatted_address;
            console.log("here result of geocoder", results);
            that.setState({
              ...that.state,
              name: address
            });
          }
        }
      );
      this.setState({
        ...this.state,
        defaultCenter: {
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lng)
        }
      });
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

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    }
  };

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
        <div className={classes.mapContainer}>
          <TextField
            label="Название стадиона"
            name="title"
            className={classes.input}
            value={this.state.title}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <TextField
            label="Адрес"
            name="name"
            className={classes.input}
            value={this.state.name}
            onChange={this.onChangeHandler}
            margin="normal"
          />
          <Geosuggest
            placeholder="Введите город"
            onSuggestSelect={this.onSuggestSelect}
            location={
              this.state.defaultCenter
                ? this.state.defaultCenter
                : new google.maps.LatLng(53.558572, 9.9278215)
            }
            radius={20}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="status"
                checked={this.state.status}
                classes={{ root: classes.checkbox, checked: classes.checked }}
                onChange={this.toggleChange}
              />
            }
            className={classes.input}
            label={<FormattedMessage id="subtournaments.showLabel" />}
          />
          <Button
            onClick={this.onClick}
            disabled={!this.state.name || !this.state.defaultCenter}
            className={classes.submit}
          >
            Добавить стадион
          </Button>
          {this.state.defaultCenter && (
            <MyMapComponent
              isMarkerShown
              defaultCenter={this.state.defaultCenter}
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAwlzhR2g7O7r4r4pwVUz-Hc60Oz4T3GqY&language=en&libraries=geometry,drawing,places"
              lat={this.state.defaultCenter.lat}
              lng={this.state.defaultCenter.lng}
              onClick={x => {
                const lat = x.latLng.lat();
                const lng = x.latLng.lng();
                const that = this;

                let address;

                let geocoder = new window.google.maps.Geocoder();
                geocoder.geocode(
                  { location: { lat, lng } },
                  (results, status) => {
                    if (status == "OK") {
                      address = results[0].formatted_address;
                      console.log("here result of geocoder", results);
                      that.setState({
                        ...that.state,
                        defaultCenter: { lat, lng },
                        name: address
                      });
                    }
                  }
                );
              }}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  messages: state.messages
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { addStadium }
  )
)(AddStadium);
