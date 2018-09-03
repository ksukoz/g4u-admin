/*global google*/

import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import Geosuggest from "react-geosuggest";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";

import Button from "@material-ui/core/Button";

import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { TextField } from "@material-ui/core";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={props.defaultCenter}
    onClick={props.onClick}
  >
    {props.isMarkerShown && (
      <Marker position={{ lat: props.lat, lng: props.lng }} />
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
    width: "40%"
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
    name: "",
    defaultCenter: null
  };

  onSubmit(e) {
    e.preventDefault();
  }
  onChangeHandler = e => {
    this.setState({ ...this.state, name: e.target.value });
  };

  onSuggestSelect = place => {
    const { location } = place;
    this.setState({
      ...this.state,
      defaultCenter: {
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lng)
      }
    });
  };

  // onClickHandler = e => {

  // }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.mapContainer}>
        <TextField
          name="name"
          value={this.state.name}
          onChange={this.onChangeHandler}
        />
        <Geosuggest
          placeholder="Start typing!"
          onSuggestSelect={this.onSuggestSelect}
          location={
            this.state.defaultCenter
              ? this.state.defaultCenter
              : new google.maps.LatLng(53.558572, 9.9278215)
          }
          radius={20}
        />
        {this.state.defaultCenter && (
          <MyMapComponent
            isMarkerShown
            defaultCenter={this.state.defaultCenter}
            lat={this.state.defaultCenter.lat}
            lng={this.state.defaultCenter.lng}
            onClick={x => {
              const lat = x.latLng.lat();
              const lng = x.latLng.lng();

              this.setState({ ...this.state, defaultCenter: { lat, lng } });
            }}
          />
        )}
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
  // GoogleApiWrapper(
  //   props =>
  //     props.location.state
  //       ? {
  //           apiKey: props.location.state.apiKey,
  //           libraries: ["places"]
  //         }
  //       : ""
  // ),
  connect(
    mapStateToProps,
    null
  )
)(AddStadium);
