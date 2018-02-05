import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class Landing extends Component {
   constructor(props) {
      super(props);
      this.state = {
         email: ''
      }
   }

   handleClick = (e) => {
      e.preventDefault();
      alert(this.state.email);
      // Verify email address is formatted

      // Store email in 
   }

   handleChange = (e, newValue) => {
      e.preventDefault();
      this.setState({email: newValue})
   }

   render() {
      return (
         <div className="flex-item">
            <h2>Don't let cooking be a test, use zest!</h2>
            <p>We've got cool stuff coming. Stay in the loop!</p>
            <br />
            <TextField
               floatingLabelText="email"
               value={this.state.value}
               onChange={this.handleChange}
            />
            <br />
            <RaisedButton label="let's get zesty" onClick={this.handleClick}/>

         </div>
      );
   }
}

export default Landing;
