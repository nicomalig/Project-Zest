import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as firebase from "firebase";
import Recipe from './Recipe';
import Landing from './Landing';

class SignOutButton extends Component {
   constructor(props) {
      super(props);
      this.state = {
         user: null
      }
      
   }


   signOut() {
        firebase.auth().signOut().then(() => {
            this.setState({
              user: null, 
              checked: false
            });
        });
    }

   render() {
       console.log(this.props.user)
      return (
         <div>
            {this.props.user &&
                <RaisedButton className="signout-button" label="Signout" onClick={this.props.signOut}/>
            }
            {!this.props.user &&
              <p>Signed out!</p>
            }
         </div>
      );
   }
}

export default SignOutButton;
