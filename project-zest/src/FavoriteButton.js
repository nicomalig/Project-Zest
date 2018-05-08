import React, { Component } from "react";
import { firebase, database } from "./FirebaseConfig";

class FavoriteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false
    };
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.canAddLink = this.canAddLink.bind(this);
    this.isInDatabase = this.isInDatabase.bind(this);
    this.deleteDataFromDatabase = this.deleteDataFromDatabase.bind(this);
    this.getIdOfLink = this.getIdOfLink.bind(this);
  }

  toggleFavorite(e) {
    console.log("toggleFav");
    e.preventDefault();
    let currentUser = firebase.auth().currentUser;
    console.log(this.props.url);
    if (this.state.liked) {
      this.deleteDataFromDatabase();
    } else {
      this.addToDatabase(currentUser);
    }
  }

  addToDatabase(currentUser) {
    if (this.canAddLink()) {
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

  getIdOfLink() {
    console.log("getIdOfLink");
    let currentUser = firebase.auth().currentUser;
    var ref = firebase.database().ref("users/" + currentUser.uid);
    var url = this.props.url;
    var id = "";
    ref.on("value", function(snapshot) {
      snapshot.forEach(function(linkSnapshot) {
        var data = linkSnapshot.key;
        console.log(data);
        if (linkSnapshot.val().link == url) {
          id = data;
        }
      });
    });
    return id;
  }

  deleteDataFromDatabase() {
    this.setState({
      liked: false
    });
    var uid = firebase.auth().currentUser.uid;
    var id = this.getIdOfLink();
    if (id != "") {
      firebase
        .database()
        .ref("users/" + uid)
        .child(id)
        .remove();
    }
  }

  isInDatabase() {
    console.log("isINdatabase");
    let currentUser = firebase.auth().currentUser;
    var ref = firebase.database().ref("users/" + currentUser.uid);
    var url = this.props.url;
    var check = false;
    ref.on("value", function(snapshot) {
      snapshot.forEach(function(linkSnapshot) {
        var data = linkSnapshot.val();
        if (data.link == url) {
          console.log("data link = url");
          check = true;
          return check;
        }
      });
    });
    return check;
  }

  canAddLink() {
    if (this.props.url != "" && !this.isInDatabase()) {
      return true;
    }
    return false;
  }

  render() {
    console.log(this.props.user);
    if (!this.state.liked && this.isInDatabase()) {
      console.log("is in database - render");
      this.setState({
        liked: true
      });
    } else if (this.state.liked && !this.isInDatabase()) {
      console.log("is in database - render");
      this.setState({
        liked: false
      });
    }
    return (
      <div>
        <button
          id="favorite-button"
          label="favorite recipe"
          onClick={this.toggleFavorite}
        >
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
