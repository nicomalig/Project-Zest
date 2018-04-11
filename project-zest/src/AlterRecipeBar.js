import React, { Component } from "react";
import ConversionComponent from "./ConversionComponent";

class AlterRecipeBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  render() {
    console.log(this.props.user);
    return (
      <div id="conversion-bar" className="flex-item">
        <button> Remove </button>
        <button> Modify </button>

        {/* component: ConversionComponent */}
        <ConversionComponent />
      </div>
    );
  }
}

export default AlterRecipeBar;
