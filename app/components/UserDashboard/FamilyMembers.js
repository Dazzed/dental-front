import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';

import FamilyMember from './FamilyMember';
import styles from './FamilyMembers.css';

function FamilyMembers ({ accountStatus, monthlyDue, dueDate, members }) {
  return (
    <Well styleName="family-members-container">
      <Row styleName="top-header">
        <Col md={4}>
          <span styleName="label">Account:</span>
          <span styleName={`value ${accountStatus}`}>{accountStatus}</span>
        </Col>
        <Col md={4}>
          <span styleName="label">Your total monthly due:</span>
          <span styleName="value">${monthlyDue}</span>
        </Col>
        <Col md={4}>
          <span styleName="label">Payment due date:</span>
          <span styleName="value">{dueDate}</span>
        </Col>
      </Row>
      <Row styleName="list-header">
        <Col md={3}>Name</Col>
        <Col md={3}>Family Relationshiop</Col>
        <Col md={1}>Fee</Col>
        <Col md={3} className="text-right">Member Since</Col>
      </Row>
      <Row styleName="list-content">
        {members &&
          members.map((member, index) => (
            <FamilyMember details={member} key={index} />
          ))
        }
      </Row>
    </Well>
  );
}

FamilyMembers.propTypes = {
  accountStatus: PropTypes.string,
  monthlyDue: PropTypes.number,
  dueDate: PropTypes.string,
  members: PropTypes.array,
};

export default CSSModules(styles, { allowMultiple: true })(FamilyMembers);
