import React, { Component } from "react";
// import "./App.css";
import ValidURLRecipe from "./ValidURLRecipe";
import InvalidURLRecipe from "./InvalidURLRecipe";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import SignOutButton from "./SignOutButton";
import SavedRecipes from "./SavedRecipes";
import RaisedButton from "material-ui/RaisedButton/RaisedButton";
import HomeScreenSearchBar from "./HomeScreenSearchBar";
import LogInWithFacebookButton from "./LogInWithFacebookButton";
import MainScreenSearchBar from "./MainScreenSearchBar";
import RecipeSummaryCard from "./RecipeSummaryCard";
import RecipeDirections from "./RecipeDirections";
import AlterRecipeBar from "./AlterRecipeBar";
import IngredientsList from "./IngredientsList";
import Landing from "./Landing";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import './Recipe.css'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const muiTheme = getMuiTheme({
   palette: {
      primary1Color: "#ffaa2d"
   }
});

const cMainScreenSearchBar = () => {
   return (
      <div>
         <MainScreenSearchBar handler={this.props.handler} />
      </div>
   );
};

const cIngredients = () => {
   return (
      <div>
         <AlterRecipeBar />
         <IngredientsList />
      </div>
   );
};

class Recipe extends Component {
   constructor(props) {
      super(props);
      this.state = {
         user: null,
         open: false,
         conversion: ""
      };
      this.urlHasRecipe = this.urlHasRecipe.bind(this);
      console.log(this.props.url);
   }

   handleClick = e => {
      e.preventDefault();
   };

   urlHasRecipe(url) {
      return true;
   }

   handleClick = e => {
      e.preventDefault();
   };

   handleClose = e => {
      console.log(e.target.id);

      this.setState({
         open: false,
         cDisplay: e.target.id
      });
   };

   Search = () => {
      <div>
         <p> Test </p>
         <MainScreenSearchBar handler={this.props.handler} />
      </div>;
   };

   render() {
      return (
         <MuiThemeProvider muiTheme={muiTheme}>
            {/* <div className="flex-container">
               <Route exact path="/search"      component={MainScreenSearchBar} />
               <Route exact path="/summary"     component={RecipeSummaryCard} />
               <Route exact path="/directions"  component={RecipeDirections} />
               <Route exact path="/ingredients" component={cIngredients} />
               <Route exact path="/landing"     component={Landing} />
            </div> */}
            <div>
               {this.urlHasRecipe(this.props.url) && (
                  <ValidURLRecipe
                     user={this.props.user}
                     url={this.props.url}
                     handler={this.props.handler}
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
         </MuiThemeProvider >
      );
   }
}

export default Recipe;
