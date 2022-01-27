import React from "react";
import ReactMapboxGl, { Marker, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { stores } from "./vibes";
import Sidebar from "./SideBar";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZGV2b25uZXciLCJhIjoiY2t0bThqZWhiMGRxNzJvbDJwazZzOWtuNCJ9.90vA89Cc_lrejzYlkLhsfw",
});
const styles = {
  marker: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: "#84C318",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #C9C9C9",
  },
};

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: [-73.96633010809775, 40.7814433547441],
      popup: undefined,
      zoom: 12,
    };
    this.clusterClick = this.clusterClick.bind(this);
    this.onMove = this.onMove.bind(this);
    this.zoomedIn = this.zoomedIn.bind(this);
  }

  clusterClick = (coordinates, name, address, tags) => {
    this.setState({
      coordinates,
      popup: {
        coordinates,
        name,
        address,
        tags,
      },
      zoom: 15,
    });
    console.log("clicked!");
  };

  onMove = () => {
    if (this.state.popup) {
      this.setState({ popup: undefined, zoom: 12 });
    }
  };

  zoomedIn = () => {
    if (this.state.popup.zoom) {
      return this.state.popup.zoom;
    } else {
      return 12;
    }
  };

  findRoute = (lat, lng) => {
    const response = `https://transit.router.hereapi.com/v8/routes?origin=${lat},${lng}&destination=${lat},${lng}`;
  };

  render() {
    const { popup, zoom } = this.state;
    return (
      <div>
        <Sidebar clusterClick={this.clusterClick} />
        <div className="map">
          <Map
            style="mapbox://styles/mapbox/dark-v10"
            containerStyle={{
              height: "100vh",
              width: "66vw",
            }}
            center={this.state.coordinates}
            zoom={[zoom]}
            onClick={this.onMove}
          >
            {stores.features.map((store, key) => (
              <div>
                <Marker
                  key={key}
                  style={styles.marker}
                  coordinates={store.geometry.coordinates}
                  data-feature={store}
                  onClick={() =>
                    this.clusterClick(
                      store.geometry.coordinates,
                      store.text,
                      store.properties.address,
                      store.properties.category
                    )
                  }
                ></Marker>
              </div>
            ))}
            {popup && (
              <Popup coordinates={popup.coordinates}>
                <div>{this.state.popup.name}</div>
                <div>{this.state.popup.address}</div>
                <div>{this.state.popup.tags}</div>
              </Popup>
            )}
          </Map>
        </div>
      </div>
    );
  }
}
