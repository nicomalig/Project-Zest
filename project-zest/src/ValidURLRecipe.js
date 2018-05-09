import React, { Component } from "react";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import SignOutButton from "./SignOutButton";
import SavedRecipes from "./SavedRecipes";
import RaisedButton from "material-ui/RaisedButton/RaisedButton";
import LogInWithFacebookButton from "./LogInWithFacebookButton";
import MainScreenSearchBar from "./MainScreenSearchBar";
import RecipeSummaryCard from "./RecipeSummaryCard";
import RecipeDirections from "./RecipeDirections";
import AlterRecipeBar from "./AlterRecipeBar";
import IngredientsList from "./IngredientsList";
import ConvertUnits from "convert-units";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#ffaa2d"
  }
});

class ValidURLRecipe extends Component {
  handleClick = e => {
    e.preventDefault();
  };

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     url: nextProps.url,
  //     user: nextProps.user
  //   });
  // }

  constructor(props) {
    super(props);
    this.state = {
      convertTo: "",
      convertFrom: "",
      conversion: 0
    };
    this.recipeHandler = this.recipeHandler.bind(this);
    this.getConversionRate = this.getConversionRate.bind(this);
  }

  recipeHandler(e, newState) {
    e.preventDefault();
    this.setState(newState);
  }

  getConversionRate() {
    var convert = ConvertUnits(1);
    var con = 1;
    if (this.state.convertFrom != "" && this.state.convertTo != "") {
      con = convert.from(this.state.convertFrom).to(this.state.convertTo);
    }
    return con;
  }

  render() {
    var con = this.getConversionRate();
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="flex-container">
          <p> RECIPE PAGE</p>
          <MainScreenSearchBar
            handler={this.props.handler}
            url={this.props.url}
          />

          <RecipeSummaryCard
            handler={this.props.handler}
            url={this.props.url}
          />

          <RecipeDirections />

          {/* component: RecipeIngredients */}
          <div id="ingredients-div">
            <h2>Recipe</h2>

            {/* component: AlterRecipeBar */}
            <AlterRecipeBar handler={this.recipeHandler} />

            {/* component: IngredientsList */}
            <IngredientsList
              conversion={con}
              convertFrom={this.state.convertFrom}
              convertTo={this.state.convertTo}
              handler={this.recipeHandler}
            />
          </div>
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
                user={this.props.user}
                handler={this.props.handler}
              />
            </div>
          </div>
        )}
      </MuiThemeProvider>
    );
  }
}

export default ValidURLRecipe;
