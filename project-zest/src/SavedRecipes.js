import React, { Component } from "react";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import SignOutButton from "./SignOutButton";
import RaisedButton from "material-ui/RaisedButton";
import SavedRecipeCard from "./SavedRecipeCard";
import { firebase } from "./FirebaseConfig";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#ffaa2d"
  }
});

class SavedRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedRecipes: []
    };
    this.getSavedRecipes = this.getSavedRecipes.bind(this);
    this.updatePage = this.updatePage.bind(this);
  }
  handleClick = e => {
    e.preventDefault();
  };

  componentDidMount() {
    this.getSavedRecipes();
  }

  getSavedRecipes() {
    let currentUser = firebase.auth().currentUser;
    if (currentUser == null) {
      return false;
    }
    var ref = firebase.database().ref("users/" + currentUser.uid);
    var saved = [];
    ref.on("value", function(snapshot) {
      snapshot.forEach(function(linkSnapshot) {
        var data = linkSnapshot.val();
        saved.push(
          <SavedRecipeCard
            link={data.link}
            name={data.data.name}
            image={data.data.img}
            key={linkSnapshot.key}
          />
        );
        return;
      });
      // updatePage(saved);
    });
    this.updatePage(saved);
    return saved;
  }

  updatePage(saved) {
    this.setState({
      savedRecipes: saved
    });
  }

  render() {
    return (
      <div>
        {this.props.user && (
          <MuiThemeProvider muiTheme={muiTheme}>
            <div>
              <h1>Saved Recipes for {this.props.user.displayName}</h1>
              <div>{this.state.savedRecipes}</div>
            </div>
          </MuiThemeProvider>
        )}
      </div>
    );
  }
}

export default SavedRecipes;
