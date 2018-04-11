import React, { Component } from "react";
// import TextField from "material-ui/TextField";
// import RaisedButton from "material-ui/RaisedButton";
import IsUrl from "is-url";

class MainScreenSearchBar extends Component {
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
      <div class="section">
        <form action="#" id="search-form">
          <div class="field has-addons">
            <p class="control is-expanded">
              <input
                type="text"
                id="url-input"
                class="input is-fullwidth"
                placeholder="Paste Link to Recipe here"
                value={this.state.url}
                onChange={this.handleChange}
                errorText={this.state.errorText}
              />
            </p>
            <p class="control">
              <button
                type="submit"
                id="search-button"
                class="button is-primary"
                title="get page summary"
                aria-label="get page summary"
                onClick={this.onSearchClick}
              >
                <span class="icon is-small">
                  <i class="fa fa-search" aria-hidden="true" />
                </span>
              </button>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default MainScreenSearchBar;
