import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Image from 'react-bootstrap/lib/Image';
import moment from 'moment';

import { MEMBER_RELATIONSHIP_TYPES } from 'common/constants';

import styles from './FamilyMember.css';
/* eslint-disable */
function FamilyMember ({ details }) {
  const {
    firstName,
    lastName,
    familyRelationship,
    createdAt,
    accountOwner,
    avatar,
    subscription,
  } = details;

  const memberSince = moment(createdAt).format('MMM D, YYYY');
  const avatarURL = avatar || 'http://www.teenink.com/images/default_face.gif';

  return (
    <div styleName="family-member">
      <Row styleName="details">
        <Col md={1} styleName="member-avatar">
          <Image src={avatarURL} />
        </Col>
        <Col md={3} styleName="col-with-name">
          <p styleName="member-name">{`${firstName} ${lastName}`}</p>
          {accountOwner === 'true' &&
            <p styleName="account-owner">(Account Owner)</p>
          }
        </Col>
        <Col md={2}>{MEMBER_RELATIONSHIP_TYPES[familyRelationship]}</Col>
        <Col md={2}>Custom</Col>
        <Col md={2}>${subscription.monthly}</Col>
        <Col md={2} className="text-right">{memberSince}</Col>
      </Row>

      <Row>
        <Col md={3} className="pull-right text-right">
          <Button bsStyle="primary" styleName="btn-cancel">Cancel</Button>
        </Col>
      </Row>
    </div>
  );
}

FamilyMember.propTypes = {
  details: PropTypes.object,
};

export default CSSModules(styles, { allowMultiple: true })(FamilyMember);
