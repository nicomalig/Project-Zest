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
         conversion: 0,
         alterType: "",
         servingSizeChange: 1,
         recipeInformation: {},
         e: null,
         renderSaved: false,
      };
      this.recipeHandler = this.recipeHandler.bind(this);
      this.getConversionRate = this.getConversionRate.bind(this);
      this.handleSavedClick = this.handleSavedClick.bind(this)
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

   handleSavedClick = e => {
      e.preventDefault()
      this.setState({renderSaved: !this.state.renderSaved})
   }

   render() {
      console.log("valid recipe render");
      var con = this.getConversionRate();

      console.log(this.state);
      return (
         <MuiThemeProvider muiTheme={muiTheme}>
            <div className="flex-container-m">
               <div className="mssb">
                  <MainScreenSearchBar
                     handler={this.props.handler}
                     url={this.props.url}
                     user={this.props.user}
                     handleSavedClick={this.handleSavedClick}
                     renderSaved={this.state.renderSaved}
                  />
               </div>

               {/* DISPLAY SAVED RECIPES */}
               {this.state.renderSaved &&
                  <div className="flex-container-content">
                     <SavedRecipes
                        user={this.props.user}
                        handler={this.props.handler}
                     />
                  </div>
               }

               {/* DISPLAY CURRENT RECIPE */}
               {!this.state.renderSaved &&
                  <div className="flex-container-content">
                     <div className="flex-container-c-left flex-item fcc-fi">
                        <div className="flex-item">
                           <RecipeSummaryCard
                              user={this.props.user}
                              handler={this.props.handler}
                              recipeHandler={this.recipeHandler}
                              url={this.props.url}
                              recipeInformation={this.props.recipeInformation}
                              e={this.state.e}
                           />
                        </div>

                        {/* component: RecipeIngredients */}
                        <div id="ingredients-div" className="flex-item fcc-fi">
                           <h2>Recipe</h2>

                           {/* component: AlterRecipeBar */}
                           <AlterRecipeBar handler={this.recipeHandler} e={this.state.e} />

                           {/* component: IngredientsList */}
                           <IngredientsList
                              conversion={con}
                              servingSizeChange={this.state.servingSizeChange}
                              convertFrom={this.state.convertFrom}
                              convertTo={this.state.convertTo}
                              handler={this.recipeHandler}
                              alterType={this.state.alterType}
                              recipeInformation={this.props.recipeInformation}
                              e={this.state.e}
                           />
                        </div>
                     </div>

                     <div className="flex-container-c-right flex-item fcc-fi">
                        <RecipeDirections
                           handler={this.recipeHandler}
                           recipeInformation={this.props.recipeInformation}
                        />
                     </div>
                  </div>
               }

            </div>
         </MuiThemeProvider>
      );
   }
}

export default ValidURLRecipe;
