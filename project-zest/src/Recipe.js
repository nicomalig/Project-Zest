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
import IngredientsList from "./IngredientsList";

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
                  <IngredientsList />
               </div>
            </div>

            {/* <div className="flex-container">
               <p>Welcome {this.props.user.displayName}</p>
               <SignOutButton user={this.props.user} handler={this.props.handler} />
               <RaisedButton
                  className="saved-recipes-button"
                  label="See Your Saved Recipes"
               />
               <SavedRecipes user={this.props.user} handler={this.props.handler} />{" "}
            </div> */}
         </MuiThemeProvider>
      );
   }
}

export default Recipe;
