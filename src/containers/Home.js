import React, { Component } from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import PriceList from "../components/PriceList";

export class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <PriceList />
      </React.Fragment>
    );
  }
}
