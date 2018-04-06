import React, { Component } from "react";
import ConversionComponent from "./ConversionComponent";

class IngredientsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  render() {
    console.log(this.props.user);
    return (
      <div id="ingredients-list" className="flex-item">
        <ul>
          <li>
            <span>2 1/4</span> <span>cups</span> all-purpose flour
          </li>
          <li>
            <span>1</span> <span>teaspoon</span> baking soda
          </li>
          <li>Fine salt</li>
          <li>
            <span>1 1/2</span> sticks (12 tablespoons) unsalted butter, at room
            temperature
          </li>
          <li>
            <span>3/4</span> <span>cup</span> packed light brown sugar
          </li>
          <li>
            <span>2/3</span> <span>cup</span> granulated sugar
          </li>
          <li>
            <span>2</span> large eggs
          </li>
          <li>
            <span>1</span> <span>teaspoon</span> pure vanilla extract
          </li>
          <li>One 12-ounce bag semisweet chocolate chips</li>
        </ul>
      </div>
    );
  }
}

export default IngredientsList;
