import React, { Component } from "react";

class IngredientsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servingSizeChange: 1,
      recipeInformation: props.recipeInformation,
      ingredients: []
    };
    this.convertIngredients = this.convertIngredients.bind(this);
    this.changeServingSize = this.changeServingSize.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.getUnit = this.getUnit.bind(this);
    this.getUnitValue = this.getUnitValue.bind(this);
    this.doneModifying = this.doneModifying.bind(this);
    this.cancelModifying = this.cancelModifying.bind(this);
    this.updateIngredients = this.updateIngredients.bind(this);
    this.removeIngredients = this.removeIngredients.bind(this);
    this.convertUnitsIngredients = this.convertUnitsIngredients.bind(this);
  }

  getUnit(unit) {
    switch (unit) {
      case "cup":
        return "cup";
      case "eighthcup":
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
    switch (unit.toLowerCase()) {
      case "cup":
        return "cup";
      case "1/8-cup":
        return "eighthcup";
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
      case "tablespoon":
        return "Tbs";
      case "teaspoon":
        return "tsp";
      case "liter":
        return "l";
      case "milliliter":
        return "ml";
      default:
        return "none";
    }
  }

  componentDidUpdate() {
    if (this.props.alterType === "convert") {
      this.convertUnitsIngredients();
    } else if (this.props.alterType === "remove") {
      this.removeIngredients();
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

  convertUnitsIngredients() {
    var ingredients = this.state.ingredients;
    var checkboxes = document.getElementsByName("ingredient");
    var checkboxesChecked = [];
    var indexes = [];
    for (var i = 0; i < checkboxes.length; i++) {
      var val = checkboxes[i].parentElement.getAttribute("value");
      if (checkboxes[i].checked && val === this.props.convertFrom) {
        checkboxesChecked.push(checkboxes[i].parentElement);
        indexes.push(i);
      }
    }
    this.convertIngredients(checkboxesChecked);
    var updateState = false;
    for (var h = 0; h < indexes.length; h++) {
      var index = indexes[h];
      var ingr = ingredients[index];
      if (ingr.amount) {
        var amount = ingr.amount + "";
        amount = amount.trim();
        var a = amount.split(" ");
        var tot = 0;
        for (var k = 0; k < a.length; k++) {
          tot += eval(a[k]);
        }
        if (amount !== "NaN" || tot !== "NaN") {
          var num = tot * this.props.conversion;
          num = Math.round(num * 100) / 100;
          ingr.amount = num;
          ingredients[index] = ingr;
          updateState = true;
        }
      }
      if (ingr.unit) {
        ingr.unit = this.getUnit(this.props.convertTo);
        ingredients[index] = ingr;
      }
    }
    if (updateState) {
      updateState = false;
      var tempRec = this.state.recipeInformation;
      tempRec.data.ingredients = ingredients;
      this.setState({
        ingredients: ingredients
      });
      this.props.handler(this.props.e, {
        recipeInformation: tempRec
      });
    }
  }

  removeIngredients() {
    var ingredients = this.state.ingredients;
    var checkboxes = document.getElementsByName("ingredient");
    var checkboxesChecked = [];
    var indexes = [];
    for (var j = 0; j < checkboxes.length; j++) {
      if (checkboxes[j].checked) {
        checkboxesChecked.push(checkboxes[j]);
        indexes.push(j);
      }
    }
    var updateState = false;
    for (var h = indexes.length - 1; h >= 0; h--) {
      ingredients.splice(ingredients[indexes[h]], 1);
      updateState = true;
    }
    for (var k = 0; k < checkboxesChecked.length; k++) {
      var del = checkboxesChecked[k];
      del.parentElement.remove(del);
    }
    if (updateState) {
      updateState = false;
      var tempRec = this.state.recipeInformation;
      tempRec.data.ingredients = ingredients;
      this.setState({
        ingredients: ingredients
      });
      this.props.handler(this.props.e, {
        recipeInformation: tempRec
      });
    }
  }

  addIngredient(e) {
    e.preventDefault();
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

    var ingrObj = {
      amount: null,
      unit: null,
      item: ""
    };

    if (descVal !== "") {
      div.appendChild(input);
      if (amtVal !== "") {
        var amtNode = document.createTextNode(amtVal + " ");
        ingrObj.amount = amtVal + "";
        amtSpan.className = "amt";
        amtSpan.appendChild(amtNode);
        div.appendChild(amtSpan);
      }
      if (unitVal !== "none") {
        var val = this.getUnit(unitVal);
        var unitNode = document.createTextNode(val + " ");
        ingrObj.unit = val + "";
        unitSpan.appendChild(unitNode);
        unitSpan.className = "unit";
        div.appendChild(unitSpan);
        div.setAttribute("value", unitVal);
      } else if (unitVal === "none") {
        div.setAttribute("value", "none");
      }
      if (descVal !== "") {
        var descNode = document.createTextNode(descVal);
        ingrObj.item = descVal + "";
        text.appendChild(descNode);
      }
      text.className = "text";
      div.appendChild(text);
      div.appendChild(hr);
      var element = document.getElementById("checkboxes-form");
      element.appendChild(div);

      var ingredients = this.state.ingredients;
      ingredients.push(ingrObj);
      var tempRec = this.state.recipeInformation;
      tempRec.data.ingredients = ingredients;

      this.setState({
        ingredients: ingredients
      });
      this.props.handler(e, { recipeInformation: tempRec, e: e });
    }
  }

  changeServingSize() {
    var ingredients = this.state.ingredients;
    var amounts = document.getElementsByClassName("amt");
    var updateState = false;
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

    for (var i = 0; i < ingredients.length; i++) {
      var ingr = ingredients[i];
      var amt = ingr.amount + "";
      amt = amt.trim();
      var a = amt.split(" ");
      var tot = 0;
      for (var k = 0; k < a.length; k++) {
        tot += eval(a[k]);
      }
      if (amt !== "NaN" || tot !== "NaN") {
        var num = tot * this.props.servingSizeChange;
        num = Math.round(num * 100) / 100;
        ingr.amount = num;
        ingredients[i] = ingr;
        updateState = true;
      }
    }
    if (updateState) {
      updateState = false;
      var tempRec = this.state.recipeInformation;
      tempRec.data.ingredients = ingredients;
      this.setState({
        ingredients: ingredients
      });
      this.props.handler(this.props.e, {
        recipeInformation: tempRec
      });
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
      if (unit !== undefined) {
        unit.innerHTML = this.getUnit(this.props.convertTo) + " ";
      }
      if (amt) {
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
      input.checked = false;
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
          input.checked = false;
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
      if (input) {
        input.style.display = "none";
      }
      if (amt) {
        amt.style.display = "none";
      }
      if (unit) {
        unit.style.display = "none";
      }
      if (desc) {
        desc.style.display = "none";
      }
      if (hr) {
        hr.parentElement.removeChild(hr);
      }

      //creating input for amounts
      var amtInput = document.createElement("input");
      amtInput.className = "temp-mod temp-amt";
      amtInput.type = "number";
      if (amt && amt.innerHTML !== undefined) {
        var amount = amt.innerHTML.trim();
        var a = amount.split(" ");
        var tot = 0;
        for (var k = 0; k < a.length; k++) {
          tot += eval(a[k]);
        }
        amtInput.value = tot;
      }

      //creating selection for units
      var values = [
        "none",
        "cup",
        "eighthcup",
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
      for (var op = 0; op < values.length; op++) {
        var option = document.createElement("option");
        option.value = values[op];
        option.innerHTML = innerTexts[op];
        unitSelect.appendChild(option);
      }
      unitSelect.className = "temp-mod temp-unit";
      if (unit && unit.innerHTML !== undefined) {
        var uVal = unit.innerHTML.trim();
        if (uVal.endsWith("s")) {
          uVal = uVal.substring(0, uVal.length - 1);
        }

        unitSelect.value = this.getUnitValue(uVal);
      }

      //creating input for description of ingredient
      var text = document.createElement("input");
      text.className = "temp-mod temp-text";
      if (desc && desc.innerHTML !== undefined) {
        text.value = desc.innerHTML;
      }

      var newHR = document.createElement("hr");

      //creating buttons for finishing modifying
      var doneBtn = document.createElement("button");
      doneBtn.innerHTML = "Done";
      doneBtn.className = "temp-mod";
      doneBtn.onclick = this.doneModifying;
      var cancelBtn = document.createElement("button");
      cancelBtn.className = "temp-mod";
      cancelBtn.innerHTML = "Cancel";
      cancelBtn.onclick = this.cancelModifying;

      //adding new elements to div
      p.appendChild(amtInput);
      p.appendChild(unitSelect);
      p.appendChild(text);
      p.appendChild(doneBtn);
      p.appendChild(cancelBtn);
      p.appendChild(newHR);
    }
  }

  cancelModifying(e) {
    e.preventDefault();
    var children = e.target.parentElement.childNodes;
    var elementsToDelete = [];
    for (var j = 0; j < children.length; j++) {
      if (children[j].classList.contains("temp-mod")) {
        children[j].style.display = "none";
        elementsToDelete.push(children[j]);
      }
    }
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      if (
        child.classList.contains("unit") ||
        child.classList.contains("amt") ||
        child.classList.contains("text") ||
        (child.name === "ingredient" && child.type === "checkbox")
      ) {
        if (child.type === "checkbox") {
          child.checked = false;
        }
        child.style.display = "inline";
      }
    }
    for (j = 0; j < elementsToDelete.length; j++) {
      elementsToDelete[j].parentElement.removeChild(elementsToDelete[j]);
    }
  }

  doneModifying(e) {
    e.preventDefault();
    var children = e.target.parentElement.childNodes;
    var newAmt;
    var newUnit;
    var newText;
    var elementsToDelete = [];
    var updateState = false;

    var ingredients = this.props.recipeInformation.data.ingredients;

    for (var j = 0; j < children.length; j++) {
      if (children[j].classList.contains("temp-mod")) {
        children[j].style.display = "none";
        elementsToDelete.push(children[j]);
      }
    }
    for (var k = 0; k < children.length; k++) {
      if (children[k].classList.contains("temp-amt")) {
        newAmt = children[k].value;
      }
      if (children[k].classList.contains("temp-unit")) {
        newUnit = children[k].value;
      }
      if (children[k].classList.contains("temp-text")) {
        newText = children[k].value;
      }
    }
    var hasAmt = false;
    var hasUnit = false;

    var oldAmt;
    var oldUnit;
    var oldText;

    var indexIngrObj = {
      amount: null,
      unit: null,
      item: ""
    };

    var ingrObj = {
      amount: null,
      unit: null,
      item: ""
    };

    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      if (child.classList.contains("amt") && newAmt && newAmt.trim() !== "") {
        hasAmt = true;
        oldAmt = child;
        indexIngrObj.amount = child.innerHTML.trim();
        ingrObj.amount = newAmt.trim();
        child.innerHTML = newAmt + " ";
      }
      if (
        child.classList.contains("unit") &&
        newUnit &&
        newUnit.trim() !== ""
      ) {
        hasUnit = true;
        oldUnit = child;
        indexIngrObj.unit = child.innerHTML.trim();
        var unitHtml = this.getUnit(newUnit);
        if (unitHtml != "none") {
          ingrObj.unit = this.getUnit(newUnit);
          child.innerHTML = this.getUnit(newUnit) + " ";
        } else {
          child.innerHTML = "";
        }
        e.target.parentElement.setAttribute("value", newUnit);
      }
      if (
        child.classList.contains("text") &&
        newText &&
        newText.trim() !== ""
      ) {
        oldText = child;
        ingrObj.item = newText.trim();
        indexIngrObj.item = child.innerHTML.trim();
        child.innerHTML = newText + " ";
      }
      if (
        child.classList.contains("unit") ||
        child.classList.contains("amt") ||
        child.classList.contains("text") ||
        (child.name === "ingredient" && child.type === "checkbox")
      ) {
        if (child.type === "checkbox") {
          child.checked = false;
        }
        child.style.display = "inline";
      }
    }

    if (!hasAmt && !hasUnit) {
      if (newAmt) {
        oldAmt = document.createElement("span");
        var amtNode = document.createTextNode(newAmt + " ");
        ingrObj.amount = newAmt.trim() + "";
        // updateState = true;
        oldAmt.className = "amt";
        oldAmt.appendChild(amtNode);
        e.target.parentElement.insertBefore(oldAmt, oldText);
      }
      if (newUnit) {
        if (newUnit !== "none") {
          oldUnit = document.createElement("span");
          var val = this.getUnit(newUnit);
          var unitNode = document.createTextNode(val + " ");
          ingrObj.unit = val.trim() + "";
          // updateState = true;
          oldUnit.appendChild(unitNode);
          oldUnit.className = "unit";
          e.target.parentElement.insertBefore(oldUnit, oldText);
          e.target.parentElement.setAttribute("value", newUnit);
        }
      }
    } else if (!hasAmt && hasUnit) {
      if (newAmt) {
        oldAmt = document.createElement("span");
        amtNode = document.createTextNode(newAmt + " ");
        ingrObj.amount = newAmt.trim() + "";
        // updateState = true;
        oldAmt.className = "amt";
        oldAmt.appendChild(amtNode);
        e.target.parentElement.insertBefore(oldAmt, oldUnit);
      }
    } else if (hasAmt && !hasUnit) {
      if (newUnit !== "none") {
        oldUnit = document.createElement("span");
        val = this.getUnit(newUnit);
        unitNode = document.createTextNode(val + " ");
        ingrObj.unit = val.trim() + "";
        // updateState = true;
        oldUnit.appendChild(unitNode);
        oldUnit.className = "unit";
        e.target.parentElement.insertBefore(oldUnit, oldText);
        e.target.parentElement.setAttribute("value", newUnit);
      }
    }
    var ingrIndex;
    for (var h = 0; h < ingredients.length; h++) {
      var obj = ingredients[h];
      if (
        obj.amount == indexIngrObj.amount &&
        obj.unit == indexIngrObj.unit &&
        obj.item == indexIngrObj.item
      ) {
        ingrIndex = h;
        updateState = true;
      }
    }
    for (j = 0; j < elementsToDelete.length; j++) {
      elementsToDelete[j].parentElement.removeChild(elementsToDelete[j]);
    }

    if (updateState) {
      updateState = false;
      ingredients[ingrIndex] = ingrObj;
      var tempRec = this.state.recipeInformation;
      tempRec.data.ingredients = ingredients;
      this.setState({
        ingredients: ingredients
      });
      this.props.handler(e, {
        recipeInformation: tempRec,
        e: e
      });
    }
  }

  updateIngredients() {
    var ingrDiv = document.getElementById("cingredients-main-div");
    var ingrForm = document.getElementById("checkboxes-form");
    while (ingrForm.firstChild) {
      ingrForm.removeChild(ingrForm.firstChild);
    }
    if (this.props.recipeInformation && this.props.recipeInformation.data) {
      var ingredients = this.props.recipeInformation.data.ingredients;
      if (ingredients != null) {
        for (var i = 0; i < ingredients.length; i++) {
          var ingr = ingredients[i];
          var div = document.createElement("div");
          var input = document.createElement("input");
          var amtSpan = document.createElement("span");
          var unitSpan = document.createElement("span");
          var text = document.createElement("text");
          var hr = document.createElement("hr");

          input.type = "checkbox";
          input.name = "ingredient";
          div.appendChild(input);

          if (ingr.amount) {
            amtSpan.className = "amt";
            amtSpan.innerHTML = ingr.amount + " ";
            div.appendChild(amtSpan);
          }

          if (ingr.unit) {
            unitSpan.className = "unit";
            var unit = ingr.unit.trim();
            if (unit != "none") {
              unitSpan.innerHTML = unit + " ";
            }
            if (unit.endsWith("s")) {
              unit = unit.substring(0, unit.length - 1);
            }
            div.setAttribute("value", this.getUnitValue(unit));
            div.appendChild(unitSpan);
          }

          if (ingr.item) {
            text.className = "text";
            text.innerHTML = ingr.item;
            div.appendChild(text);
          }
          div.appendChild(hr);

          ingrForm.appendChild(div);
        }
      } else {
        var div = document.createElement("div");
        var p = document.createElement("p");
        p.innerText = "Could not find ingredients for this recipe";
        div.appendChild(p);
        ingrForm.appendChild(div);
      }
      this.setState({
        recipeInformation: this.props.recipeInformation,
        ingredients: ingredients
      });
    }
  }

  render() {
    if (this.state.servingSizeChange !== this.props.servingSizeChange) {
      this.changeServingSize();
    }
    if (
      this.props.recipeInformation != {} &&
      this.props.recipeInformation != this.state.recipeInformation
    ) {
      this.updateIngredients();
    }
    return (
      <div id="ingredients-main-div">
        <form id="checkboxes-form">
          {/* <div value="cup">
            <input type="checkbox" name="ingredient" />
            <span className="amt">2 1/4 </span>
            <span className="unit">cups </span>
            <text className="text">all-purpose flour</text>
            <hr />
          </div>
          <div value="none">
            <input type="checkbox" name="ingredient" />
            <span className="amt">2 </span>
            <text className="text">large eggs</text>
            <hr />
          </div>
          <div value="none">
            <input type="checkbox" name="ingredient" />
            <text className="text">
              One 12-ounce bag semisweet chocolate chips
            </text>
            <hr />
          </div> */}
        </form>
        <div id="add-new-ingredient-div">
          <button id="add-ingredient" onClick={this.addIngredient}>
            <text> + </text>
          </button>
          <input id="amount-input" type="number" placeholder="Quantity" />
          <select id="unit-select">
            <option value="none"> </option>
            <option value="cup">cup</option>
            <option value="eighthcup"> 1/8 cup</option>
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
