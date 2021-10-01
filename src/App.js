import React from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import SideBar from "./SideBar";
import { stores } from "./vibes";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGV2b25uZXciLCJhIjoiY2t0bThqZWhiMGRxNzJvbDJwazZzOWtuNCJ9.90vA89Cc_lrejzYlkLhsfw";

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lng: -73.935242,
      lat: 40.73061,
      zoom: 11.2,
    };
    this.mapContainer = React.createRef();
  }
  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [lng, lat],
      zoom: zoom,
    });
    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );

    map.on("load", () => {
      /* Add the data to your map as a layer */
      map.addLayer({
        id: "locations",
        type: "circle",
        source: {
          type: "geojson",
          data: stores,
        },
      });
    });
  }

  render() {
    return (
      <div>
        <SideBar />
        <div ref={this.mapContainer} className="map" />
      </div>
    );
  }
}
