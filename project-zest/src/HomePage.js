import React, { Component } from "react";
import "./HomePage.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import LogInWithFacebookButton from "./LogInWithFacebookButton";
import HomeScreenSearchBar from "./HomeScreenSearchBar";
import logo from "./img/zest.png";
import { RaisedButton } from "material-ui";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#ffaa2d"
  }
});

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.goToRecipePage = this.goToRecipePage.bind(this);
  }

  handleClick = e => {
    e.preventDefault();
  };

  goToRecipePage(e) {
    e.preventDefault();
    this.props.handler(e, {
      goToRecipePage: true,
      userWantsToSeeHomePage: false
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="flex-container fc-overall" id="main-screen">
          <div className="flex-container-left">
            <div className="hs-logo-container flex-item">
              <img src={logo} alt="logo" />
            </div>

            <div className="flex-item">
              <div>
                <h2>Cook with Zest</h2>
                <p>
                  We make it easy for you to make conversions, cook for any
                  number of people, and adjust <b>Food Network</b> recipes to
                  your needs!
                </p>
                <p>
                  <i>Don't let cooking be a test, use Zest!</i>
                </p>
              </div>
            </div>

            <div className="flex-item">
              <HomeScreenSearchBar handler={this.props.handler} />
            </div>
          </div>
          <div id="vertical-line" />
          {!this.props.user && (
            <div className="flex-container-right">
              <div id="login-div">
                <h2>LOGIN</h2>
                <h4>
                  Want to <i>save</i> your recipes?
                </h4>
                <div className="flex-item">
                  <LogInWithFacebookButton handler={this.props.handler} />
                </div>
              </div>
            </div>
          )}
          {this.props.user && (
            <div className="flex-container-right">
              <div id="login-div">
                <h2>You're Already Logged In!</h2>
                <div className="flex-item">
                  <RaisedButton
                    label="Continue"
                    onClick={this.goToRecipePage}
                    backgroundColor="#ffaa2d"
                    labelColor="white"
                    rippleStyle={{
                      color: "white"
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default HomePage;
