import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as firebase from "firebase";
import Recipe from './Recipe';

class SignOutButton extends Component {
   constructor(props) {
      super(props);
      this.state = {
         user: null
      }
      this.signOut = this.signOut.bind(this)   
   }

   signOut(e) {
    e.preventDefault();
        firebase.auth().signOut().then(() => {
            this.props.handler(e, {user:null})
        });
    }

   render() {
       console.log(this.props.user)
      return (
         <div>
            {this.props.user &&
                <RaisedButton className="signout-button" label="Signout" onClick={this.signOut}/>
            }
            {!this.props.user &&
              <p>Signed out!</p>
            }
         </div>
      );
   }
}

export default SignOutButton;
