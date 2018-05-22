import React, { Component } from "react";

class IngredientsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servingSizeChange: 1
    };
    this.convertIngredients = this.convertIngredients.bind(this);
    this.changeServingSize = this.changeServingSize.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
  }

  getUnit(unit) {
    switch (unit) {
      case "cup":
        return "cup";
      case "eigthcup":
        return "1/8-cup";
      case "fourthcup":
        return "1/4-cup";
      case "thirdcup":
        return "1/3-cup";
      case "halfcup":
        return "1/2-cup";
      case "gal":
        return "gallon";
      case "pnt":
        return "pint";
      case "qt":
        return "quart";
      case "fl-oz":
        return "ounce";
      case "Tbs":
        return "Tablespoon";
      case "tsp":
        return "teaspoon";
      case "l":
        return "liter";
      case "ml":
        return "milliliter";
      default:
        return unit;
    }
  }

  componentDidUpdate() {
    if (this.props.alterType === "convert") {
      var checkboxes = document.getElementsByName("ingredient");
      var checkboxesChecked = [];
      // loop over them all
      for (var i = 0; i < checkboxes.length; i++) {
        // And stick the checked ones onto an array...
        var val = checkboxes[i].parentElement.getAttribute("value");
        if (checkboxes[i].checked && val === this.props.convertFrom) {
          checkboxesChecked.push(checkboxes[i].parentElement);
        }
      }
      this.convertIngredients(checkboxesChecked);
    } else if (this.props.alterType === "remove") {
      checkboxes = document.getElementsByName("ingredient");
      checkboxesChecked = [];
      for (var j = 0; j < checkboxes.length; j++) {
        if (checkboxes[j].checked) {
          checkboxesChecked.push(checkboxes[j]);
        }
      }
      for (var k = 0; k < checkboxesChecked.length; k++) {
        var del = checkboxesChecked[k];
        del.parentElement.remove(del);
      }
    }
  }

  addIngredient() {
    var div = document.createElement("div");

    var input = document.createElement("input");
    input.type = "checkbox";
    var amtSpan = document.createElement("span");
    var unitSpan = document.createElement("span");
    var text = document.createElement("text");
    var hr = document.createElement("hr");

    var amtVal = document.getElementById("amount-input").value.trim();
    var unitVal = document.getElementById("unit-select").value;
    var descVal = document.getElementById("desc-input").value.trim();

    document.getElementById("amount-input").value = "";
    document.getElementById("unit-select").value = "";
    document.getElementById("desc-input").value = "";

    if (descVal != "") {
      div.appendChild(input);
      if (amtVal != "") {
        var amtNode = document.createTextNode(amtVal + " ");
        amtSpan.appendChild(amtNode);
        div.appendChild(amtSpan);
      }
      if (unitVal != "none") {
        var val = this.getUnit(unitVal);
        var unitNode = document.createTextNode(val + " ");
        unitSpan.appendChild(unitNode);
        div.appendChild(unitSpan);
      }
      if (descVal != "") {
        var descNode = document.createTextNode(descVal);
        text.appendChild(descNode);
      }
      div.appendChild(text);
      div.appendChild(hr);
      var element = document.getElementById("checkboxes");
      element.appendChild(div);
    }
  }

  changeServingSize() {
    var amounts = document.getElementsByClassName("amt");
    for (var j = 0; j < amounts.length; j++) {
      var amount = amounts[j];
      var amt = amount.innerHTML.trim();
      var a = amt.split(" ");
      var tot = 0;
      for (var k = 0; k < a.length; k++) {
        tot += eval(a[k]);
      }
      if (amt !== "NaN" || tot != "NaN") {
        var num = tot * this.props.servingSizeChange;
        num = Math.round(num * 100) / 100;
        amount.innerHTML = num + " ";
      }
    }
    var curr = this.props.servingSizeChange;
    this.setState({
      servingSizeChange: curr
    });
  }

  convertIngredients(checked) {
    for (var i = 0; i < checked.length; i++) {
      var p = checked[i];
      var unit;
      var amt;
      var input;
      for (var j = 0; j < p.childNodes.length; j++) {
        var elem = p.childNodes[j];
        if (elem.type === "checkbox") {
          input = elem;
        }
        if (elem.className === "amt") {
          amt = elem;
        }
        if (elem.className === "unit") {
          unit = elem;
        }
      }
      checked[i].setAttribute("value", this.props.convertTo);
      unit.innerHTML = this.getUnit(this.props.convertTo) + " ";
      var amount = amt.innerHTML.trim();
      var a = amount.split(" ");
      var tot = 0;
      for (var k = 0; k < a.length; k++) {
        tot += eval(a[k]);
      }
      if (amount !== "NaN" || tot != "NaN") {
        var num = tot * this.props.conversion;
        num = Math.round(num * 100) / 100;
        amt.innerHTML = num + " ";
      }
    }
  }

  render() {
    if (this.state.servingSizeChange != this.props.servingSizeChange) {
      this.changeServingSize();
    }
    return (
      <div id="ingredients-list" className="flex-item">
        <form id="checkboxes">
          <div value="cup">
            <input type="checkbox" name="ingredient" />
            <span className="amt">2 1/4 </span>
            <span className="unit">cups </span>
            <text>all-purpose flour</text>
            <hr />
          </div>
          <div value="tsp">
            <input type="checkbox" name="ingredient" />
            <span className="amt">1 </span>
            <span className="unit">teaspoon </span>
            <text>baking soda</text>
            <hr />
          </div>
          <div value="Tbs">
            <input type="checkbox" name="ingredient" />
            <span className="amt">12 </span>
            <span className="unit">tablespoons </span>
            <text>unsalted butter, at room temperature</text>
            <hr />
          </div>
          <div value="cup">
            <input type="checkbox" name="ingredient" />
            <span className="amt">3/4 </span>
            <span className="unit">cup </span>
            <text>packed light brown sugar</text>
            <hr />
          </div>
          <div value="cup">
            <input type="checkbox" name="ingredient" />
            <span className="amt">2/3 </span>
            <span className="unit">cup </span>
            <text>granulated sugar</text>
            <hr />
          </div>
          <div value="none">
            <input type="checkbox" name="ingredient" />
            <span className="amt">2 </span>
            <text>large eggs</text>
            <hr />
          </div>
          <div value="tsp">
            <input type="checkbox" name="ingredient" />
            <span className="amt">1 </span>
            <span className="unit">teaspoon </span>
            <text>pure vanilla extract</text>
            <hr />
          </div>
          <div value="none">
            <input type="checkbox" name="ingredient" />
            <text>One 12-ounce bag semisweet chocolate chips</text>
            <hr />
          </div>
        </form>
        <div>
          <button id="add-ingredient" onClick={this.addIngredient}>
            <text> + </text>
          </button>
          <input id="amount-input" type="number" />
          <select id="unit-select">
            <option value="none"> </option>
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
        </div>
        <input id="desc-input" />
      </div>
    );
  }
}

export default IngredientsList;
