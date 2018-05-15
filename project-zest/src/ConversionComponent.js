import React, { Component } from "react";

class ConversionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      convertTo: "cup",
      convertFrom: "cup"
    };
    this.onConvertClick = this.onConvertClick.bind(this);
    this.changeTo = this.changeTo.bind(this);
    this.changeFrom = this.changeFrom.bind(this);
  }

  onConvertClick(e) {
    e.preventDefault();
    if (this.state.convertFrom !== "" && this.state.convertTo !== "") {
      this.props.handler(e, {
        convertTo: this.state.convertTo,
        convertFrom: this.state.convertFrom,
        alterType: "convert"
      });
    }
  }

  changeTo(e) {
    e.preventDefault();
    var newValue = document.getElementById("to-convert").value;
    this.setState({
      convertTo: newValue
    });
  }

  changeFrom(e) {
    e.preventDefault();
    var newValue = document.getElementById("from-convert").value;
    this.setState({
      convertFrom: newValue
    });
  }

  render() {
    return (
      <div id="conversion-div" className="flex-item">
        <select id="from-convert" onChange={this.changeFrom}>
          <option value="cup">cup</option>
          <option value="eigthcup"> 1/8 cup</option>
          <option value="fourthcup">1/4 cup</option>
          <option value="thirdcup">1/3 cup</option>
          <option value="halfcup">1/2 cup</option>
          <option value="gal">gallon</option>
          <option value="qt">quart</option>
          <option value="pnt">pint</option>
          <option value="fl-oz">ounce</option>
          <option value="Tbs">tablespoon</option>
          <option value="tsp">teaspoon</option>
          <option value="l">liter</option>
          <option value="ml">milliliter</option>
        </select>
        to
        <select id="to-convert" onChange={this.changeTo}>
          <option value="cup">cup</option>
          <option value="eigthcup"> 1/8 cup</option>
          <option value="fourthcup">1/4 cup</option>
          <option value="thirdcup">1/3 cup</option>
          <option value="halfcup">1/2 cup</option>
          <option value="gal">gallon</option>
          <option value="qt">quart</option>
          <option value="pnt">pint</option>
          <option value="fl-oz">ounce</option>
          <option value="Tbs">tablespoon</option>
          <option value="tsp">teaspoon</option>
          <option value="l">liter</option>
          <option value="ml">milliliter</option>
        </select>
        <button onClick={this.onConvertClick}> Convert </button>
      </div>
    );
  }
}

export default ConversionComponent;
