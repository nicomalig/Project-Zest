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
      urlChange: false
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
    console.log("get scraped data");
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
      // this.setState({ urlChange: false });
    }
    return (
      <Router>
        <div id="main-screen-body">
          {/* No user is signed in and no url inputted*/}
          {!this.state.user &&
            !this.state.goToRecipePage && <HomePage handler={this.handler} />}

          {/* No user is signed in but url inputed*/}
          {((!this.state.user && this.state.goToRecipePage) ||
            this.state.user) && (
            <Recipe
              user={this.state.user}
              handler={this.handler}
              url={this.state.url}
              recipeInformation={this.state.recipeInformation}
            />
          )}
          {/* User is signed in
          {this.state.user &&
            this.state.goToRecipePage && (
              <Recipe
                user={this.state.user}
                handler={this.handler}
                url={this.state.url}
              />
            )} */}
          {/* User is signed in */}
          {/* {this.state.user && (
            <Recipe
              user={this.state.user}
              handler={this.handler}
              url={this.state.url}
            />
          )} */}
        </div>
      </Router>
    );
  }
}

export default App;
