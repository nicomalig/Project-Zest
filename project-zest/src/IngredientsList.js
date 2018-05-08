import React, { Component } from "react";

class IngredientsList extends Component {
  constructor(props) {
    super(props);
    this.convertIngredients = this.convertIngredients.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     url: nextProps.url,
  //     user: nextProps.user
  //   });
  // }

  componentDidUpdate(prevProps) {
    var checkboxes = document.getElementsByName("ingredient");
    var checkboxesChecked = [];
    // loop over them all
    for (var i = 0; i < checkboxes.length; i++) {
      // And stick the checked ones onto an array...
      if (
        checkboxes[i].checked &&
        checkboxes[i].value == this.props.convertFrom
      ) {
        checkboxesChecked.push(checkboxes[i]);
        console.log(checkboxes[i]);
      }
    }
    console.log(checkboxesChecked);
    this.convertIngredients(checkboxesChecked);
  }

  convertIngredients(checked) {
    for (var i = 0; i < checked.length; i++) {
      var p = checked[i].parentElement;
      var unit;
      var amt;
      var input;
      for (var j = 0; j < p.childNodes.length; j++) {
        var elem = p.childNodes[j];
        if (elem.type == "checkbox") {
          input = elem;
        }
        if (elem.className == "amt") {
          amt = elem;
        }
        if (elem.className == "unit") {
          unit = elem;
        }
      }
      console.log(unit);
      console.log(input);
      console.log(amt);
      console.log(input.value);
      input.value = this.props.convertTo;
      console.log(input.value);
      unit.innerHTML = this.props.convertTo + " ";
      var amount = amt.innerHTML.trim();
      var a = amount.split(" ");
      var tot = 0;
      for (var k = 0; k < a.length; k++) {
        tot += eval(a[k], 10);
      }
      if (amount != "NaN") {
        amt.innerHTML = tot * this.props.conversion + " ";
      }
      console.log("hello help me");
    }
  }

  render() {
    console.log(this.props.user);
    return (
      <div id="ingredients-list" className="flex-item">
        <form id="checkboxes">
          <div>
            <input type="checkbox" name="ingredient" value="cup" />
            <span className="amt">2 1/4 </span>
            <span className="unit">cups</span> all-purpose flour
          </div>
          <hr />
          <div>
            <input type="checkbox" name="ingredient" value="tsp" />
            <span className="amt">1 </span>
            <span className="unit">teaspoon</span> baking soda
          </div>
          <hr />
          <div>
            <input type="checkbox" name="ingredient" value="Tbs" />
            <span className="amt">12 </span>
            <span className="unit">tablespoons</span> unsalted butter, at room
            temperature
          </div>
          <hr />
          <div>
            <input type="checkbox" name="ingredient" value="cup" />
            <span className="amt">
              3/4
            </span> <span className="unit">cup</span> packed light brown sugar
          </div>
          <hr />
          <div>
            <input type="checkbox" name="ingredient" value="cup" />
            <span className="amt">
              2/3
            </span> <span className="unit">cup</span> granulated sugar
          </div>
          <hr />
          <div>
            <input type="checkbox" name="ingredient" value="none" />
            <span className="amt">2 </span> large eggs
          </div>
          <hr />
          <div>
            <input type="checkbox" name="ingredient" value="tsp" />
            <span className="amt">1 </span>
            <span className="unit">teaspoon</span> pure vanilla extract
          </div>
          <hr />
          <div>
            <input type="checkbox" name="ingredient" value="none" />
            One 12-ounce bag semisweet chocolate chips
          </div>
          <hr />
        </form>
      </div>
    );
  }
}

export default IngredientsList;
