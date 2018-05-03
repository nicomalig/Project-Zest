import React, { Component } from "react";
import { firebase, database } from "./FirebaseConfig";
// import * as firebase from "firebase";

class FavoriteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      linkID: ""
    };
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.canAddLink = this.canAddLink.bind(this);
    this.isInDatabase = this.isInDatabase.bind(this);
    this.userExistsCallback = this.userExistsCallback.bind(this);
    this.checkIfUserExists = this.checkIfUserExists.bind(this);
  }

  componentDidMount() {
    if (this.isInDatabase()) {
      this.setState({
        liked: true
      });
      console.log("liked");
    } else {
      this.setState({
        liked: false
      });
      console.log("NOPE");
    }
  }

  toggleFavorite(e) {
    e.preventDefault();
    let currentUser = firebase.auth().currentUser;
    console.log(this.props.url);

    if (this.state.liked) {
      this.setState({
        liked: false
      });
      console.log("liked is now false");
    } else {
      if (this.canAddLink(this.props.url)) {
        this.setState({
          liked: true
        });
        console.log("liked is TRU");
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
  }

  isInDatabase() {
    let currentUser = firebase.auth().currentUser;
    var ref = firebase.database().ref("users/" + currentUser.uid);
    var url = this.props.url;
    ref.on("value", function(snapshot) {
      snapshot.forEach(function(linkSnapshot) {
        console.log(linkSnapshot.link);
        if (linkSnapshot.link == url) {
          return true;
        }
      });
    });
    return false;
  }

  userExistsCallback(userId, exists) {
    if (exists) {
      alert("user " + userId + " exists!");
    } else {
      alert("user " + userId + " does not exist!");
    }
  }

  // Tests to see if /users/<userId> has any data.
  checkIfUserExists(userId) {
    var ref = firebase.database().ref(`users/${userId}/${this.props.url}`);
    if (ref != null) {
      ref.once("value").then(function(snapshot) {
        console.log(snapshot);
        var childKey = snapshot.child("link").key; // "last"
        console.log(childKey);
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
          {!this.state.liked && (
            <img
              src={require("./img/whiteHeart1.png")}
              width="20"
              height="20"
              alt="favorite button"
            />
          )}
          {this.state.liked && (
            <img
              src={require("./img/filledWhiteHeart1.png")}
              width="20"
              height="20"
              alt="favorite button"
            />
          )}
        </button>
        <div id="label"> </div>
      </div>
    );
  }
}

export default FavoriteButton;
