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
    this.getUnit = this.getUnit.bind(this);
    this.getUnitValue = this.getUnitValue.bind(this);
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

  getUnitValue(unit) {
    switch (unit) {
      case "cup":
        return "cup";
      case "1/8-cup":
        return "eigthcup";
      case "1/4-cup":
        return "fourthcup";
      case "1/3-cup":
        return "thirdcup";
      case "1/2-cup":
        return "halfcup";
      case "gallon":
        return "gal";
      case "pint":
        return "pint";
      case "quart":
        return "qt";
      case "ounce":
        return "fl-oz";
      case "Tablespoon":
        return "Tbs";
      case "teaspoon":
        return "tsp";
      case "liter":
        return "l";
      case "milliliter":
        return "ml";
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
    } else if (this.props.alterType === "modify") {
      var checkboxes = document.getElementsByName("ingredient");
      var checkboxesChecked = [];
      // loop over them all
      for (var i = 0; i < checkboxes.length; i++) {
        // And stick the checked ones onto an array...
        var val = checkboxes[i].parentElement.getAttribute("value");
        if (checkboxes[i].checked) {
          checkboxesChecked.push(checkboxes[i].parentElement);
        }
      }
      this.modifyIngredients(checkboxesChecked);
    }
  }

  addIngredient() {
    var div = document.createElement("div");

    var input = document.createElement("input");
    input.type = "checkbox";
    input.name = "ingredient";
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

    if (descVal !== "") {
      div.appendChild(input);
      if (amtVal !== "") {
        var amtNode = document.createTextNode(amtVal + " ");
        amtSpan.className = "amt";
        amtSpan.appendChild(amtNode);
        div.appendChild(amtSpan);
      }
      if (unitVal !== "none") {
        var val = this.getUnit(unitVal);
        var unitNode = document.createTextNode(val + " ");
        unitSpan.appendChild(unitNode);
        unitSpan.className = "unit";
        div.appendChild(unitSpan);
        div.setAttribute("value", unitVal);
      } else if (unitVal == "none") {
        div.setAttribute("value", "none");
      }
      if (descVal !== "") {
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
      if (amt !== "NaN" || tot !== "NaN") {
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
      if (unit != undefined) {
        unit.innerHTML = this.getUnit(this.props.convertTo) + " ";
      }
      var amount = amt.innerHTML.trim();
      var a = amount.split(" ");
      var tot = 0;
      for (var k = 0; k < a.length; k++) {
        tot += eval(a[k]);
      }
      if (amount !== "NaN" || tot !== "NaN") {
        var num = tot * this.props.conversion;
        num = Math.round(num * 100) / 100;
        amt.innerHTML = num + " ";
      }
    }
  }

  modifyIngredients(checked) {
    for (var i = 0; i < checked.length; i++) {
      var p = checked[i];
      var unit;
      var amt;
      var input;
      var desc;
      var hr;
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
        if (elem.nodeName === "TEXT") {
          desc = elem;
        }
        if (elem.nodeName === "HR") {
          hr = elem;
        }
      }
      input.style.display = "none";
      amt.style.display = "none";
      unit.style.display = "none";
      desc.style.display = "none";
      hr.style.display = "none";

      var amtInput = document.createElement("input");
      amtInput.type = "number";
      if (amt.innerHTML != undefined) {
        var amount = amt.innerHTML.trim();
        var a = amount.split(" ");
        var tot = 0;
        for (var k = 0; k < a.length; k++) {
          tot += eval(a[k]);
        }
        amtInput.value = tot;
      }
      var values = [
        "none",
        "cup",
        "eigthcup",
        "fourthcup",
        "thirdcup",
        "halfcup",
        "gal",
        "qt",
        "pnt",
        "fl-oz",
        "Tbs",
        "tsp",
        "l",
        "ml"
      ];
      var innerTexts = [
        " ",
        "cup",
        "1/8 cup",
        "1/4 cup",
        "1/3 cup",
        "1/2 cup",
        "gallon",
        "quart",
        "pint",
        "ounce",
        "Tablespoon",
        "teaspoon",
        "liter",
        "milliliter"
      ];
      var unitSelect = document.createElement("select");
      var none = document.createElement("option");
      for (var op = 0; op < values.length; op++) {
        var option = document.createElement("option");
        option.value = values[op];
        option.innerHTML = innerTexts[op];
        unitSelect.appendChild(option);
      }
      if (unit.value != undefined) {
        console.log(unit);
        console.log(unit.value);
        var uVal = unit.innerHTML.trim();
        console.log(uVal);
        if (uVal.endsWith("s")) {
          uVal = uVal.substring(0, uVal.length - 1);
        }
        unitSelect.value = this.getUnitValue(uVal);
      }
      var text = document.createElement("input");
      if (desc != undefined) {
        text.value = desc.value;
      }
      var hr = document.createElement("hr");

      p.appendChild(amtInput);
      p.appendChild(unitSelect);
      p.appendChild(text);
      p.appendChild(hr);
    }
  }

  render() {
    if (this.state.servingSizeChange !== this.props.servingSizeChange) {
      this.changeServingSize();
    }
    return (
      <div>
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
          <input id="amount-input" type="number" placeholder="Quantity" />
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
            <option value="Tbs">Tablespoon</option>
            <option value="tsp">teaspoon</option>
            <option value="l">liter</option>
            <option value="ml">milliliter</option>
          </select>
          <input id="desc-input" placeholder="Ingredient" />
        </div>
      </div>
    );
  }
}

export default IngredientsList;
