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
import AppBar from 'material-ui/AppBar';
import SignOutButton from "./SignOutButton";
import FlatButton from 'material-ui/FlatButton';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton/RaisedButton";


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#ffaa2d"
  },
  fontFamily: 'Roboto',
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
      <Router>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <Route path="/main" component={Recipe} />
          </div>
          <div>
            {/* No user is signed in */}
            {!this.state.user && <HomePage handler={this.handler} />}

            {/* User is signed in */}
            {this.state.user &&
              <div>
                <AppBar
                  title="Project Zest"
                  showMenuIconButton={false}
                  iconElementRight={
                    <div>
                      <SignOutButton
                        user={this.state.user}
                        handler={this.handler}
                      />
                    </div>
                  }
                />
                <Recipe
                  user={this.state.user}
                  handler={this.handler}
                  url={this.state.url}
                />
              </div>
            }



          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
