import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class SearchBar extends Component {
   constructor(props) {
      super(props);
      this.state = {
         url: "", 
         errorText: ""
      }
      this.handleChange = this.handleChange.bind(this)
   }

   handleChange(e, newValue) {
    e.preventDefault();
    console.log(newValue)
    this.setState({url:newValue})
   }

   isValidURL(str){ 
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
  }

    onSearchClick = (e) => {
      e.preventDefault();
      // Verify email address is formatted properly
      if (this.isValidURL(this.state.url)) {
        this.setState({errorText:""})
        this.props.handler(e, {url:this.state.url})
      } else {
        this.setState({errorText:"Enter a valid URL"})
      }
    }

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
            <RaisedButton label="let's get zesty" onClick={this.onSearchClick}/>
        </div>
      );
   }
}

export default SearchBar;
