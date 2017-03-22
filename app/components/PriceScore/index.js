/*
Price Score Component
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import React from 'react';
import CSSModules from 'react-css-modules';

// app
import dollarRatingEmpty from 'assets/images/dollar-rating-empty.png';
import dollarRatingFull from 'assets/images/dollar-rating-full.png';

// local
import styles from './styles.css';


/*
Price Score
================================================================================
*/
@CSSModules(styles)
class PriceScore extends React.Component {

  static propTypes = {
    score: React.PropTypes.number,
  }

  render () {
    let {
      score,
    } = this.props;

    const dollarRatingUrls = [
      dollarRatingEmpty,
      dollarRatingEmpty,
      dollarRatingEmpty,
      dollarRatingEmpty,
      dollarRatingEmpty,
    ];

    // some good ol' defensive programming
    if (score < 0) {
      score = 0;
    }
    else if (score > 10) {
      score = 10;
    }

    // Round the score so that it exists on a 0 - 10 scale.  Rounding is
    // important for composite scores (i.e. average of many data points). Other
    // methods like `Math.floor` or `parseInt` seem unfair (ex: score === 7.9).
    score = Math.round(score);

    // normalize the score on our 5 dollar scale (indexes 0 - 4)
    const normalizedScore = (score - 1) / 2;

    // choose the right dollar rating image for each point in the dollar scale
    let dollarIndex = 0;
    for (; dollarIndex < normalizedScore; dollarIndex++) {
      dollarRatingUrls[dollarIndex] = dollarRatingFull;
    }

    // build the dollar rating <img>s
    const dollarRatingImages = dollarRatingUrls.map((url, dollarIndex) => {
      return (
        <img src={url} alt="" key={dollarIndex} styleName="price-score__icon" />
      );
    });

    return (
      <div styleName="price-score">
        {dollarRatingImages}
      </div>
    );
  }

}

export default PriceScore;
