import React, { Component } from "react";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import IsUrl from "is-url";
import "./Recipe.css";
import logo from "./img/zest.png";
import SignOutButton from "./SignOutButton";

class MainScreenSearchBar extends Component {
   constructor(props) {
      super(props);
      this.state = {
         errorText: "",
         url: props.url
      };
      this.handleChange = this.handleChange.bind(this);
   }

   // componentDidMount(newValue) {
   //   this.setState({
   //     url: this.props.url
   //   });
   // }

   handleChange(e, newValue) {
      e.preventDefault();
      this.setState({ url: newValue });
   }

   componentWillReceiveProps(nextProps) {
      this.setState({
         url: nextProps.url,
         user: nextProps.user
      });
   }

   onSearchClick = e => {
      e.preventDefault();
      // Verify email address is formatted properly
      if (IsUrl(this.state.url)) {
         this.props.handler(e, { url: this.state.url });
         this.setState({ errorText: "", url: this.state.url });
      } else {
         this.setState({ errorText: "Enter a valid URL" });
      }
   };

   render() {
      return (
         <div className="form flex-container-sb">
            <div className="rec-logo-container flex-item fi-sb">
               <img src={logo} alt="logo" />
            </div>

            <div className="flex-item">
               <TextField
                  className="rec-search"
                  floatingLabelText="Food Network URL"
                  value={this.state.url}
                  onChange={this.handleChange}
                  errorText={this.state.errorText}
                  fullWidth={true}
               />
            </div>

            <div className="flex-item fi-sb">
               <RaisedButton
                  className="rec-submit"
                  label="Search"
                  labelColor="rgba(0, 0, 0, .80)"
                  onClick={this.onSearchClick}
               />
            </div>

            <div className="flex-item fi-sb mssb-filler" />

            <div className="flex-item fi-sb">
               {this.props.user &&
                  <FlatButton
                     className="saved-rec-btn"
                     label="Saved Recipes"
                     // backgroundColor="#a0da58"
                     // backgroundColor="#D2FF96"
                     // labelColor="rgba(0, 0, 0, .80)"
                     labelStyle={{color:"rgba(0, 0, 0, .80)"}}
                     hoverColor="#A0DA58"
                  />
               }
            </div>

            <div className="flex-item fi-sb mssb-so">
               {this.props.user &&
                  <SignOutButton
                     user={this.props.user}
                     handler={this.props.handler}
                  />
               }
            </div>


         </div>
      );
   }
}

export default MainScreenSearchBar;
