import React, { Component } from "react";
import "./App.css";
import ValidURLRecipe from "./ValidURLRecipe";
import InvalidURLRecipe from "./InvalidURLRecipe";

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.urlHasRecipe = this.urlHasRecipe.bind(this);
    console.log(this.props.url);
  }
  handleClick = e => {
    e.preventDefault();
  };

  urlHasRecipe(url) {
    return true;
  }

  render() {
    console.log(this.props.user);
    return (
      <div>
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
      </div>
    );
  }
}

export default Recipe;
