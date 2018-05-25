import React, { Component } from "react";
import FavoriteButton from "./FavoriteButton";
import "./RecipeSummaryCard.css";

class RecipeSummaryCard extends Component {
  constructor(props) {
    super(props);
    this.editServingSize = this.editServingSize.bind(this);
    this.doneEditingServingSize = this.doneEditingServingSize.bind(this);
  }

  editServingSize(e) {
    e.preventDefault();

    var span = document.getElementById("yield-span");
    var input = document.getElementById("yield-input");
    var edit = document.getElementById("edit-button");
    var done = document.getElementById("done-button");

    span.style.display = "none";
    edit.style.display = "none";
    input.style.display = "inline";

    input.style.width = "3rem";
    input.style.width = "3em";
    input.style.marginLeft = "5px";
    input.style.marginRight = "5px";

    input.value = span.innerHTML.trim();
    input.size = span.innerHTML.length + 3;
    done.style.display = "inline";
  }

  doneEditingServingSize(e) {
    e.preventDefault();
    var span = document.getElementById("yield-span");
    var input = document.getElementById("yield-input");
    var edit = document.getElementById("edit-button");
    var done = document.getElementById("done-button");

    var before = span.innerHTML.trim();
    var after = input.value;

    var multiplier = after / before;
    multiplier = Math.round(multiplier * 100) / 100;

    this.props.recipeHandler(e, {
      servingSizeChange: multiplier
    });

    span.style.display = "inline";
    edit.style.display = "inline";
    input.style.display = "none";
    span.innerHTML = input.value + " ";
    done.style.display = "none";
  }

  render() {
    return (
      <div className="rs-card" /* id="recipe-summary-div" */>
        <div id="recipe-name-bar">
          <span id="recipe-name">Cookies</span>
          <FavoriteButton
            url={this.props.url}
            user={this.props.user}
            handler={this.props.handler}
          />
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
          <span>
            <p>
              <text>Yield: </text>
              <span id="inputSwitch">
                <span id="yield-span">30 </span>
                <input id="yield-input" hidden="hidden" type="number" />
              </span>
              cookies
            </p>
            <button id="edit-button" onClick={this.editServingSize}>
              Edit
            </button>
            <button
              id="done-button"
              onClick={this.doneEditingServingSize}
              hidden="hidden"
            >
              Done
            </button>
          </span>
        </div>
      </div>
    );
  }
}

export default RecipeSummaryCard;
