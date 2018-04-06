import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SignOutButton from './SignOutButton';
import RaisedButton from 'material-ui/RaisedButton';


const muiTheme = getMuiTheme({
   palette: {
      primary1Color: '#ffaa2d'
   }
});

class SavedRecipes extends Component {
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
          <div>
            {this.props.user && 
         <MuiThemeProvider muiTheme={muiTheme}>
            <div>
              <p>Saved Recipes for {this.props.user.displayName}</p>
              <RaisedButton className="go-home-button" label="Search for Recipes" /*onClick={ GO TO SAVED RECIPES PAGE }*/ /> 
              <SignOutButton user={this.props.user} handler={this.props.handler} />
             </div>
         
         </MuiThemeProvider>
        }
        </div>
      );
   }
}

export default SavedRecipes;
