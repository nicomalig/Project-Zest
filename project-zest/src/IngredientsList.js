import React, { Component } from "react";

class IngredientsList extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     url: props.url,
  //     user: props.user
  //   };
  // }

  componentWillReceiveProps(nextProps) {
    this.setState({
      url: nextProps.url,
      user: nextProps.user
    });
  }

  render() {
    console.log(this.props.user);
    return (
      <div id="ingredients-list" className="flex-item">
        <form>
          <input type="checkbox" name="li1" value="cup" />
          <span>2 1/4</span> <span className="cup">cups</span> all-purpose flour
          <hr />
          <input type="checkbox" name="li1" value="tsp" />
          <span>1</span> <span>teaspoon</span> baking soda
          <hr />
          <input type="checkbox" name="li2" value="Tbs" />
          <span>12</span> <span>tablespoons</span> unsalted butter, at room
          temperature
          <hr />
          <input type="checkbox" name="li3" value="cup" />
          <span>3/4</span> <span>cup</span> packed light brown sugar
          <hr />
          <input type="checkbox" name="li4" value="cup" />
          <span>2/3</span> <span>cup</span> granulated sugar
          <hr />
          <input type="checkbox" name="li5" value="none" />
          <span>2</span> large eggs
          <hr />
          <input type="checkbox" name="li6" value="tsp" />
          <span>1</span> <span>teaspoon</span> pure vanilla extract
          <hr />
          <input type="checkbox" name="li7" value="none" />
          One 12-ounce bag semisweet chocolate chips
          <hr />
        </form>
      </div>
    );
  }
}

export default IngredientsList;
