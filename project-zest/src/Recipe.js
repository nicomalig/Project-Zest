import React, { Component } from "react";
import "./App.css";
import ValidURLRecipe from "./ValidURLRecipe";
import InvalidURLRecipe from "./InvalidURLRecipe";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import SignOutButton from "./SignOutButton";
import SavedRecipes from "./SavedRecipes";
import RaisedButton from "material-ui/RaisedButton/RaisedButton";
import HomeScreenSearchBar from "./HomeScreenSearchBar";
import LogInWithFacebookButton from "./LogInWithFacebookButton";
import MainScreenSearchBar from "./MainScreenSearchBar";
import RecipeSummaryCard from "./RecipeSummaryCard";
import RecipeDirections from "./RecipeDirections";
import AlterRecipeBar from "./AlterRecipeBar";
import IngredientsList from "./IngredientsList";
import Landing from "./Landing";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import Scraper from "./Scraper";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#ffaa2d"
  }
});

const cScraper = () => {
  console.log("Entering cScraper");

  return (
    <div>
      <Scraper />
    </div>
  );
};

const cMainScreenSearchBar = () => {
  return (
    <div>
      <MainScreenSearchBar handler={this.props.handler} />
    </div>
  );
};

const cIngredients = () => {
  return (
    <div>
      <AlterRecipeBar />
      <IngredientsList />
    </div>
  );
};

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      open: false,
      conversion: ""
    };
    this.urlHasRecipe = this.urlHasRecipe.bind(this);
    console.log(this.props.url);
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

  Search = () => {
    <div>
      <p> Test </p>
      <MainScreenSearchBar handler={this.props.handler} />
    </div>;
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            title="Project Zest"
            showMenuIconButton={true}
            onLeftIconButtonClick={() => this.setState({ open: true })}
            iconElementRight={
              <div>
                {this.props.user && (
                  <SignOutButton
                    user={this.props.user}
                    handler={this.props.handler}
                  />
                )}
                {!this.props.user && (
                  <LogInWithFacebookButton handler={this.props.handler} />
                )}
              </div>
            }
          />

          <Drawer
            open={this.state.open}
            docked={false}
            onRequestChange={open => this.setState({ open })}
          >
            <MenuItem
              primaryText="Search"
              onClick={this.handleClose}
              containerElement={<Link to="/search" />}
            />
            <MenuItem
              primaryText="Summary"
              onClick={this.handleClose}
              containerElement={<Link to="/summary" />}
            />
            <MenuItem
              primaryText="Directions"
              onClick={this.handleClose}
              containerElement={<Link to="/directions" />}
            />
            <MenuItem
              primaryText="Ingredients"
              onClick={this.handleClose}
              containerElement={<Link to="/ingredients" />}
            />
            <MenuItem
              primaryText="--Landing"
              onClick={this.handleClose}
              containerElement={<Link to="/landing" />}
            />
            <MenuItem
              primaryText="--Scraper"
              onClick={this.handleClose}
              containerElement={<Link to="/scraper" />}
            />
          </Drawer>

          {/* Holding Container */}
          <div className="flex-container">
            {/* ROUTES */}
            <Route exact path="/search" component={MainScreenSearchBar} />
            <Route exact path="/summary" component={RecipeSummaryCard} />
            <Route exact path="/directions" component={RecipeDirections} />
            <Route exact path="/ingredients" component={cIngredients} />
            <Route path="/landing" component={Landing} />
            <Route path="/scraper" component={cScraper} />
            {/* END ROUTES */}
          </div>
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
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Recipe;
