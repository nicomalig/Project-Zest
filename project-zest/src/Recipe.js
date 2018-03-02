import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Landing from './Landing';
import SignOutButton from './SignOutButton';

const muiTheme = getMuiTheme({
   palette: {
      primary1Color: '#ffaa2d'
   }
});

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
           email: '',
           errorText: '',
           displayForm: true, 
           user: null, 
           checked: false
        }
     }
   handleClick = (e) => {
      e.preventDefault();
   }

   render() {
      return (
         <MuiThemeProvider muiTheme={muiTheme}>
            <div className="App flex-container">
               <div className="flex-row">
                 <p> RECIPE PAGE
                 </p>
               </div>
            </div>
         </MuiThemeProvider>
      );
   }
}

export default Recipe;
