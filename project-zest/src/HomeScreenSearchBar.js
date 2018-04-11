import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import IsUrl from "is-url";

class HomeScreenSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      errorText: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, newValue) {
    e.preventDefault();
    console.log(newValue);
    this.setState({ url: newValue });
  }

  onSearchClick = e => {
    e.preventDefault();
    // Verify email address is formatted properly
    if (IsUrl(this.state.url)) {
      this.setState({ errorText: "" });
      this.props.handler(e, { url: this.state.url });
    } else {
      this.setState({ errorText: "Enter a valid URL" });
    }
  };

  render() {
    return (
      <div className="form">
        <TextField
          floatingLabelText="Paste recipe URL here"
          value={this.state.url}
          onChange={this.handleChange}
          errorText={this.state.errorText}
        />
        <br />
        <RaisedButton label="Start Cooking!" onClick={this.onSearchClick} />
      </div>
    );
  }
}

export default HomeScreenSearchBar;
