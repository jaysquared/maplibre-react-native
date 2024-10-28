import MapLibreGL from "@maplibre/maplibre-react-native";
import React from "react";

import sheet from "../../styles/sheet";
import { SF_OFFICE_COORDINATE } from "../../utils";
import Page from "../common/Page";

class YoYo extends React.Component {
  timeout = null;

  constructor(props) {
    super(props);

    this.state = {
      zoomLevel: 2,
    };
  }

  componentDidMount() {
    this.cameraLoop();
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  cameraLoop() {
    requestAnimationFrame(async () => {
      this.setState((prevState) => ({
        zoomLevel: prevState.zoomLevel === 6 ? 2 : 6,
      }));
      this.timeout = setTimeout(() => this.cameraLoop(), 2000);
    });
  }

  render() {
    return (
      <Page>
        <MapLibreGL.MapView
          ref={(ref) => (this.map = ref)}
          style={sheet.matchParent}
          styleURL={MapLibreGL.StyleURL.Default}
        >
          <MapLibreGL.Camera
            zoomLevel={this.state.zoomLevel}
            centerCoordinate={SF_OFFICE_COORDINATE}
          />
        </MapLibreGL.MapView>
      </Page>
    );
  }
}

export default YoYo;