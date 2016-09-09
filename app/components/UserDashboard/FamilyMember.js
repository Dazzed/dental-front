import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Image from 'react-bootstrap/lib/Image';

import styles from './FamilyMember.css';
/* eslint-disable */
function FamilyMember ({ details }) {
  const {
    firstName,
    lastName,
    relationship,
    createdAt,
    accountOwner,
    type,
    fee,
    avatar,
  } = details;

  return (
    <div styleName="family-member">
      <Row styleName="details">
        <Col md={1} styleName="member-avatar">
          <Image src={avatar} />
        </Col>
        <Col md={3} styleName="col-with-name">
          <p styleName="member-name">{`${firstName} ${lastName}`}</p>
          {accountOwner === 'true' &&
            <p styleName="account-owner">(Account Owner)</p>
          }
        </Col>
        <Col md={2}>{relationship}</Col>
        <Col md={2}>{type}</Col>
        <Col md={2}>{fee}</Col>
        <Col md={2} className="text-right">{createdAt}</Col>
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
