import React, { Component } from "react";

import bwipjs from "bwip-js";

export default class BarcodeRmStock extends Component {
  componentDidMount(props) {
    try {
      let canvas = bwipjs.toCanvas("mycanvas", {
        bcid: "code39", // Barcode type
        text: this.props.rmId, // Text to encode
        scale: 2, // 3x scaling factor
        height: 5, // Bar height, in millimeters
        includetext: true, // Show human-readable text
        textxalign: "center" // Always good to set this
      });
    } catch (e) {
      // `e` may be a string or Error object
    }
  }
  componentDidUpdate(props) {
    try {
      let canvas = bwipjs.toCanvas("mycanvas", {
        bcid: "code39", // Barcode type
        text: this.props.rmId, // Text to encode
        scale: 2, // 3x scaling factor
        height: 5, // Bar height, in millimeters
        includetext: true, // Show human-readable text
        textxalign: "center" // Always good to set this
      });
    } catch (e) {
      // `e` may be a string or Error object
    }
  }
  render() {
    return (
      <div>
        <canvas id="mycanvas"></canvas>
      </div>
    );
  }
}
