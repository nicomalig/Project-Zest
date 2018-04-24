import React, { Component } from "react";
import { firebase, database } from "./FirebaseConfig";
// import * as firebase from "firebase";

class FavoriteButton extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   url: this.props.url
    // };
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.canAddLink = this.canAddLink.bind(this);
    console.log("HELLO HELLO HELLO");
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     url: nextProps.url,
  //     user: nextProps.user
  //   });
  //   console.log(this.props.url);
  // }

  toggleFavorite(e) {
    e.preventDefault();
    let currentUser = firebase.auth().currentUser;
    console.log(this.props.url);
    if (this.canAddLink(this.props.url)) {
      database.ref("users/" + currentUser.uid).push({
        link: this.props.url,
        data: {
          name: "name",
          img: "image url",
          ingredients: [
            {
              amount: "number",
              unit: "string",
              item: "name/description of item"
            }
          ],
          directions: ["each", "paragraph", "or maybe the entire string"]
        }
      });
    }
  }

  canAddLink(url) {
    if (url != "") {
      let currentUser = firebase.auth().currentUser;
      console.log(database.ref("users/" + currentUser.uid).link);
      return true;
    }
    return false;
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
        <div id="label"> </div>
      </div>
    );
  }
}

export default FavoriteButton;
