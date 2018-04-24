import React, { Component } from "react";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import SignOutButton from "./SignOutButton";
import SavedRecipes from "./SavedRecipes";
import RaisedButton from "material-ui/RaisedButton/RaisedButton";
import LogInWithFacebookButton from "./LogInWithFacebookButton";
import MainScreenSearchBar from "./MainScreenSearchBar";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#ffaa2d"
  }
});

class InvalidURLRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      url: ""
    };
  }
  handleClick = e => {
    e.preventDefault();
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="flex-container">
          <p> Search for a recipe! </p>
          <MainScreenSearchBar handler={this.props.handler} />
        </div>
        {this.props.user && (
          <div>
            <p>Welcome {this.props.user.displayName}</p>
            <SignOutButton
              user={this.props.user}
              handler={this.props.handler}
            />
            <RaisedButton
              className="saved-recipes-button"
              label="See Your Saved Recipes" /*onClick={ GO TO SAVED RECIPES PAGE }*/
            />
            <SavedRecipes user={this.props.user} handler={this.props.handler} />
          </div>
        )}
        {!this.props.user && (
          <div>
            <p>Login to save your recipes!</p>
            <div id="login-div" className="flex-item">
              <LogInWithFacebookButton
                user={this.state.user}
                handler={this.props.handler}
              />
            </div>
          </div>
        )}
      </MuiThemeProvider>
    );
  }
}

export default InvalidURLRecipe;
