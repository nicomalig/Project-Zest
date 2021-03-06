import React, { Component } from "react";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import SignOutButton from "./SignOutButton";
import SavedRecipes from "./SavedRecipes";
import SavedRecipeCard from "./SavedRecipeCard";
import RaisedButton from "material-ui/RaisedButton/RaisedButton";
import LogInWithFacebookButton from "./LogInWithFacebookButton";
import MainScreenSearchBar from "./MainScreenSearchBar";
import FlatButton from "material-ui/FlatButton/FlatButton";
import "./InvalidURLRecipe.css";

const muiTheme = getMuiTheme({
   palette: {
      primary1Color: "#ffaa2d"
   }
});

class InvalidURLRecipe extends Component {
   constructor(props) {
      super(props);
      this.state = {
         url: "",
         renderSaved: false
      };
      this.recipeHandler = this.recipeHandler.bind(this);
      this.handleSavedClick = this.handleSavedClick.bind(this);
   }

   handleClick = e => {
      e.preventDefault();
   };

   handleSavedClick = e => {
      e.preventDefault();
      this.setState({ renderSaved: !this.state.renderSaved });
   };

   recipeHandler(e, newState) {
      e.preventDefault();
      this.setState(newState);
   }

   render() {
      return (
         <MuiThemeProvider muiTheme={muiTheme}>
            <div className="flex-container-m">
               <div className="mssb">
                  <MainScreenSearchBar
                     handler={this.props.handler}
                     url={this.props.url}
                     user={this.props.user}
                     renderSaved={this.state.renderSaved}
                     handleSavedClick={this.handleSavedClick}
                     recipeHandler={this.recipeHandler}
                  />
               </div>

               {/* DISPLAY GUIDANCE */}
               {!this.state.renderSaved &&
                  <div className="color-div">
                     <div className="flex-container-content invalid-screen">
                        <p className="guidance flex-item">
                           Input a{" "}
                           <a target="blank" href="https://www.foodnetwork.com/">
                              Food Network
                           </a>{" "}
                           URL into the search bar above to get started!
                        </p>
                     </div>
                  </div>
               }

               {/* DISPLAY SAVED RECIPES */}
               {this.state.renderSaved && (
                  <div className="color-div">
                     <div className="flex-container-content">
                        <SavedRecipes
                           user={this.props.user}
                           handler={this.props.handler}
                           recipeHandler={this.recipeHandler}
                        />
                     </div>
                  </div>
               )}
            </div>
         </MuiThemeProvider>
      );
   }
}

export default InvalidURLRecipe;
