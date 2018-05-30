import React, { Component } from "react";
import FavoriteButton from "./FavoriteButton";
import "./RecipeSummaryCard.css";

class RecipeSummaryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      recipeInformation: props.recipeInformation
    };
    this.editServingSize = this.editServingSize.bind(this);
    this.doneEditingServingSize = this.doneEditingServingSize.bind(this);
    this.updateSummary = this.updateSummary.bind(this);
  }

  editServingSize(e) {
    e.preventDefault();

    var span = document.getElementById("yield-amount-span");
    var input = document.getElementById("yield-input");
    var edit = document.getElementById("edit-button");
    var done = document.getElementById("done-button");

    if (span) {
      span.style.display = "none";
    }
    if (edit) {
      edit.style.display = "none";
    }
    if (input) {
      input.style.display = "inline";

      input.style.width = "3rem";
      input.style.width = "3em";
      input.style.marginLeft = "5px";
      input.style.marginRight = "5px";

      input.value = span.innerHTML.trim();
      input.size = span.innerHTML.length + 3;
    }
    if (done) {
      done.style.display = "inline";
    }
  }

  doneEditingServingSize(e) {
    e.preventDefault();
    var span = document.getElementById("yield-amount-span");
    var input = document.getElementById("yield-input");
    var edit = document.getElementById("edit-button");
    var done = document.getElementById("done-button");

    var before = span.innerHTML.trim();
    var after = input.value;

    var multiplier = after / before;
    multiplier = Math.round(multiplier * 100) / 100;

    this.props.recipeHandler(e, {
      servingSizeChange: multiplier,
      e: e
    });

    span.style.display = "inline";
    edit.style.display = "inline";
    input.style.display = "none";
    span.innerHTML = input.value + " ";
    done.style.display = "none";
  }

  updateSummary() {
    var nameSpan = document.getElementById("recipe-name");
    var detailsDiv = document.getElementById("recipe-information");
    while (detailsDiv.firstChild) {
      detailsDiv.removeChild(detailsDiv.firstChild);
    }

    var firstPart = false;
    var secondPart = false;
    var totalP;
    var prepP;
    var inactiveP;
    var cookP;
    var levelP;

    if (this.props.recipeInformation && this.props.recipeInformation.data) {
      var name = this.props.recipeInformation.data.name;
      var details = this.props.recipeInformation.data.details;
      if (details != null) {
        var total = details.total;
        if (total) {
          totalP = document.createElement("p");
          totalP.innerText = "Total: " + total;
          detailsDiv.appendChild(totalP);
          firstPart = true;
        }
        var prep = details.prep;
        if (prep) {
          prepP = document.createElement("p");
          prepP.innerText = "Prep: " + prep;
          detailsDiv.appendChild(prepP);
          firstPart = true;
        }
        var inactive = details.inactive;
        if (inactive) {
          inactiveP = document.createElement("p");
          inactiveP.innerText = "Inactive: " + inactive;
          detailsDiv.appendChild(inactiveP);
          firstPart = true;
        }
        var cookTime = details.cook;
        if (cookTime) {
          cookP = document.createElement("p");
          cookP.innerText = "Cook: " + cookTime;
          detailsDiv.appendChild(cookP);
          firstPart = true;
        }
        if (firstPart) {
          var hr = document.createElement("hr");
          detailsDiv.appendChild(hr);
        }
        var level = details.level;
        if (level) {
          levelP = document.createElement("p");
          levelP.innerText = level;
          detailsDiv.appendChild(levelP);
          secondPart = true;
        }
        if (secondPart) {
          var hr = document.createElement("hr");
          detailsDiv.appendChild(hr);
        }
        var servings = details.servings;
        if (servings) {
          var servingDiv = document.createElement("div");
          servingDiv.id = "yield-div";
          var servingP = document.createElement("span");
          if (!servings.amount) {
            servings.amount = 1;
          }
          if (!servings.item) {
            servings.item = "servings";
          }
          var servingText = document.createElement("text");
          var servingTextNode = document.createTextNode("Yield: ");
          servingText.appendChild(servingTextNode);

          var servingInputSwitch = document.createElement("span");

          var yieldAmountSpan = document.createElement("span");
          yieldAmountSpan.innerHTML = servings.amount + " ";
          yieldAmountSpan.id = "yield-amount-span";
          var yieldInput = document.createElement("input");
          yieldInput.hidden = "hidden";
          yieldInput.type = "number";
          yieldInput.id = "yield-input";
          servingInputSwitch.appendChild(yieldAmountSpan);
          servingInputSwitch.appendChild(yieldInput);
          servingInputSwitch.id = "inputSwitch";
          servingP.appendChild(servingText);
          servingP.appendChild(servingInputSwitch);
          var servingPTextNode = document.createTextNode(
            " " + servings.item + " "
          );
          servingP.appendChild(servingPTextNode);
          servingDiv.appendChild(servingP);

          var editBtn = document.createElement("button");
          editBtn.onclick = this.editServingSize;
          editBtn.innerText = "Edit";
          editBtn.id = "edit-button";
          servingDiv.appendChild(editBtn);

          var doneBtn = document.createElement("button");
          doneBtn.onclick = this.doneEditingServingSize;
          doneBtn.innerText = "Done";
          doneBtn.id = "done-button";
          doneBtn.hidden = "hidden";
          servingDiv.appendChild(doneBtn);
          detailsDiv.appendChild(servingDiv);
        }

        var imgElement = document.getElementById("recipe-img-element");
        var img = this.props.recipeInformation.data.img;
        if (img && img != "") {
          imgElement.setAttribute("src", img);
        } else {
          imgElement.setAttribute("src", require("./img/defaultImage.png"));
        }
        nameSpan.innerHTML = name;
      } else {
        var div = document.createElement("div");
        var p = document.createElement("p");
        p.innerText = "Could not find directions for this recipe";
        div.appendChild(p);
        // details.appendChild(div);
      }
      this.setState({ recipeInformation: this.props.recipeInformation });
    }
  }

  render() {
    if (
      this.props.recipeInformation != {} &&
      this.props.recipeInformation != this.state.recipeInformation
    ) {
      this.updateSummary();
    }
    return (
      <div className="rs-card" /* id="recipe-summary-div" */>
        <div id="recipe-name-bar">
          <span id="recipe-name" />
          <FavoriteButton
            url={this.props.url}
            user={this.props.user}
            handler={this.props.handler}
            recipeHandler={this.props.recipeHandler}
            recipeInformation={this.props.recipeInformation}
          />
        </div>
        <div id="recipe-img">
          <img
            id="recipe-img-element"
            src={require("./img/defaultImage.png")}
            width="400"
            height="240"
            alt="recipe"
          />
        </div>
        <div id="recipe-information" />
      </div>
    );
  }
}

export default RecipeSummaryCard;
