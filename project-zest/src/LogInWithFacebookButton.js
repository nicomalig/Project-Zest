import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {firebase, provider} from './FirebaseConfig'

class LogInWithFacebookButton extends Component {
   constructor(props) {
      super(props);
      this.state = {
         user: null
      }
      this.login = this.login.bind(this)
   }

   login() {
    console.log("LOGIN")
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        var currentUser = result.user;
        this.props.handler({user: currentUser})
        // ...
        }).catch(function(error) {
        // // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // // The email of the user's account used.
        // var email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // // ...
    });       
}

   render() {
      return (
        <div className="form">
            <div className="login">
                <RaisedButton className="facebook-login" label="Log in with Facebook" onClick={this.login}/>
            </div> 
        </div>
      );
   }
}

export default LogInWithFacebookButton;
