import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import moment from 'moment';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import FaEdit from 'react-icons/lib/fa/edit';
import FaClose from 'react-icons/lib/fa/close';
import Confirm from 'react-confirm-bootstrap';

import { MEMBER_RELATIONSHIP_TYPES } from 'common/constants';
import styles from './FamilyMember.css';

function FamilyMember ({ details, onEdit, onDelete }) {
  const {
    firstName,
    lastName,
    familyRelationship,
    createdAt,
    accountHolder,
    avatar,
    subscription,
  } = details;

  const fullName = `${firstName} ${lastName}`;

  const memberSince = moment(createdAt).format('MMM D, YYYY');
  const avatarURL = avatar || 'http://www.teenink.com/images/default_face.gif';

  return (
    <div styleName="family-member">
      <Row styleName="details">
        <Col md={1} styleName="member-avatar">
          <Image src={avatarURL} />
        </Col>
        <Col md={3} styleName="col-with-name">
          <p styleName="member-name">{fullName}</p>
          {accountHolder &&
            <p styleName="account-owner">(Account Owner)</p>
          }
        </Col>
        <Col md={2}>
          {accountHolder
            ? 'Self'
            : MEMBER_RELATIONSHIP_TYPES[familyRelationship]
          }
        </Col>
        <Col md={2}>${subscription.monthly}</Col>
        <Col md={2} className="text-right">{memberSince}</Col>
        {!accountHolder &&
          <Col md={2} styleName="action-icon" className="text-right">
            <FaEdit
              size={16}
              onClick={onEdit}
            />
            <Confirm
              onConfirm={onDelete}
              body={`Are you sure you want to delete '${fullName}'?`}
              confirmText="Confirm Delete"
              title="Deleting Member"
            >
              <a><FaClose size={16} /></a>
            </Confirm>
          </Col>
        }
      </Row>
    </div>
  );
}

FamilyMember.propTypes = {
  details: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default CSSModules(styles, { allowMultiple: true })(FamilyMember);
