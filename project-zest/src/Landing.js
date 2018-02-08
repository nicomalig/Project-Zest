import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as firebase from "firebase";

var config = {
   apiKey: "AIzaSyABka5H54O_iaPXXm16sW2b_7PmkybOfP8",
   authDomain: "zest-de7b0.firebaseapp.com",
   databaseURL: "https://zest-de7b0.firebaseio.com",
   storageBucket: "",
};
firebase.initializeApp(config);
var database = firebase.database();

class Landing extends Component {
   constructor(props) {
      super(props);
      this.state = {
         email: ''
      }
   }

   writeUserData(email) {
      database.ref('/').push().set({
         email: email
      });
   }

   handleClick = (e) => {
      e.preventDefault();
      // Verify email address is formatted

      // Store email in firebase database
      this.writeUserData(this.state.email);
      this.setState({email: ''});
      alert(this.state.email + ' saved to Firebase Database');
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
               value={this.state.email}
               onChange={this.handleChange}
            />
            <br />
            <RaisedButton label="let's get zesty" onClick={this.handleClick}/>

         </div>
      );
   }
}

export default Landing;
