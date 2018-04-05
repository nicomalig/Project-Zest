import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Landing from './Landing';
import * as firebase from "firebase";
import RaisedButton from 'material-ui/RaisedButton';
import {
	BrowserRouter as Router,
	Route,
	Link
  } from 'react-router-dom'

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

// const ShowLandingPageButton = () => (
// 	<div className="flex-item">
// 		<div>
// 			<RaisedButton 
// 				label="Show Landing Page"
// 				containerElement={<Link to={"/landing"} />}
// 			/>
// 		</div>
// 		<div>
// 			<Route 
// 				path="/landing" 
// 				render={(props) => <Landing {...props} db={database} />} />
// 		</div>
// 	</div>
// )

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
			"buttonLabel": "Show Landing"
		}
    }

	handleClick = (e) => {
		e.preventDefault();

		console.log(e.target.id);
		
		if (e.currentTarget.id === "ld") {
			if (this.state.buttonLabel === "Show Landing") {
				this.setState({
					"buttonLabel": "Hide Landing"
				})
			} else {
				this.setState({
					"buttonLabel": "Show Landing"
				})
			}
		}
	}
	
	render() {
		return (
			<Router>
				<MuiThemeProvider muiTheme={muiTheme}>
					<div className="App flex-container">
						<div className="flex-row">
							<div className="flex-item">
								<img src={require('./img/zest.png')} 
									width='118' height='130.25' alt="zest logo" />
							</div>
							{/* Show Landing Page Button */}
							<div className="flex-item">
								<div>
									<RaisedButton
										data-id="ld"
										label={this.state.buttonLabel}
										containerElement={<Link to={"/landing"} />}
										onClick={this.handleClick}
									/>
								</div>
								<div>
									<Route 
										path="/landing" 
										render={(props) => <Landing {...props} db={database} />} />
								</div>
							</div>
						</div>
					</div>
				</MuiThemeProvider>
			</Router>
		);
	}
}

export default App;
