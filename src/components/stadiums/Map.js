import React, { Component } from "react";
import ReactDOM from "react-dom";

import Button from "@material-ui/core/Button";
export default class Map extends Component {
  state = {
    name: ""
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.latLng !== this.props.latLng) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  componentDidMount() {
    this.loadMap();
  }

  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let zoom = 14;
      let lat = 37.774929;
      let lng = -122.419416;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom
        }
      );
      this.map = new maps.Map(node, mapConfig);
    }
  }

  render() {
    return (
      // <div>
      //   {/* <div>
      //     <input
      //       type="text"
      //       name="name"
      //       value={this.state.name}
      //       onChange={this.onChangeHandler}
      //     />
      //     <Button onClick={this.onClickHandler}>Жми</Button>
      //   </div> */}
      // </div>
      <div ref="map">Loading map...</div>
    );
  }
}
