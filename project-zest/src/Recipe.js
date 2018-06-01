import React, { Component } from "react";
import "./App.css";
import ValidURLRecipe from "./ValidURLRecipe";
import InvalidURLRecipe from "./InvalidURLRecipe";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import IsUrl from "is-url";
import SavedRecipes from "./SavedRecipes";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#ffaa2d"
  }
});

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      open: false,
      conversion: "",
      renderSaved: false,
      recipeInformation: {}
    };
    this.urlHasRecipe = this.urlHasRecipe.bind(this);
    this.setRecipeInfo = this.setRecipeInfo.bind(this);
  }

  handleClick = e => {
    e.preventDefault();
  };

  urlHasRecipe(url) {
    if (IsUrl(url)) {
      var regex = new RegExp(
        `https:\/\/www\.foodnetwork\.com\/recipes\/[a-z\-\/]+(recipe)*(-\d{7})*`
      );
      if (regex.test(url)) {
        return true;
      } else {
        return false;
      }
    }
  }

  setRecipeInfo() {
    this.setState({ recipeInformation: this.props.recipeInformation });
  }

  handler(e, newState) {
    e.preventDefault();
    this.setState(newState);
  }

  handleClose = e => {
    this.setState({
      open: false,
      cDisplay: e.target.id
    });
  };

  render() {
    if (this.props.recipeInformation != this.state.recipeInformation) {
      this.setRecipeInfo();
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          {this.urlHasRecipe(this.props.url) && (
            <ValidURLRecipe
              user={this.props.user}
              url={this.props.url}
              handler={this.props.handler}
              recipeInformation={this.state.recipeInformation}
            />
          )}
          {!this.urlHasRecipe(this.props.url) && (
            <InvalidURLRecipe
              user={this.props.user}
              url={this.props.url}
              handler={this.props.handler}
            />
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Recipe;
