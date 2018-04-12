import React, { Component } from "react";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import LogInWithFacebookButton from "./LogInWithFacebookButton";
import HomeScreenSearchBar from "./HomeScreenSearchBar";

const muiTheme = getMuiTheme({
   palette: {
      primary1Color: "#ffaa2d"
   }
});

class HomePage extends Component {
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
            <div className="flex-container" id="main-screen">
               <div className="flex-row">
                  <div className="flex-item">
                     <img
                        src={require("./img/zest.png")}
                        width="118"
                        height="130.25"
                        alt="zest logo"
                     />
                  </div>
               </div>
               <div className="flex-row">
                  <div className="flex-item">
                     <div>
                        <h2>Cook with Zest</h2>
                        <p>
                           We make it easy for you to make conversions, cook for any
                           number of people, and adjust any recipe to your needs!
                        </p>
                        <p><i>Don't let cooking be a test, use Zest!</i></p>
                     </div>
                  </div>
                  <div className="flex-row">
                     <div className="flex-item">
                        <HomeScreenSearchBar handler={this.handler} />
                     </div>
                     <br />
                     <div id="login-div" className="flex-item">
                        <LogInWithFacebookButton
                           user={this.state.user}
                           handler={this.handler}
                        />
                     </div>
                  </div>
               </div>
            </div>


         </MuiThemeProvider>
      );
   }
}

export default HomePage;
