import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Landing extends Component {
   constructor(props) {
      super(props);
      this.state = {
         user: null
      }
   }

   render() {
      return (
        <div className="form">
            {/* <TextField
                floatingLabelText="email"
                value={this.props.email}
                onChange={this.props.handleChange}
            />
            <br /> */}
            <br />
            <br />
            <div className="login">
                <RaisedButton className="facebook" label="Log in with Facebook" onClick={this.props.login}/>
            </div> 
            <br />
        </div>
      );
   }
}

export default Landing;
