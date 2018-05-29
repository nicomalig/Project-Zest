import React, { Component } from "react";

class SavedRecipeCard extends Component {
  handleClick = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="saved-recipe-card">
        <h2>{this.props.name}</h2>
        <img src={this.props.image} width="300px" />
        <p>{this.props.link}</p>
      </div>
    );
  }
}

export default SavedRecipeCard;
