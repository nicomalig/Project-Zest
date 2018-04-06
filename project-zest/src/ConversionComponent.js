import React, { Component } from "react";

class ConversionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  render() {
    console.log(this.props.user);
    return (
      <div id="conversion-div" className="flex-item">
        <select>
          <option value="cup">cup</option>
          <option value="gallon">gallon</option>
          <option value="quart">quart</option>
          <option value="pint">pint</option>
          <option value="ounce">ounce</option>
          <option value="tablespoon">tablespoon</option>
          <option value="teaspoon">teaspoon</option>
          <option value="liter">liter</option>
          <option value="milliliter">milliliter</option>
        </select>
        to
        <select>
          <option value="cup">cup</option>
          <option value="gallon">gallon</option>
          <option value="quart">quart</option>
          <option value="pint">pint</option>
          <option value="ounce">ounce</option>
          <option value="tablespoon">tablespoon</option>
          <option value="teaspoon">teaspoon</option>
          <option value="liter">liter</option>
          <option value="milliliter">milliliter</option>
        </select>
        <button> Convert </button>
      </div>
    );
  }
}

export default ConversionComponent;
