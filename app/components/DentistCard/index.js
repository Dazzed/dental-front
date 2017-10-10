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
      The affordability index rates each dentist treatment fees against other dentist in their zip code,
      a lower score shows more affordable pricing while a higher score shows less affordable pricing
    </p>
    </Popover>
  );
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

function DentistCard(dentist) {
  const rating = 10;
  
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
    handleClick
  } = dentist;

  return (
    <li
      styleName={`dentist-list-item ${active ? 'active' : ''}`}
      onMouseEnter={() => updateActiveId(id)}
      onClick={() => handleClick(userId)}
    >
      <div styleName="left">
        <div styleName="avatar" style={{ backgroundImage: `url(${avatar})` }}></div>
        <div styleName="rating">
          <ReviewScore score={rating} />
        </div>
      </div>
      <div styleName="right">
        <div styleName="name">{firstName} {lastName}</div>
        <div styleName="type">{type}</div>

        <div styleName="location">{city}, {US_STATES[state]}</div>
        {renderAffordabilityScore(affordabilityScore)}
        <div styleName="plan-cost">Plans starting at: <span styleName="price">${planStartingCost}</span></div>
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
