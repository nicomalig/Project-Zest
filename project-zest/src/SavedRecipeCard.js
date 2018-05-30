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

class SavedRecipeCard extends Component {
  handleClick = e => {
    e.preventDefault();
  };

  render() {
    var image = this.props.image;
    if (!image) {
      image = require("./img/defaultImage.png");
    }
    return (
      <div className="saved-recipe-card">
        <Card>
          <CardMedia>
            <img src={image} width="200px" height="200px" />
          </CardMedia>
          <CardTitle title={this.props.name} />
          <CardActions>
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
