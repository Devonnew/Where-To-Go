import React from "react";
import ReactMapboxGl, { Layer, Feature, GeoJSONLayer } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { stores } from "./vibes";
import Sidebar from "./SideBar";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZGV2b25uZXciLCJhIjoiY2t0bThqZWhiMGRxNzJvbDJwazZzOWtuNCJ9.90vA89Cc_lrejzYlkLhsfw",
});

const circleLayout = { visibility: "visible" };
const circlePaint = {
  "circle-color": "white",
};

const symbolLayout = {
  "text-field": "{place}",
  "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
  "text-offset": [0, 0.6],
  "text-anchor": "top",
};
const symbolPaint = {
  "text-color": "white",
};

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lng: -73.935242,
      lat: 40.73061,
      zoom: 11.2,
    };
    this.onClickCircle = this.onClickCircle.bind(this);
  }
  center = [-73.935242, 40.73061];

  onClickCircle = (evt) => {
    console.log(evt);
  };
  // componentDidMount() {
  //   const { lng, lat, zoom } = this.state;
  //   const map = new mapboxgl.Map({
  //     container: this.mapContainer.current,
  //     style: "mapbox://styles/mapbox/dark-v10",
  //     center: [lng, lat],
  //     zoom: zoom,
  //   });
  //   map.on("move", () => {
  //     this.setState({
  //       lng: map.getCenter().lng.toFixed(4),
  //       lat: map.getCenter().lat.toFixed(4),
  //       zoom: map.getZoom().toFixed(2),
  //     });
  //   });

  //   map.addControl(
  //     new mapboxgl.GeolocateControl({
  //       positionOptions: {
  //         enableHighAccuracy: true,
  //       },
  //       trackUserLocation: true,
  //       showUserHeading: true,
  //     })
  //   );

  //   map.on("load", () => {
  //     /* Add the data to your map as a layer */
  //     map.addLayer({
  //       id: "locations",
  //       type: "circle",
  //       source: {
  //         type: "geojson",
  //         data: stores,
  //       },
  //     });
  //   });
  // }

  render() {
    return (
      <div>
        <Sidebar />
        <div className="map">
          <Map
            style="mapbox://styles/mapbox/dark-v10"
            containerStyle={{
              height: "100vh",
              width: "100vw",
            }}
            center={[this.state.lng, this.state.lat]}
            zoom={[11.2]}
          >
            <GeoJSONLayer
              data={stores}
              circleLayout={circleLayout}
              circlePaint={circlePaint}
              circleOnClick={this.onClickCircle}
              symbolLayout={symbolLayout}
              symbolPaint={symbolPaint}
            />
          </Map>
        </div>
      </div>
    );
  }
}
