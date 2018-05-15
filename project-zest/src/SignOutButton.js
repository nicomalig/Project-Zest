import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import * as firebase from "firebase";

class SignOutButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.signOut = this.signOut.bind(this);
  }

  signOut(e) {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.handler(e, {
          user: null,
          goToRecipePage: false
        });
      });
  }

  render() {
    return (
      <div>
        {this.props.user && (
          <RaisedButton
            className="signout-button"
            label={"Sign Out " + this.props.user.displayName}
            onClick={this.signOut}
            backgroundColor="#A80B00"
            labelColor="#FFF"
            style={{
              verticalAlign: "center"
            }}
          />
        )}
      </div>
    );
  }
}

export default SignOutButton;
