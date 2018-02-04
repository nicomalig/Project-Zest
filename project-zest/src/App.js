import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
         <div className="App">
            <h1>blank space</h1>

         </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
