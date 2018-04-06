import React, { Component } from "react";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import SignOutButton from "./SignOutButton";
import SavedRecipes from "./SavedRecipes";
import RaisedButton from "material-ui/RaisedButton/RaisedButton";
import MainScreenSearchBar from "./MainScreenSearchBar";
import RecipeSummaryCard from "./RecipeSummaryCard";
import RecipeDirections from "./RecipeDirections";
import AlterRecipeBar from "./AlterRecipeBar";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#ffaa2d"
  }
});

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }
  handleClick = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div>
        {this.props.user && (
          <MuiThemeProvider muiTheme={muiTheme}>
            <div className="flex-container">
              <p> RECIPE PAGE</p>
              <MainScreenSearchBar handler={this.props.handler} />

              <RecipeSummaryCard />

              <RecipeDirections />

              {/* component: RecipeIngredients */}
              <div id="ingredients-div">
                <h2>Recipe</h2>

                {/* component: AlterRecipeBar */}
                <AlterRecipeBar />

                {/* component: IngredientsList */}
                <div id="ingredients-list">
                  <ul>
                    <li>
                      <span>2 1/4</span> <span>cups</span> all-purpose flour
                    </li>
                    <li>
                      <span>1</span> <span>teaspoon</span> baking soda
                    </li>
                    <li>Fine salt</li>
                    <li>
                      <span>1 1/2</span> sticks (12 tablespoons) unsalted
                      butter, at room temperature
                    </li>
                    <li>
                      <span>3/4</span> <span>cup</span> packed light brown sugar
                    </li>
                    <li>
                      <span>2/3</span> <span>cup</span> granulated sugar
                    </li>
                    <li>
                      <span>2</span> large eggs
                    </li>
                    <li>
                      <span>1</span> <span>teaspoon</span> pure vanilla extract
                    </li>
                    <li>One 12-ounce bag semisweet chocolate chips</li>
                  </ul>
                </div>
              </div>
            </div>
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
              <SavedRecipes
                user={this.props.user}
                handler={this.props.handler}
              />{" "}
              {/* delete after */}
            </div>
          </MuiThemeProvider>
        )}
      </div>
    );
  }
}

export default Recipe;
