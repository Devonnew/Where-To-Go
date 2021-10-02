import React from "react";
import ReactMapboxGl, { Cluster, Marker, Popup } from "react-mapbox-gl";
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
    };
    this.clusterClick = this.clusterClick.bind(this);
    this.onMove = this.onMove.bind(this);
  }

  clusterClick = (coordinates, name, address) => {
    this.setState({
      coordinates,
      popup: {
        coordinates,
        name,
        address,
      },
    });
  };

  onMove = () => {
    if (this.state.popup) {
      this.setState({ popup: undefined });
    }
  };

  render() {
    const { popup } = this.state;
    return (
      <div>
        <Sidebar />
        <div className="map">
          <Map
            style="mapbox://styles/mapbox/dark-v10"
            containerStyle={{
              height: "100vh",
              width: "66vw",
            }}
            center={this.state.coordinates}
            zoom={[12]}
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
                      store.properties.address
                    )
                  }
                ></Marker>
              </div>
            ))}
            {popup && (
              <Popup coordinates={popup.coordinates}>
                <div>{this.state.popup.name}</div>
                <div>{this.state.popup.address}</div>
              </Popup>
            )}
          </Map>
        </div>
      </div>
    );
  }
}
