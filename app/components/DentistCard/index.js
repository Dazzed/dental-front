import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Col from 'react-bootstrap/lib/Col';
import formatState from 'utils/formatState';

import ReviewScore from 'components/ReviewScore';

import styles from './styles.css';

function DentistCard(props) {
  const {
    id,
    firstName,
    lastName,
    rating,
    type,
    dentistInfo,
    affordability,
    planStartingCost,
    avatar,
  } = props;

  return (
    <li styleName="dentist-list-item">
      <div styleName="left">
        <div styleName="avatar" style={{ backgroundImage: `url(${avatar})` }}></div>
        <div styleName="rating">
          <ReviewScore score={rating} />
        </div>
      </div>
      <div styleName="right">
        <div styleName="name">{firstName} {lastName}</div>
        <div styleName="type">{type}</div>

        <div styleName="location">{dentistInfo.city}, {formatState(dentistInfo.state)}</div>
        <div styleName="affordability">Affordability {affordability}/5</div>

        <div styleName="plan-cost">Plans starting at: <span styleName="price">${planStartingCost}</span></div>
      </div>
    </li>
  );
}

DentistCard.propTypes = {
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  rating: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  affordability: PropTypes.number.isRequired,
  planStartingCost: PropTypes.number.isRequired,
  dentistInfo: PropTypes.shape({
    city: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
};

export default CSSModules(styles)(DentistCard);
