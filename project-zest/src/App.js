import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Landing from './Landing';
import * as firebase from "firebase";

var config = {
    apiKey: "AIzaSyABka5H54O_iaPXXm16sW2b_7PmkybOfP8",
    authDomain: "zest-de7b0.firebaseapp.com",
    databaseURL: "https://zest-de7b0.firebaseio.com",
    projectId: "zest-de7b0",
    storageBucket: "zest-de7b0.appspot.com",
    messagingSenderId: "173225663428"
  };
  
 firebase.initializeApp(config);
 var database = firebase.database();

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: '#ffaa2d'
	}
});


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

	handleClick = (e) => {
		e.preventDefault();
	}
	
	render() {
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<div className="App flex-container">
					<div className="flex-row">
						<div className="flex-item">
                            <img src={require('./img/zest.png')} 
                                width='118' height='130.25' alt="zest logo" />
						</div>
						<Landing handleClick={this.handleClick} db={database} />
					</div>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
