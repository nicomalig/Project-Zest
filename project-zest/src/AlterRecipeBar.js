import React, { Component } from "react";
import ConversionComponent from "./ConversionComponent";
import "./Recipe.css";

class AlterRecipeBar extends Component {
  constructor(props) {
    super(props);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.modifyIngredient = this.modifyIngredient.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  removeIngredient(e) {
    e.preventDefault();
    this.props.handler(e, {
      alterType: "remove",
      e: e
    });
  }

  modifyIngredient(e) {
    e.preventDefault();
    this.props.handler(e, {
      alterType: "modify",
      e: e
    });
  }

  handleChange(e, newState) {
    e.preventDefault();
    this.props.handler(e, newState);
  }

  render() {
    return (
      <div className="conversion-bar">
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
