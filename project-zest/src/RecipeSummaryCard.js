import React, { Component } from "react";
import FavoriteButton from "./FavoriteButton";

class RecipeSummaryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  render() {
    console.log(this.props.user);
    return (
      <div id="recipe-summary-div">
        <div id="recipe-name-bar" className="flex-row">
          <span id="recipe-name">Simple Chocolate Chip Cookie</span>
          <FavoriteButton />
        </div>
        <div id="recipe-img">
          <img
            src={require("./img/chocolateChipCookies.jpg")}
            width="400"
            height="240"
            alt="recipe"
          />
        </div>
        <div id="recipe-information">
          <p>Total: 1hr 20min</p>
          <p>Prep: 5min</p>
          <p>Inactive: 45min</p>
          <p>Cook: 30min</p>
          <hr />
          <p>Level: Easy</p>
          <hr />
          <p>Calories: 78/cookies</p>
          <hr />
          <span>
            <p>Yield: 30 cookies</p> <button> Edit </button>
          </span>
        </div>
      </div>
    );
  }
}

export default RecipeSummaryCard;
