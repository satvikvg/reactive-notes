import React, { Component } from "react";
import MainActionBar from "../../../containers/views/actionbar/MainActionBar";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <MainActionBar />;
  }
}

export default Header;
