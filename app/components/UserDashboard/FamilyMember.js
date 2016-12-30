import React from 'react';
import CSSModules from 'react-css-modules';
import moment from 'moment';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FaEdit from 'react-icons/lib/fa/edit';
import FaClose from 'react-icons/lib/fa/close';
import Confirm from 'react-confirm-bootstrap';

import { MEMBER_RELATIONSHIP_TYPES } from 'common/constants';

import styles from './FamilyMember.css';
import Avatar from './Avatar';


@CSSModules(styles, { allowMultiple: true })
export default class FamilyMember extends React.Component {

  static propTypes = {
    details: React.PropTypes.object.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
  }

  handleDelete = () => {
    this.props.onDelete(this.props.details);
  }

  handleEdit = () => {
    this.props.onEdit(this.props.details.id);
  }

  render () {
    const {
      details: {
        firstName,
        lastName,
        familyRelationship,
        payingMember,
        avatar,
        subscription,
      },
    } = this.props;

    const fullName = `${firstName} ${lastName}`;
    let nextPayment = '---';

    if (subscription) {
      switch (subscription.status) {
        case 'active':
          nextPayment = moment(subscription.endAt).format('MMM D, YYYY');
          break;

        case 'canceled':
          nextPayment = moment(subscription.endAt).format('MMM D, YYYY');
          break;

        case 'late':
          nextPayment = moment(subscription.endAt).format('MMM D, YYYY');
          break;

        default:
          nextPayment = '---';
      }
    }

    return (
      <div styleName="family-member">
        <Row styleName="details">
          <Col md={1} styleName="member-avatar">
            <Avatar
              src={avatar ? avatar.location : undefined}
              userId={this.props.details.id}
            />
          </Col>
          <Col md={3} styleName="col-with-name">
            <p styleName="member-name">{fullName}</p>
            {payingMember &&
              <p styleName="account-owner">(Account Owner)</p>}
          </Col>
          <Col md={2}>
            {payingMember
              ? 'Self'
              : MEMBER_RELATIONSHIP_TYPES[familyRelationship]}
          </Col>
          <Col md={1}>${subscription.monthly}</Col>
          <Col md={1} className="text-right">{subscription.status}</Col>
          <Col md={2} className="text-center">{nextPayment}</Col>
          {!payingMember &&
            <Col md={2} styleName="action-icon" className="text-right">
              <FaEdit
                size={16}
                onClick={this.handleEdit}
              />
              <Confirm
                onConfirm={this.handleDelete}
                body={`Are you sure you want to delete '${fullName}'?`}
                confirmText="Confirm Delete"
                title="Deleting Member"
              >
                <a><FaClose size={16} /></a>
              </Confirm>
            </Col>}
        </Row>
      </div>
    );
  }
}
