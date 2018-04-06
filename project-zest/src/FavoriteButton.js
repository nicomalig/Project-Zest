import React, { Component } from "react";
// import * as firebase from "firebase";

class FavoriteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  render() {
    console.log(this.props.user);
    return (
      <div>
        <button
          id="favorite-button"
          label="favorite recipe"
          onClick={this.toggleFavorite}
        >
          {/* component: FavoriteButton */}
          <img
            src={require("./img/whiteHeart1.png")}
            width="20"
            height="20"
            alt="favorite button"
          />
        </button>
      </div>
    );
  }
}

export default FavoriteButton;
