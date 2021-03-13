import React, { Component } from "react";

import bwipjs from "bwip-js";

export default class BarcodeProduct extends Component {
  componentDidMount(props) {
    try {
      let canvas = bwipjs.toCanvas("mycanvas", {
        bcid: "code39", // Barcode type
        text: this.props.productId, // Text to encode
        scale: 3, // 3x scaling factor
        height: 10, // Bar height, in millimeters
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
        text: this.props.productId, // Text to encode
        scale: 3, // 3x scaling factor
        height: 10, // Bar height, in millimeters
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
