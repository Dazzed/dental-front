/*import React from 'react';
import CSSModules from 'react-css-modules';

import toothRatingEmpty from 'assets/images/tooth-rating-empty.png';
import toothRatingHalf from 'assets/images/tooth-rating-half.png';
import toothRatingFull from 'assets/images/tooth-rating-full.png';

import styles from './styles.css';

@CSSModules(styles)
class ReviewScore extends React.Component {

  static propTypes = {
    score: React.PropTypes.number,
  }

  render () {
    let {
      score,
    } = this.props;

    const teethRatingUrls = [
      toothRatingEmpty,
      toothRatingEmpty,
      toothRatingEmpty,
      toothRatingEmpty,
      toothRatingEmpty,
    ];

    // some good ol' defensive programming
    if (score < 0) {
      score = 0;
    }
    else if (score > 10) {
      score = 10;
    }

    // Round the score so that it exists on a 0 - 10 scale.  Rounding is
    // important for composite scores (i.e. average of many reviews).  Other
    // methods like `Math.floor` or `parseInt` seem unfair (ex: score === 7.9).
    score = Math.round(score);

    // normalize the score on our 5 tooth scale (indexes 0 - 4)
    const normalizedScore = (score - 1) / 2;

    // choose the right tooth rating image for each point in the tooth scale
    let toothIndex = 0;
    for (; toothIndex < normalizedScore; toothIndex++) {
      teethRatingUrls[toothIndex] = toothRatingFull;
    }
    if (toothIndex === normalizedScore) {
      teethRatingUrls[toothIndex] = toothRatingHalf;
    }

    // build the tooth rating <img>s
    const teethRatingImages = teethRatingUrls.map((url, toothIndex) => {
      return (
        <img src={url} alt="" key={toothIndex} styleName="review-score__icon" />
      );
    });

    return (
      <div styleName="review-score">
        {teethRatingImages}
      </div>
    );
  }

}

export default ReviewScore;*/
