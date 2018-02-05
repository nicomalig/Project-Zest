import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Landing from './Landing';

const muiTheme = getMuiTheme({
   palette: {
      primary1Color: '#ffaa2d'
   }
});

class App extends Component {
   handleClick = (e) => {
      e.preventDefault();
   }
   
   render() {
      return (
         <MuiThemeProvider muiTheme={muiTheme}>
            <div className="App flex-container">
               <div className="flex-row">
                  <div className="flex-item">
                     <img src={require('./img/zest.png')} width='118' height='130.25' />
                  </div>
                  <Landing handleClick={this.handleClick}/>
               </div>
            </div>
         </MuiThemeProvider>
      );
   }
}

export default App;
