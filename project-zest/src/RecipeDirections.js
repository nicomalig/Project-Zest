import React, { Component } from "react";
import "./Recipe.css";

class RecipeDirections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.editDirections = this.editDirections.bind(this);
    this.doneEditing = this.doneEditing.bind(this);
    this.cancelEditing = this.cancelEditing.bind(this);
  }

  componentWillMount() {
    fetch(
      "http://api.project-zest.nicomalig.com/v1/scrape/foodnetwork?url=https://www.foodnetwork.com/recipes/alton-brown/the-chewy-recipe-1909046"
    )
      .then(results => {
        console.log(results);
      })
      .catch(err => {
        console.log(err);
      });
  }

  editDirections(e) {
    e.preventDefault();
    var parentDiv = e.target.parentElement;
    var children = parentDiv.childNodes;
    var button;
    var paragraph;
    for (var i = 0; i < children.length; i++) {
      if (children[i].classList.contains("edit-direction-button")) {
        button = children[i];
        button.style.display = "none";
      }
      if (children[i].classList.contains("direction-paragraph")) {
        paragraph = children[i];
        paragraph.style.display = "none";
      }
    }
    var textArea = document.createElement("textarea");
    textArea.className = "temp-edit";
    var doneBtn = document.createElement("button");
    doneBtn.innerHTML = "Done";
    doneBtn.className = "temp-edit";
    var cancelBtn = document.createElement("button");
    cancelBtn.innerHTML = "Cancel";
    cancelBtn.className = "temp-edit";

    if (button) {
      button.style.display = "none";
    }
    if (paragraph) {
      paragraph.style.display = "none";
      textArea.value = paragraph.innerText;
      textArea.size = paragraph.innerText.length;
      textArea.style.width = 300;
    }

    doneBtn.onclick = this.doneEditing;
    cancelBtn.onclick = this.cancelEditing;

    parentDiv.appendChild(textArea);
    parentDiv.appendChild(doneBtn);
    parentDiv.appendChild(cancelBtn);
  }

  doneEditing(e) {
    e.preventDefault();
    var parentDiv = e.target.parentElement;
    var elementsToDelete = [];
    var children = parentDiv.childNodes;
    var newText;
    var editBtn;
    var paragraph;
    for (var i = 0; i < children.length; i++) {
      if (children[i].classList.contains("temp-edit")) {
        elementsToDelete.push(children[i]);
        if (children[i].nodeName != "BUTTON") {
          newText = children[i];
        }
      }
      if (children[i].classList.contains("edit-direction-button")) {
        editBtn = children[i];
      }
      if (children[i].classList.contains("direction-paragraph")) {
        paragraph = children[i];
      }
    }
    if (newText && paragraph) {
      paragraph.innerText = newText.value;
      paragraph.style.display = "block";
    }
    if (editBtn) {
      editBtn.style.display = "block";
    }
    for (var j = 0; j < elementsToDelete.length; j++) {
      elementsToDelete[j].parentElement.removeChild(elementsToDelete[j]);
    }
  }

  cancelEditing(e) {
    e.preventDefault();
    console.log("cancel");
    var parentDiv = e.target.parentElement;
    var elementsToDelete = [];
    var children = parentDiv.childNodes;
    for (var i = 0; i < children.length; i++) {
      if (children[i].classList.contains("temp-edit")) {
        elementsToDelete.push(children[i]);
      } else if (children[i].classList.contains("edit-direction-button")) {
        children[i].style.display = "block";
      } else if (children[i].classList.contains("direction-paragraph")) {
        children[i].style.display = "block";
      }
    }
    for (var j = 0; j < elementsToDelete.length; j++) {
      elementsToDelete[j].parentElement.removeChild(elementsToDelete[j]);
    }
  }

  render() {
    return (
      <div className="directions">
        <h2>Directions</h2>
        <div id="directions-tgt">
          <div>
            <button
              className="edit-direction-button"
              onClick={this.editDirections}
            >
              pencil
            </button>
            <p className="direction-paragraph">
              Position 2 racks in the center of the oven, and preheat to 375
              degrees F. Line 2 baking sheets with parchment.
            </p>
          </div>
          <div>
            <button onClick={this.editDirections}> pencil </button>
            <p className="direction-paragraph">
              Whisk together the flour, baking soda and 1 teaspoon salt in a
              large bowl.
            </p>
          </div>
          <div>
            <button onClick={this.editDirections}> pencil </button>
            <p className="direction-paragraph">
              Beat the butter and both sugars on medium-high speed in the bowl
              of a stand mixer fitted with a paddle attachment (or in a large
              bowl if using a handheld mixer) until light and fluffy, about 4
              minutes. Add the eggs, one at time, beating after each addition to
              incorporate. Beat in the vanilla. Scrape down the side of the bowl
              as needed. Reduce the speed to medium, add the flour mixture and
              beat until just incorporated. Stir in the chocolate chips.
            </p>
          </div>
          <div>
            <button onClick={this.editDirections}> pencil </button>
            <p className="direction-paragraph">
              Scoop 12 heaping tablespoons of dough about 2 inches apart onto
              each prepared baking sheet. Roll the dough into balls with
              slightly wet hands. Bake, rotating the cookie sheets from upper to
              lower racks halfway through, until golden but still soft in the
              center, 12 to 15 minutes (the longer the cook time, the crunchier
              the cookies). Let cool for a few minutes on the baking sheet, and
              then transfer to a rack to cool completely.
            </p>
          </div>
          <div>
            <button onClick={this.editDirections}> pencil </button>
            <p className="direction-paragraph">
              Let the baking sheets cool completely, scoop the remaining dough
              onto 1 sheet and bake. Store the cookies in a tightly sealed
              container at room temperature for up to 5 days.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeDirections;
