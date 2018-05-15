import React, { Component } from "react";
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
// import "./Recipe.css";
// import "./App.css";

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
         conversion: 0,
         alterType: ""
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
      if (this.state.convertFrom !== "" && this.state.convertTo !== "") {
         var extraCon = 1;
         var from = this.state.convertFrom;
         var to = this.state.convertTo;
         switch (from) {
            case "eigthcup":
               from = "cup";
               extraCon /= 8;
               break;
            case "fourthcup":
               from = "cup";
               extraCon /= 4;
               break;
            case "thirdcup":
               from = "cup";
               extraCon /= 3;
               break;
            case "halfcup":
               from = "cup";
               extraCon /= 2;
               break;
            default:
               break;
         }
         switch (to) {
            case "eigthcup":
               to = "cup";
               extraCon *= 8;
               break;
            case "fourthcup":
               to = "cup";
               extraCon *= 4;
               break;
            case "thirdcup":
               to = "cup";
               extraCon *= 3;
               break;
            case "halfcup":
               to = "cup";
               extraCon *= 2;
               break;
            default:
               break;
         }
         con = convert.from(from).to(to);
         con *= extraCon;
      }
      return con;
   }

   render() {
      var con = this.getConversionRate();

      return (
         <MuiThemeProvider muiTheme={muiTheme}>
            <div className="flex-container-m">
               <div className="flex-item mssb">
                  <MainScreenSearchBar
                     handler={this.props.handler}
                     url={this.props.url}
                  />
               </div>

               <div className="flex-container-content">
                  <div className="flex-container-left flex-item">
                     <div className="flex-item top-l">
                        <RecipeSummaryCard
                           user={this.props.user}
                           handler={this.props.handler}
                           url={this.props.url}
                        />
                     </div>

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
                           alterType={this.state.alterType}
                        />
                     </div>
                  </div>
                  <div className="flex-item">
                     <RecipeDirections />
                  </div>

                  <div className="flex-item">
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
                  </div>
               </div>
            </div>
         </MuiThemeProvider>
      );
   }
}

export default ValidURLRecipe;
