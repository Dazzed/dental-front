import React from 'react';
import CSSModules from 'react-css-modules';

import toothRatingEmpty from 'assets/images/tooth-rating-empty.png';
import toothRatingHalf from 'assets/images/tooth-rating-half.png';
import toothRatingFull from 'assets/images/tooth-rating-full.png';
import $ from 'assets/scripts/jquery.min';

import styles from './styles.css';

const emptyTooths = [
  toothRatingEmpty,
  toothRatingEmpty,
  toothRatingEmpty,
  toothRatingEmpty,
  toothRatingEmpty
];


@CSSModules(styles)
class ReviewScore extends React.Component {

  componentWillMount () {
    const { rating } = this.props;
    this.state = {
      rating: rating ? rating : 0
    };
  }

  handleTeethClick = (index, pos) => {
    let { rating } = this.state;
    rating = pos <= 12 ? index - 0.5 : index;
    this.setState({ rating }, () => this.props.onRate(rating));
  }

  componentDidMount = () => {
    const thiz = this;
    $('.teeth').click(function (e) {
      const offset = $(this).offset();
      const relativeX = (e.pageX - offset.left);
      thiz.handleTeethClick($(this).data('index'), Math.floor(relativeX));
    });
  }

  componentWillReceiveProps(newProps) {
    if (this.props.rating !== newProps.rating && newProps.rating) {
      this.setState({
        rating: newProps.rating
      });
    }
  }
  
  renderTooths = () => {
    const { rating } = this.state;
    const toothArray = [];
    if (String(rating).includes('.5')) {
      let alteredRating = rating - 0.5;
      for (let i = 1; i <= alteredRating; i++) {
        toothArray.push(
          <img
            src={toothRatingFull}
            alt=""
            key={i - 1}
            styleName="review-score__icon"
            className="teeth"
            data-index={i}
          />
        );
      }
      toothArray.push(
        <img
          src={toothRatingHalf}
          alt=""
          key={alteredRating}
          styleName="review-score__icon"
          className="teeth"
          data-index={alteredRating + 1}
        />
      );
      alteredRating += 2;
      for (let i = alteredRating; i <= 5; i++) {
        toothArray.push(
          <img
            src={toothRatingEmpty}
            alt=""
            key={i - 1}
            styleName="review-score__icon"
            className="teeth"
            data-index={i}
          />
        );
      }
    } else {
      const alteredRating = rating;
      for (let i = 1; i <= alteredRating; i++) {
        toothArray.push(
          <img
            src={toothRatingFull}
            alt=""
            key={i - 1}
            styleName="review-score__icon"
            className="teeth"
            data-index={i}
          />
        );
      }
      for (let i = alteredRating + 1; i <= 5; i++) {
        toothArray.push(
          <img
            src={toothRatingEmpty}
            alt=""
            key={i - 1}
            styleName="review-score__icon"
            className="teeth"
            data-index={i}
          />
        );
      }
    }
    return toothArray.map(tooth => tooth);
  }

  renderEmptyTooths = () => {
    return emptyTooths.map((url, index) => {
      return (
        <img
          src={url}
          alt=""
          key={index}
          styleName="review-score__icon"
          className="teeth"
          data-index={index + 1}
        />
      );
    });
  }

  render () {
    const { rating } = this.state;
    if (rating === 0) {
      return (
        <div styleName="review-score">
          {this.renderEmptyTooths()}
        </div>
      );
    } else {
      return (
        <div styleName="review-score">
          {this.renderTooths()}
        </div>
      );
    }
  }
}

export default ReviewScore;
