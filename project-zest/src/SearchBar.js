import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class SearchBar extends Component {
   constructor(props) {
      super(props);
      this.state = {
         url: ""
      }
      this.handleChange = this.handleChange.bind(this)
   }
   getInitialState() {
    return {
      url: ""
    }
  }

   handleChange(e, newValue) {
    e.preventDefault();
    console.log(newValue)
    this.setState({url:newValue})
   }

   render() {
      return (
        <div className="form">
            <TextField
                floatingLabelText="Paste recipe URL here"
                value={this.state.url}
                onChange={this.handleChange}
            />
            <br />
            <RaisedButton label="let's get zesty" onClick={this.props.onSearchClick}/>
        </div>
      );
   }
}

export default SearchBar;
