import React, { Component } from "react";
import "./SavedRecipeCard.css";
import {
   Card,
   CardMedia,
   CardActions,
   CardTitle,
   CardText
} from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";

const cardStyle = {
   // nothing here yet
}

const actionStyle = {
   // nothing here yet
}

class SavedRecipeCard extends Component {
   handleClick = e => {
      e.preventDefault();
   };

   render() {
      var image = this.props.image;
      if (!image) {
         image = require("./img/defaultImageSaved.png");
      }
      return (
         <div className="saved-recipe-card">
            <Card style={cardStyle}>
               <CardMedia>
                  <img src={image} />
               </CardMedia>
               <CardTitle title={this.props.name} />
               <CardActions style={actionStyle}>
                  <RaisedButton
                     primary={true}
                     backgroundColor="#FFAA2E"
                     hoverColor="#f2940c"
                     color="#FFFFFF"
                     label="View Now"
                  />
               </CardActions>
            </Card>
         </div>
      );
   }
}

export default SavedRecipeCard;
