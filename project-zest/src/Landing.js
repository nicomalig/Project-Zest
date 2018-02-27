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
var provider = new firebase.auth.FacebookAuthProvider();
provider.addScope('email');
provider.setCustomParameters({
    'display': 'popup'
  });
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

   login() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });       
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
                  <div className="login">
                    <RaisedButton className="facebook" label="Login with Facebook" onClick={this.login}/>
                  </div> 
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
