import React, { Component } from "react";
import "./HomePage.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import LogInWithFacebookButton from "./LogInWithFacebookButton";
import HomeScreenSearchBar from "./HomeScreenSearchBar";
import logo from "./img/zest.png";
import { RaisedButton } from "material-ui";

const muiTheme = getMuiTheme({
   palette: {
      primary1Color: "#ffaa2d"
   }
});

class Goodbye extends Component {
   constructor(props) {
      super(props);
      this.state = {
         user: null
      };
      this.goToRecipePage = this.goToRecipePage.bind(this);
   }
   
   handleClick = e => {
      e.preventDefault();
   };
   
   goToRecipePage(e) {
      e.preventDefault();
      this.props.handler(e, {
         goToRecipePage: true,
         userWantsToSeeHomePage: false
      });
   }
   
   render() {
      return (
         <MuiThemeProvider muiTheme={muiTheme}>
            <div className="flex-container fc-overall" id="main-screen">
               <div className="flex-container-left">
                  <div className="hs-logo-container flex-item">
                     <img src={logo} alt="logo" />
                  </div>
            
               <div className="flex-item">
                  <div>
                     <h2>Cook with Zest</h2>
                     <p>
                        Team Zest thanks you very much for your support. Project Zest
                        has exceeded our expectations (and operating budget!) and is now retired.
                        
                        Until next time...
                     </p>
                     <p>
                        <i>Don't let cooking be a test, use Zest!</i>
                     </p>
                  </div>
               </div>
            </div>
         </div>
         </MuiThemeProvider>
      );
   }
}

export default Goodbye;
