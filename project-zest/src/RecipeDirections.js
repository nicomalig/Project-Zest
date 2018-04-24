import React, { Component } from "react";

class RecipeDirections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  render() {
    console.log(this.props.user);
    return (
      <div id="direction-div" className="flex-item">
        <h3>Directions</h3>
        <p>
          Position 2 racks in the center of the oven, and preheat to 375 degrees
          F. Line 2 baking sheets with parchment.
        </p>
        <p>
          Whisk together the flour, baking soda and 1 teaspoon salt in a large
          bowl.
        </p>
        <p>
          Beat the butter and both sugars on medium-high speed in the bowl of a
          stand mixer fitted with a paddle attachment (or in a large bowl if
          using a handheld mixer) until light and fluffy, about 4 minutes. Add
          the eggs, one at time, beating after each addition to incorporate.
          Beat in the vanilla. Scrape down the side of the bowl as needed.
          Reduce the speed to medium, add the flour mixture and beat until just
          incorporated. Stir in the chocolate chips.
        </p>
        <p>
          Scoop 12 heaping tablespoons of dough about 2 inches apart onto each
          prepared baking sheet. Roll the dough into balls with slightly wet
          hands. Bake, rotating the cookie sheets from upper to lower racks
          halfway through, until golden but still soft in the center, 12 to 15
          minutes (the longer the cook time, the crunchier the cookies). Let
          cool for a few minutes on the baking sheet, and then transfer to a
          rack to cool completely.
        </p>
        <p>
          Let the baking sheets cool completely, scoop the remaining dough onto
          1 sheet and bake. Store the cookies in a tightly sealed container at
          room temperature for up to 5 days.
        </p>
      </div>
    );
  }
}

export default RecipeDirections;