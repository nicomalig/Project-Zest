import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from "firebase";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Landing from './Landing';
import Recipe from './Recipe';
import SignOutButton from './SignOutButton';
import SearchBar from './SearchBar';

const muiTheme = getMuiTheme({
   palette: {
      primary1Color: '#ffaa2d'
   }
});

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

class App extends Component {
//    handleClick = (e) => {
//       e.preventDefault();
//    }
constructor(props) {
    super(props)
    this.state = {
        user: null, 
        url: ""
     }
    this.signOut = this.signOut.bind(this)
    // this.mergeStateOut = this.mergeStateOut.bind(this)
    this.login = this.login.bind(this)
    // this.handleChange=this.handleChange.bind(this)
}
    writeUserData(email) {
        database.ref('/').push().set({
        email: email
        });
    }

    onSearchClick = (e) => {
        e.preventDefault();

        // Verify email address is formatted properly
        if (this.state.url != "") {
        // Store email in Firebase database
        this.writeUserData(this.state.email);
        this.setState({
            email: '',
            displayForm: false
        });
        console.log(this.state.email + ' saved!');
        }
    }

    // handleChange = (e, newValue) => {
    //     e.preventDefault();
    //     this.setState({email: newValue})
    // }

    login() {
        console.log("LOGIN")
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var currentUser = result.user;
        console.log("login")
        console.log(currentUser)
        console.log("useruser")
        this.setState({user: currentUser})
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
                user: null
            });
        });
    }

     // When component mounts, check the user
     componentDidMount() {
      // Check for authentication state change (test if there is a user)
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.setState({
                user: user
            })
            console.log("user: " + user.displayName)
        }
      });
  }

    // Capture state from child component
    // PROTIP:
    // Pass in as <MyComponent mergeStateOut={this.mergeStateOut} />
    // mergeStateOut(incomingState) {
    //     this.setState(incomingState)
    //   }

    //   merge() {
    //     console.log("merge")
    //   }

   render() {
       console.log(this.state.user)
      return (
         <MuiThemeProvider muiTheme={muiTheme}>
            <div className="App flex-container">
                <div className="search"> 
                    <div className="flex-row">
                        <div className="flex-item">
                            <SearchBar onSearchClick={this.onSearchClick}/>
                        </div>
                    </div>
            </div>
               <div className="flex-row">
                  <div className="flex-item">
                     <img src={require('./img/zest.png')} width='118' height='130.25' />
                  </div>
                  <div className="flex-item">
                    <h2>Don't let cooking be a test, use zest!</h2>
                    <p>We've got cool stuff coming. Stay in the loop!</p>
                    <p><i> -Team Happy Cappy</i></p>
                    {!this.state.user &&
                        <div>
                            <Landing user={this.props.user} login={this.login} />
                        </div>
                    }
                    {this.state.user &&
                    <div>
                        <Recipe user={this.state.user}/>
                        <SignOutButton user={this.state.user} signOut ={this.signOut}/>
                    </div>
                    }
                </div>
               </div>
            </div>
         </MuiThemeProvider>
      );
   }
}

export default App;
