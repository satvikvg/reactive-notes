import React, { Component } from "react";
import Home from "../../pages/home/Home";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <Home />
      </div>
    );
  }
}

export default Container;
