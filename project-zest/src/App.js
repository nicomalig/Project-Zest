import React, { Component } from "react";
import "./App.css";
// import * as firebase from "firebase";
import { firebase } from "./FirebaseConfig";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import LogInWithFacebookButton from "./LogInWithFacebookButton";
import Recipe from "./Recipe";
import HomeScreenSearchBar from "./HomeScreenSearchBar";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#ffaa2d"
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      url: ""
    };
    this.handler = this.handler.bind(this);
  }

  // When component mounts, check the user
  componentDidMount() {
    // Check for authentication state change (test if there is a user)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user
        });
        console.log("user: " + user.displayName);
      }
    });
  }

  // Capture state from child component
  // PROTIP:
  // Pass in as <MyComponent handler={this.handler} />
  handler(e, newState) {
    e.preventDefault();
    this.setState(newState);
  }

  render() {
    console.log(this.state.user);
    console.log(this.state.url);
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        {!this.state.user && (
          <div className="flex-container" id="main-screen">
            <div className="flex-item">
              <img
                src={require("./img/zest.png")}
                width="118"
                height="130.25"
                alt="zest logo"
              />
            </div>
            <div className="flex-row">
              <div className="flex-item">
                <div>
                  <h2>Cook with Zest</h2>
                  <p>
                    We make it easy for you to make conversions, cook for any
                    number of people, and adjust any recipe to your needs!
                  </p>
                  <p>
                    <i>Don't let cooking be a test, use Zest!</i>
                  </p>
                </div>
                <div className="flex-container">
                  <div className="flex-row">
                    <div className="flex-item">
                      <HomeScreenSearchBar handler={this.handler} />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div id="login-div" className="flex-item">
                  <LogInWithFacebookButton
                    user={this.state.user}
                    handler={this.handler}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {this.state.user && (
          <Recipe
            user={this.state.user}
            handler={this.handler}
            url={this.state.url}
          />
        )}
      </MuiThemeProvider>
    );
  }
}

export default App;
