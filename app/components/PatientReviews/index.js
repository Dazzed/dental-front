/*
Patient Reviews Component
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import moment from 'moment';
import React from 'react';
import CSSModules from 'react-css-modules';

// app
import ReviewScore from 'components/ReviewScore';

// local
import styles from './styles.css';


/*
Patient Reviews
================================================================================
*/
@CSSModules(styles, { allowMultiple: true })
class PatientReviews extends React.Component {

  static propTypes = {
    // passed in - data
    reviewer: React.PropTypes.object.isRequired,
    reviews: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    user: React.PropTypes.object.isRequired,

    // passed in - event handlers
    onRemoveReview: React.PropTypes.func,
    onUpdateReview: React.PropTypes.func,
  }

  /*
  Delegated Controls
  ------------------------------------------------------------
  */
  // NOTE: The following functions must be bound to the review.
  onRemoveReviewClick = (review) => {
    this.props.onRemoveReview(review);
  }

  onUpdateReviewClick = (review) => {
    this.props.onUpdateReview(review);
  }

  /*
  Render an Individual Review
  ------------------------------------------------------------
  */
  renderReview = (review) => {
    const {
      // data
      reviewer,
      user,
    } = this.props;

    const {
      createdAt,
      id,
      message,
      rating,
    } = review;

    const reviewDate = moment(createdAt).format("MMMM D, YYYY");

    return (
      <div key={id} styleName="review divided-row">
        <div className="row">
          <div className="col-sm-offset-2 col-sm-10">

            <div className="row" styleName="review__header">
              <div className="col-sm-6">
                <ReviewScore score={rating} />
              </div>

              <div className="col-sm-6" styleName="review__date">
                Review Date:
                {' '}
                <span styleName="review__info">{reviewDate}</span>
              </div>
            </div>

            <p styleName="review__message">
              {/* NOTE: Character codes are the fancy left and right quotes. */}
              &#8220;{message}&#8221;
            </p>

            {user.type === "client" && (
              <div styleName="review__controls">
                <input
                  type="button"
                  styleName="button--wide"
                  value="REMOVE REVIEW"
                  onClick={this.onRemoveReviewClick.bind(this, review)}
                />
                <input
                  type="button"
                  styleName="button--wide"
                  value="EDIT REVIEW"
                  onClick={this.onUpdateReviewClick.bind(this, review)}
                />
              </div>
            )}

            {user.type === "dentist" && (
              <div styleName="review__controls">
                <a href={`mailto:${reviewer.client.email}`}>
                  <input
                    type="button"
                    styleName="button--wide"
                    value="REPLY TO REVIEW"
                  />
                </a>
              </div>
            )}

          </div>
        </div>
      </div>
    );
  }

  /*
  Main Render - All Reviews
  ------------------------------------------------------------
  */
  render () {
    const {
      reviews
    } = this.props;

    // precondition: there are no reviews
    if (reviews.length === 0) {
      return null;
    }

    const patientReviewsContent = reviews.map(this.renderReview);

    return (
      <div>
        {patientReviewsContent}
      </div>
    );
  }

}

export default PatientReviews;
