import React, { Component } from "react";

import bwipjs from "bwip-js";

export default class BarcodeProductBase extends Component {
  componentDidMount(props) {
    try {
      let canvas = bwipjs.toCanvas(this.props.productId, {
        bcid: "code39", // Barcode type
        text: this.props.productId, // Text to encode
        scale: 1, // 3x scaling factor
        height: 8, // Bar height, in millimeters
        includetext: true, // Show human-readable text
        textxalign: "center" // Always good to set this
      });
    } catch (e) {
      // `e` may be a string or Error object
    }
  }
  componentDidUpdate(props) {
    try {
      let canvas = bwipjs.toCanvas(this.props.productId, {
        bcid: "code39", // Barcode type
        text: this.props.productId, // Text to encode
        scale: 1, // 3x scaling factor
        height: 8, // Bar height, in millimeters
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
        <canvas id={this.props.productId}></canvas>
      </div>
    );
  }
}
