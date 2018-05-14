import React, { Component } from "react";

class SavedRecipeCard extends Component {
  handleClick = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="saved-recipe-card">
        <h2>{this.props.name}</h2>
        <p>{this.props.image}</p>
        <p>{this.props.link}</p>
      </div>
    );
  }
}

export default SavedRecipeCard;
