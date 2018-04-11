import React, { Component } from "react";
import "./App.css";
// import * as firebase from "firebase";
import { firebase } from "./FirebaseConfig";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import LogInWithFacebookButton from "./LogInWithFacebookButton";
import Recipe from "./Recipe";
import HomeScreenSearchBar from "./HomeScreenSearchBar";
import HomePage from "./HomePage";

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
      <div>
        {/* No user is signed in */}
        {!this.state.user && <HomePage handler={this.handler} />}

        {/* User is signed in */}
        {this.state.user && (
          <Recipe
            user={this.state.user}
            handler={this.handler}
            url={this.state.url}
          />
        )}
      </div>
    );
  }
}

export default App;
