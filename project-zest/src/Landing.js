import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as firebase from "firebase";
import Recipe from './Recipe';
import SignOutButton from './SignOutButton';

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
         displayForm: true, 
         user: null, 
         checked: false
      }
      this.signOut = this.signOut.bind(this)
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
        var currentUser = result.user;
        console.log("login")
        console.log(currentUser)
        console.log("useruser")
        this.setState({user: currentUser})
        console.log(this.state.user)
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

       // Sign out of an account
   signOut() {
        firebase.auth().signOut().then(() => {
            this.setState({
              user: null, 
              checked: false
            });
        });
    }

    // Toggle between 'sign-up' and 'sign-in'
    toggleLogin() {
        let option = this.state.authOption === 'sign-in' ? 'sign-up' : 'sign-in';
        this.setState({authOption:option});
    }

    goToRecipe() {
        window.location = 'Recipe.js';
    }

       // When component mounts, check the user
       componentDidMount() {
        // Check for authentication state change (test if there is a user)
        firebase.auth().onAuthStateChanged((user) => {
            if (this.state.checked !== true) {
                if (user) {
                    this.setState({
                      user: user,
                      displayForm: false
                    })
                    console.log("user: " + user.displayName)
                }
            }

            // Indicate that state has been checked
            this.setState({checked:true})
        });
    }

   render() {
      return (
         <div className="flex-item">
            <h2>Don't let cooking be a test, use zest!</h2>
            <p>We've got cool stuff coming. Stay in the loop!</p>
            <p><i> -Team Happy Cappy</i></p>

            {!this.state.user &&
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
                  <br />
                  <div className="login">
                    <RaisedButton className="facebook" label="Log in with Facebook" onClick={this.login}/>
                  </div> 
                  <br />
               </div>
            }
            {this.state.user &&
               <div>
                  <Recipe user={this.state.user}/>
                  <SignOutButton user={this.state.user} signOut ={this.signOut}/>
               </div>
            }
         </div>
      );
   }
}

export default Landing;
