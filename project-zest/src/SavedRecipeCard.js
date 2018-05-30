import React, { Component } from "react";
import { firebase, database } from "./FirebaseConfig";

import "./SavedRecipeCard.css";
import {
  Card,
  CardMedia,
  CardActions,
  CardTitle,
  CardText
} from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";

class SavedRecipeCard extends Component {
  constructor(props) {
    super(props);
    this.showSavedRecipe = this.showSavedRecipe.bind(this);
    this.isInDatabase = this.isInDatabase.bind(this);
    this.getIdOfLink = this.getIdOfLink.bind(this);
    this.getURLDataFromDatabase = this.getURLDataFromDatabase.bind(this);
  }
  handleClick = e => {
    e.preventDefault();
  };

  isInDatabase(url) {
    let currentUser = firebase.auth().currentUser;
    if (currentUser == null) {
      return false;
    }
    var ref = firebase.database().ref("users/" + currentUser.uid);
    var check = false;
    ref.on("value", function(snapshot) {
      snapshot.forEach(function(linkSnapshot) {
        var data = linkSnapshot.val();
        if (data.link === url) {
          check = true;
          return check;
        }
      });
    });
    return check;
  }

  getIdOfLink(url) {
    let currentUser = firebase.auth().currentUser;
    var ref = firebase.database().ref("users/" + currentUser.uid);
    var id = "";
    ref.on("value", function(snapshot) {
      snapshot.forEach(function(linkSnapshot) {
        var data = linkSnapshot.key;
        if (linkSnapshot.val().link === url) {
          id = data;
        }
      });
    });
    return id;
  }

  getURLDataFromDatabase(url) {
    this.setState({
      liked: false
    });
    var uid = firebase.auth().currentUser.uid;
    var id = this.getIdOfLink(url);
    var recipeInformation;
    if (id !== "") {
      firebase
        .database()
        .ref("users/" + uid)
        .child(id)
        .once("value", function(snapshot) {
          recipeInformation = snapshot.val();
        });
    }
    return recipeInformation;
  }

  showSavedRecipe(e) {
    e.preventDefault();
    if (this.isInDatabase(this.props.link)) {
      var data = this.getURLDataFromDatabase(this.props.link);
      this.props.handler(e, { recipeInformation: data, url: data.link });
      this.props.recipeHandler(e, {
        recipeInformation: data,
        renderSaved: false
      });
    }
  }

  render() {
    var image = this.props.image;
    if (!image) {
      image = require("./img/defaultImage.png");
    }
    return (
      <div className="saved-recipe-card">
        <Card>
          <CardMedia>
            <img src={image} width="200px" height="200px" />
          </CardMedia>
          <CardTitle title={this.props.name} />
          <CardActions>
            <RaisedButton
              primary={true}
              backgroundColor="#FFAA2E"
              hoverColor="#f2940c"
              color="#FFFFFF"
              label="View Now"
              onClick={this.showSavedRecipe}
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default SavedRecipeCard;
