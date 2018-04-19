import React, { Component } from "react";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import SignOutButton from "./SignOutButton";
import SavedRecipes from "./SavedRecipes";
import RaisedButton from "material-ui/RaisedButton/RaisedButton";
import MainScreenSearchBar from "./MainScreenSearchBar";
import RecipeSummaryCard from "./RecipeSummaryCard";
import RecipeDirections from "./RecipeDirections";
import AlterRecipeBar from "./AlterRecipeBar";
import IngredientsList from "./IngredientsList";
import Landing from "./Landing";
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Scraper from './Scraper'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: "#ffaa2d"
    }
});

const cMainScreenSearchBar = () => {
    <div>
        <MainScreenSearchBar handler={this.props.handler} />
    </div>
}

const cIngredients = () => {
    <div>
        <AlterRecipeBar />
        <IngredientsList />
    </div>
};

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            open: false,
        };
    };

    handleClick = e => {
        e.preventDefault();
    };

    handleClose = (e) => {
        console.log(e.target.id);

        this.setState({
            open: false,
            cDisplay: e.target.id,
        })
    };

    Search = () => {
        <div>
            <p> Test </p>
            <MainScreenSearchBar handler={this.props.handler} />
        </div>
    };

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <AppBar
                        title="Project Zest"
                        showMenuIconButton={true}
                        onLeftIconButtonClick={() =>
                            this.setState({ open: true })
                        }
                        iconElementRight={
                            <div>
                                <SignOutButton
                                    user={this.props.user}
                                    handler={this.props.handler}
                                />
                            </div>
                        }
                    />

                    <Drawer
                        open={this.state.open}
                        docked={false}
                        onRequestChange={(open) => this.setState({ open })}
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
                        <Route exact path="/search" component={this.Search} />
                        <Route exact path="/summary" component={RecipeSummaryCard} />
                        <Route exact path="/directions" component={RecipeDirections} />
                        <Route exact path="/ingredients" component={cIngredients}/>
                        <Route path="/landing" component={Landing} />
                        <Route path="/scraper" component={<Scraper />} />

                        {/* END ROUTES */}

                    </div>

                    {/* <div className="flex-container">
                        <div>
                            <p> RECIPE PAGE</p>
                            <MainScreenSearchBar handler={this.props.handler} />
                        </div>

                        <RecipeSummaryCard />
                        <RecipeDirections />

                        <div id="ingredients-div">
                            <h2>Recipe</h2>
                            <AlterRecipeBar />
                            <IngredientsList />
                        </div>
                    </div> */}
                    {/* END Holding Container */}

                </div>

                {/* 
            <div className="flex-container">
                <p>Welcome {this.props.user.displayName}</p>
                <SignOutButton user={this.props.user} handler={this.props.handler} />
                <RaisedButton
                    className="saved-recipes-button"
                    label="See Your Saved Recipes"
                />
                <SavedRecipes user={this.props.user} handler={this.props.handler} />{" "}
            </div> 
            */}
            </MuiThemeProvider>
        );
    }
}

export default Recipe;
