import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
   palette: {
      primary1Color: '#ffaa2d'
   }
});

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
           user: null
        }
     }
   handleClick = (e) => {
      e.preventDefault();
   }

   render() {
      return (
         <MuiThemeProvider muiTheme={muiTheme}>
               <div className="flex-container">
                 <p> RECIPE PAGE</p>
            </div>
         </MuiThemeProvider>
      );
   }
}

export default Recipe;
