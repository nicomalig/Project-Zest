import React, { Component } from "react";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import SignOutButton from "./SignOutButton";
import SavedRecipes from "./SavedRecipes";
import RaisedButton from "material-ui/RaisedButton/RaisedButton";
import LogInWithFacebookButton from "./LogInWithFacebookButton";
import MainScreenSearchBar from "./MainScreenSearchBar";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#ffaa2d"
  }
});

class InvalidURLRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      url: ""
    };
  }
  handleClick = e => {
    e.preventDefault();
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="flex-container-m">
          <div className="mssb">
            <MainScreenSearchBar
              handler={this.props.handler}
              url={this.props.url}
              user={this.props.user}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default InvalidURLRecipe;
