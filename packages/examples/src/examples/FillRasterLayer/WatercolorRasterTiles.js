import MapLibreGL from "@maplibre/maplibre-react-native";
import { Slider } from "@rneui/themed";
import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../../styles/colors";
import sheet from "../../styles/sheet";
import { SF_OFFICE_COORDINATE } from "../../utils";
import Page from "../common/Page";

const styles = StyleSheet.create({
  slider: {
    alignItems: "stretch",
    flex: 1,
    justifyContent: "center",
    maxHeight: 60,
    paddingHorizontal: 24,
  },
});

class WatercolorRasterTiles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: 1,
    };

    this.onOpacityChange = this.onOpacityChange.bind(this);
  }

  onOpacityChange(value) {
    this.setState({ opacity: value });
  }

  render() {
    const rasterSourceProps = {
      id: "stamenWatercolorSource",
      tileUrlTemplates: [
        "https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",
      ],
      tileSize: 256,
    };

    return (
      <Page>
        <MapLibreGL.MapView style={sheet.matchParent}>
          <MapLibreGL.Camera
            zoomLevel={16}
            centerCoordinate={SF_OFFICE_COORDINATE}
          />

          <MapLibreGL.RasterSource {...rasterSourceProps}>
            <MapLibreGL.RasterLayer
              id="stamenWatercolorLayer"
              sourceID="stamenWatercolorSource"
              style={{ rasterOpacity: this.state.opacity }}
            />
          </MapLibreGL.RasterSource>
        </MapLibreGL.MapView>

        <View style={styles.slider}>
          <Slider
            value={this.state.opacity}
            onValueChange={this.onOpacityChange}
            thumbTintColor={colors.primary.blue}
            thumbTouchSize={{ width: 44, height: 44 }}
            maximumTrackTintColor={colors.secondary.purpleLight}
            minimumTrackTintColor={colors.secondary.purpleDark}
          />
        </View>
      </Page>
    );
  }
}

export default WatercolorRasterTiles;
