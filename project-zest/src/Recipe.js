import React, { Component } from "react";
import "./App.css";
import ValidURLRecipe from "./ValidURLRecipe";
import InvalidURLRecipe from "./InvalidURLRecipe";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

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
         conversion: ""
      };
      this.urlHasRecipe = this.urlHasRecipe.bind(this);
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

   render() {
      return (
         <MuiThemeProvider muiTheme={muiTheme}>
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
         </MuiThemeProvider>
      );
   }
}

export default Recipe;
