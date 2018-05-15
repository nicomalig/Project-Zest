import React, { Component } from "react";
import FavoriteButton from "./FavoriteButton";
import "./RecipeSummaryCard.css";

class RecipeSummaryCard extends Component {
   // componentWillReceiveProps(nextProps) {
   //   this.setState({
   //     url: nextProps.url,
   //     user: nextProps.user
   //   });
   // }

   render() {
      return (
         <div className="rs-card" /* id="recipe-summary-div" */>
            <div id="recipe-name-bar">
               <span id="recipe-name">Simple Chocolate Chip Cookies</span>
               <FavoriteButton
                  url={this.props.url}
                  user={this.props.user}
                  handler={this.props.handler}
               />
            </div>
            <div id="recipe-img">
               <img
                  src={require("./img/chocolateChipCookies.jpg")}
                  width="400"
                  height="240"
                  alt="recipe"
               />
            </div>
            <div id="recipe-information">
               <p>Total: 1hr 20min</p>
               <p>Prep: 5min</p>
               <p>Inactive: 45min</p>
               <p>Cook: 30min</p>
               <hr />
               <span>
                  <p>Yield: 30 cookies</p> <button> Edit </button>
               </span>
            </div>
         </div>
      );
   }
}

export default RecipeSummaryCard;
