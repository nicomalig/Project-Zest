import React, { Component } from "react";
import "./Recipe.css";

class RecipeDirections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      recipeInformation: props.recipeInformation,
      directions: []
    };
    this.editDirections = this.editDirections.bind(this);
    this.doneEditing = this.doneEditing.bind(this);
    this.cancelEditing = this.cancelEditing.bind(this);
    this.updateDirections = this.updateDirections.bind(this);
  }

  editDirections(e) {
    e.preventDefault();
    var parentDiv = e.target.parentElement;
    var children = parentDiv.childNodes;
    var button;
    var paragraph;
    for (var i = 0; i < children.length; i++) {
      if (
        children[i].classList.contains("edit-direction-button") ||
        children[i].className === "edit-direction-button"
      ) {
        button = children[i];
        button.style.display = "none";
      }
      if (
        children[i].classList.contains("direction-paragraph") ||
        children[i].className === "direction-paragraph"
      ) {
        paragraph = children[i];
        paragraph.style.display = "none";
      }
    }
    for (var i = 0; i < children.length; i++) {
      if (
        children[i].classList.contains("edit-direction-button") ||
        children[i].className === "edit-direction-button"
      ) {
        button = children[i];
        button.style.display = "none";
      }
      if (
        children[i].classList.contains("direction-paragraph") ||
        children[i].className === "direction-paragraph"
      ) {
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
    var updateState = false;
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
    var oldTxt = paragraph.innerHTML;
    var dirIndex = this.state.directions.indexOf(oldTxt);
    var directions = this.state.directions;
    if (newText && paragraph) {
      if (newText.value.trim() == "") {
        elementsToDelete.push(paragraph);
        if (dirIndex > -1) {
          directions.splice(dirIndex, 1);
          updateState = true;
        }
      } else {
        paragraph.innerText = newText.value;
        if (dirIndex > -1) {
          directions[dirIndex] = newText.value;
          updateState = true;
        }
        paragraph.style.display = "block";
      }
    }
    if (newText && editBtn) {
      if (newText.value.trim() == "") {
        elementsToDelete.push(editBtn);
      } else {
        editBtn.style.display = "block";
      }
    }
    for (var j = 0; j < elementsToDelete.length; j++) {
      elementsToDelete[j].parentElement.removeChild(elementsToDelete[j]);
    }

    if (updateState) {
      updateState = false;
      var tempRec = this.state.recipeInformation;
      tempRec.data.directions = directions;
      this.setState({
        directions: directions
      });
      this.props.handler(e, {
        recipeInformation: tempRec
      });
    }
  }

  cancelEditing(e) {
    e.preventDefault();
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

  updateDirections() {
    var directionDiv = document.getElementById("directions-tgt");
    while (directionDiv.firstChild) {
      directionDiv.removeChild(directionDiv.firstChild);
    }
    var directions = this.props.recipeInformation.data.directions;
    if (directions != null) {
      for (var i = 0; i < directions.length; i++) {
        var div = document.createElement("div");
        var button = document.createElement("button");
        var p = document.createElement("p");

        button.onclick = this.editDirections;
        button.className = "edit-direction-button";
        button.innerHTML = "pencil";

        p.className = "direction-paragraph";
        p.innerText = directions[i];

        div.appendChild(button);
        div.appendChild(p);

        directionDiv.appendChild(div);
      }
    } else {
      var div = document.createElement("div");
      var p = document.createElement("p");
      p.innerText = "Could not find directions for this recipe";
      div.appendChild(p);
      directionDiv.appendChild(div);
    }
    this.setState({
      recipeInformation: this.props.recipeInformation,
      directions: directions
    });
  }

  render() {
    if (this.props.recipeInformation != this.state.recipeInformation) {
      this.updateDirections();
    }
    return (
      <div className="directions">
        <h2>Directions</h2>
        <div id="directions-tgt" />
      </div>
    );
  }
}

export default RecipeDirections;
