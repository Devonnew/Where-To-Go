import React from "react";
import { stores } from "./vibes";

export default class SideBar extends React.PureComponent {
  render() {
    console.log("state", this.state);
    console.log("props", this.props);
    const { features } = stores;
    return (
      <div className="sidebar2">
        <div className="heading">
          <h1>The Vibes</h1>
        </div>
        <div id="listings" className="listings">
          {features.map((place, id) => {
            return (
              <div className="item" key={id}>
                <p
                  className="title"
                  onClick={() =>
                    this.props.clusterClick(
                      place.center,
                      place.text,
                      place.properties.address,
                      place.properties.category
                    )
                  }
                >
                  {place.text}
                </p>
                <p>{place.properties.address}</p>
                <p>{place.properties.category}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
