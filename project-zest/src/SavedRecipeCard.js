import React, { Component } from "react";
import './SavedRecipeCard.css'

class SavedRecipeCard extends Component {
  handleClick = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="saved-recipe-card flex-item">
        <h2 className="sav-name">{this.props.name}</h2>
        <img className="sav-img" src={this.props.image} />
        {/* <p>{this.props.link}</p> */}
      </div>
    );
  }
}

export default SavedRecipeCard;
