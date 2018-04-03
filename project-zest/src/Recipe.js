import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
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

               <div className="flex-container">
                 <p> RECIPE PAGE</p>
            </div>
            <div>
              <p>Welcome {this.props.user.displayName}</p>
              <SignOutButton user={this.props.user} handler={this.props.handler}/>
             </div>
         
         </MuiThemeProvider>
        }
        </div>
      );
   }
}

export default Recipe;
