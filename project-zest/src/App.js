import React, { Component } from "react";
import "./App.css";
import { firebase } from "./FirebaseConfig";
import Recipe from "./Recipe";
import HomePage from "./HomePage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      url: "",
      goToRecipePage: false
    };
    this.handler = this.handler.bind(this);
  }

  // When component mounts, check the user
  componentDidMount() {
    // Check for authentication state change (test if there is a user)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          url: "",
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
    console.log(this.state);
  }

  render() {
    console.log(this.state.user);
    console.log(this.state.url);
    console.log(this.state.goToRecipePage);
    return (
      <div>
        {/* No user is signed in and no url inputted*/}
        {!this.state.user &&
          !this.state.goToRecipePage && <HomePage handler={this.handler} />}

        {/* No user is signed in but url inputed*/}
        {!this.state.user &&
          this.state.goToRecipePage && (
            <Recipe
              user={this.state.user}
              handler={this.handler}
              url={this.state.url}
            />
          )}

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
