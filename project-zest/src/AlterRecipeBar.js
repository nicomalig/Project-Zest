import React, { Component } from "react";
import ConversionComponent from "./ConversionComponent";

class AlterRecipeBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      convertFrom: "",
      convertTo: ""
    };
    this.removeIngredient = this.removeIngredient.bind(this);
    this.modifyIngredient = this.modifyIngredient.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  removeIngredient(e) {
    e.preventDefault();
  }

  modifyIngredient(e) {
    e.preventDefault();
  }

  handleChange(e, newState) {
    e.preventDefault();
    this.setState(newState);
    this.props.handler(e, newState);
  }

  render() {
    return (
      <div id="conversion-bar" className="flex-item">
        <button id="remove-button" onClick={this.removeIngredient}>
          Remove
        </button>
        <button id="modify-button" onClick={this.modifyIngredient}>
          Modify
        </button>

        {/* component: ConversionComponent */}
        <ConversionComponent handler={this.handleChange} />
      </div>
    );
  }
}

export default AlterRecipeBar;
