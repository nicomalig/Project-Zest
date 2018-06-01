import React, { Component } from "react";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import SignOutButton from "./SignOutButton";
import RaisedButton from "material-ui/RaisedButton";
import SavedRecipeCard from "./SavedRecipeCard";
import { firebase } from "./FirebaseConfig";
import "./SavedRecipeCard.css";
import { log } from "util";

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
    var handler = this.props.handler;
    var recipeHandler = this.props.recipeHandler;
    ref.on("value", function(snapshot) {
      snapshot.forEach(function(linkSnapshot) {
        var data = linkSnapshot.val();
        saved.push(
          <SavedRecipeCard
            link={data.link}
            name={data.data.name}
            image={data.data.img}
            key={linkSnapshot.key}
            handler={handler}
            recipeHandler={recipeHandler}
          />
        );
        return;
      });
      // updatePage(saved);
    });
    setTimeout(() => {
      this.updatePage(saved);
    }, 100);
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
              <h2 className="sc-header">
                Saved Recipes for {this.props.user.displayName}
              </h2>
              <div className="saved-card-container">
                {this.state.savedRecipes}
              </div>
            </div>
          </MuiThemeProvider>
        )}
      </div>
    );
  }
}

export default SavedRecipes;
