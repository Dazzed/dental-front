import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Col from 'react-bootstrap/lib/Col';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import FaQuestion from 'react-icons/lib/fa/question';

import { US_STATES } from 'common/constants';
import ReviewScore from 'components/ReviewScore';
import PriceScore from 'components/PriceScore';

import styles from './styles.css';

const renderPopover = () => {
  return (
    <Popover
      id="affordability-score-popover"
      className="popover--large"
      placement="bottom"
    >
      <p>
        The Affordability Index indicates how the dentist’s prices compare to
        other dentists in the same zip code. A lower index indicates a lower
        relative cost to other dentists in the same zip code.
      </p>
    </Popover>
  );
};

const renderReviewScore = score => {
  return <ReviewScore score={score} />;
};

const renderAffordabilityScore = score => {
  return (
    <span>
      <PriceScore affordabilityScore={score} />
      <OverlayTrigger
        overlay={renderPopover()}
        placement="bottom"
        rootClose
        trigger={['click', 'focus', 'hover']}
      >
        <span className={styles['popover-trigger']}>
          <span> (<FaQuestion />) </span>
        </span>
      </OverlayTrigger>
    </span>
  );
};

function DentistCard (dentist) {
  const numReviews = dentist.user.dentistReviews.length;
  const {
    id,
    user: { firstName, lastName, id: userId },
    user: { avatar, dentistSpecialty: { name: type } },
    city,
    state,
    affordabilityScore,
    planStartingCost,
    active,
    updateActiveId,
    handleClick,
    officeName,
    rating,
    memberships,
  } = dentist;

  let startingAdultPrice = "$"
    + memberships
      .find(m => m.active && m.subscription_age_group === 'adult' && m.type === 'month')
      .price
      .replace('.00', '');
  if (startingAdultPrice === undefined) {
    startingAdultPrice = planStartingCost;
  }

  return (
    <li
      styleName={`dentist-list-item ${active ? 'active' : ''}`}
      onMouseEnter={() => updateActiveId(id)}
      onClick={() => handleClick(userId)}
    >
      <div className="row">
        <div className="col-sm-4">
          {avatar && (
            <div styleName="avatar" style={{ backgroundImage: `url(${avatar})` }}></div>
          )}
        </div>
        <div className="col-sm-8">
          <div styleName="name">{officeName}</div>
          <div styleName="type">{type}</div>
          <div styleName="location">{city}, {US_STATES[state]}</div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <div styleName="rating">
            {renderReviewScore(rating)}
          </div>
          <div styleName="review-count">
            {numReviews > 0 ? numReviews : 'no'} reviews
          </div>
          <div styleName="affordability">
            {renderAffordabilityScore(affordabilityScore)}
          </div>
        </div>

        <div className="col-sm-6">
          <div styleName="plan-cost-label">Plans starting at:</div>
          <div styleName="plan-cost">
            <span styleName="price">${startingAdultPrice}</span> / month
          </div>
        </div>
      </div>
    </li>
  );
}

// DentistCard.propTypes = {
//   id: PropTypes.number.isRequired,
//   active: PropTypes.bool,
//   firstName: PropTypes.string.isRequired,
//   lastName: PropTypes.string.isRequired,
//   avatar: PropTypes.string,
//   rating: PropTypes.number.isRequired,
//   type: PropTypes.string.isRequired,
//   affordability: PropTypes.number.isRequired,
//   planStartingCost: PropTypes.number.isRequired,
//   updateActiveId: PropTypes.func.isRequired,
//   handleClick: PropTypes.func.isRequired,
//   dentistInfo: PropTypes.shape({
//     city: PropTypes.string,
//     state: PropTypes.string,
//   }).isRequired,
// };

export default CSSModules(styles, { allowMultiple: true })(DentistCard);
