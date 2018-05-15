import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import IsUrl from "is-url";

class MainScreenSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorText: "",
      url: props.url
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // componentDidMount(newValue) {
  //   this.setState({
  //     url: this.props.url
  //   });
  // }

  handleChange(e, newValue) {
    e.preventDefault();
    this.setState({ url: newValue });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      url: nextProps.url,
      user: nextProps.user
    });
  }

  onSearchClick = e => {
    e.preventDefault();
    // Verify email address is formatted properly
    if (IsUrl(this.state.url)) {
      this.props.handler(e, { url: this.state.url });
      this.setState({ errorText: "", url: this.state.url });
    } else {
      this.setState({ errorText: "Enter a valid URL" });
    }
  };

  render() {
    return (
      <div className="form flex-item">
        <TextField
          className="rec-search"
          floatingLabelText="Paste recipe URL here"
          value={this.state.url}
          onChange={this.handleChange}
          errorText={this.state.errorText}
          fullWidth={true}
        />
        <RaisedButton label="Search" onClick={this.onSearchClick} />
      </div>
    );
  }
}

export default MainScreenSearchBar;
