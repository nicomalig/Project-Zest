import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import IsUrl from "is-url";
import "./App.css";

class HomeScreenSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      errorText: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.isFoodNetworkUrl = this.isFoodNetworkUrl.bind(this);
  }

  handleChange(e, newValue) {
    e.preventDefault();
    this.setState({ url: newValue });
  }

  isFoodNetworkUrl(url) {
    if (IsUrl(url)) {
      var regex = new RegExp(
        `https:\/\/www\.foodnetwork\.com\/recipes\/[a-z\-\/\d]+`
      );
      if (regex.test(url)) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  onSearchClick = e => {
    e.preventDefault();
    // Verify email address is formatted properly
    if (this.isFoodNetworkUrl(this.state.url)) {
      this.setState({ errorText: "" });
      this.props.handler(e, {
        url: this.state.url,
        goToRecipePage: true,
        userWantsToSeeHomePage: false,
        urlChange: true
      });
    } else {
      this.setState({ errorText: "Enter a valid Food Network Recipe URL" });
    }
  };

  render() {
    return (
      <div className="form flex-item">
        <TextField
          className="hs-search"
          floatingLabelText="Paste Food Network URL here"
          value={this.state.url}
          onChange={this.handleChange}
          errorText={this.state.errorText}
          fullWidth={true}
          underlineStyle={{
            borderColor: "#B06800" /* a bit darker */
          }}
        />
        <br />
        <RaisedButton label="Start Cooking!" onClick={this.onSearchClick} />
      </div>
    );
  }
}

export default HomeScreenSearchBar;
