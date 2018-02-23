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
         email: '',
         errorText: '',
         displayForm: true
      }
   }

   writeUserData(email) {
      database.ref('/').push().set({
         email: email
      });
   }

   handleClick = (e) => {
      e.preventDefault();

      // Verify email address is formatted properly
      if (this.state.email != "") {
         // Store email in Firebase database
         this.writeUserData(this.state.email);
         this.setState({
            email: '',
            errorText: '',
            displayForm: false
         });
         console.log(this.state.email + ' saved!');
      } else {
         this.setState({errorText: 'Email cannot be blank'});
      }
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
            <p><i> -Team Happy Cappy</i></p>

            {this.state.displayForm &&
               <div className="form">
                  <TextField
                     floatingLabelText="email"
                     value={this.state.email}
                     onChange={this.handleChange}
                     errorText={this.state.errorText}
                  />
                  <br />
                  <RaisedButton label="let's get zesty" onClick={this.handleClick}/>
                  <br />
               </div>
            }
            {!this.state.displayForm &&
               <div>
                  <h4 className="in">You're in! We'll talk to you soon.</h4>
               </div>
            }
         </div>
      );
   }
}

export default Landing;
