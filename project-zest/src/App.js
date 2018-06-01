import React, { Component } from "react";
import "./App.css";
import { firebase } from "./FirebaseConfig";
import Recipe from "./Recipe";
import HomePage from "./HomePage";
import { BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      url: "",
      goToRecipePage: false,
      recipeInformation: {},
      urlChange: false,
      userWantsToSeeHomePage: true
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

  getScrapedData(url) {
    var apiBase =
      "http://api.project-zest.nicomalig.com/v1/scrape/foodnetwork?url=";
    fetch(apiBase + url)
      .then(results => results.json())
      .then(json => {
        this.setState({ recipeInformation: json });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    // this is nasty. changing state in render() will force a rerender
    // and is a hacky way of ensuring that async calls complete before rendering occurs.
    // this can cause issues down the road when we need to rely on other stateful components...
    // but fuck it
    if (this.state.urlChange) {
      var url = this.state.url;
      var apiBase =
        "http://api.project-zest.nicomalig.com/v1/scrape/foodnetwork?url=";
      fetch(apiBase + url)
        .then(results => results.json())
        .then(json => {
          this.setState({
            recipeInformation: json,
            urlChange: false
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
    return (
      <Router>
        <div id="main-screen-body">
          {/* we force the user home, OR No user is signed in and no url inputted*/}
          {(this.state.userWantsToSeeHomePage ||
            (!this.state.user && !this.state.goToRecipePage)) && (
            <HomePage handler={this.handler} user={this.state.user} />
          )}

          {/* No user is signed in but url inputted*/}
          {!this.state.userWantsToSeeHomePage &&
            ((!this.state.user && this.state.goToRecipePage) ||
              this.state.user) && (
              <Recipe
                user={this.state.user}
                handler={this.handler}
                url={this.state.url}
                recipeInformation={this.state.recipeInformation}
              />
            )}
        </div>
      </Router>
    );
  }
}

export default App;
