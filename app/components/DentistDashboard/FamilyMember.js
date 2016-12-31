import React from 'react';
import CSSModules from 'react-css-modules';
import moment from 'moment';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FaEdit from 'react-icons/lib/fa/edit';
import FaClose from 'react-icons/lib/fa/close';
import Confirm from 'react-confirm-bootstrap';

import { MEMBER_RELATIONSHIP_TYPES } from 'common/constants';
import styles from './PatientCard.css';


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
        subscription,
        birthDate,
      },
    } = this.props;

    const fullName = `${firstName} ${lastName}`;

    // const avatarURL =
    //   avatar || 'http://www.teenink.com/images/default_face.gif';

    return (
      <Row>
        <Col md={3} sm={3} styleName="avatar-name">
          {/* <Image src={.avatar} /> */}
          <span>
            {`${firstName} ${lastName}`}
          </span>
        </Col>
        <Col md={3} sm={2}>
          {familyRelationship ?
              MEMBER_RELATIONSHIP_TYPES[familyRelationship] : 'Self'}
        </Col>
        <Col md={1} sm={1}>
          {birthDate && moment().diff(birthDate, 'year', false)}
        </Col>
        <Col md={2} sm={2}>Custom</Col>
        <Col md={1} sm={1}>
          ${subscription.monthly}
        </Col>
        {payingMember &&
          <Col md={2} styleName="action-icon disabled" className="text-right">
            <FaEdit size={16} />
            <FaClose size={16} />
          </Col>
        }
        {!payingMember &&
          <Col md={2} styleName="action-icon" className="text-right">
            <FaEdit size={16} onClick={this.handleEdit} />
            <Confirm
              onConfirm={this.handleDelete}
              body={`Are you sure you want to delete '${fullName}'?`}
              confirmText="Confirm Delete"
              title="Deleting Member"
            >
              <a><FaClose size={16} /></a>
            </Confirm>
          </Col>
        }
      </Row>
    );
  }
}

