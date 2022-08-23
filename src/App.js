import React, { Component } from "react";

import axios from "axios";
import Home from "./containers/Home";
import "./styles.css";

class App extends Component {
  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}
export default App;
