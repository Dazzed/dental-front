import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { reset as resetForm } from 'redux-form';
import moment from 'moment';
import Well from 'react-bootstrap/lib/Well';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import FaEdit from 'react-icons/lib/fa/edit';
import FaClose from 'react-icons/lib/fa/close';
import Confirm from 'react-confirm-bootstrap';

import { MEMBER_RELATIONSHIP_TYPES } from 'common/constants';
import AddFamilyMemberForm from 'components/AddFamilyMemberForm';

import {
  setEditingMember,
  submitMemberForm,
  deleteMember,
} from './actions';

import styles from './styles.css';


@CSSModules(styles, { allowMultiple: true })
class MyFamilyMembers extends Component {
  static propTypes = {
    membersList: PropTypes.array,
    setEditingMember: PropTypes.func,
    onSubmitForm: PropTypes.func,
    deleteMember: PropTypes.func,
    resetForm: PropTypes.func,
    title: PropTypes.string,
  }

  constructor (props) {
    super(props);

    // show/hide based on the state selector?
    // in case we need to hide the form after save
    this.state = {
      showMemberForm: false,
    };
  }

  showMemberForm () {
    this.setState({ showMemberForm: true });
  }

  hideMemberForm () {
    this.setState({ showMemberForm: false });
  }

  addNewMember () {
    this.showMemberForm();
    this.props.setEditingMember();
    this.props.resetForm();
  }

  editMember (id) {
    this.showMemberForm();
    this.props.setEditingMember(id);
  }

  deleteMember (member) {
    this.hideMemberForm();
    this.props.deleteMember(member);
  }

  render () {
    const { membersList, title } = this.props;

    return (
      <Well>
        <h3 styleName="title">{title}</h3>

        <Row>
          <Col md={12}>
            <Row>
              <Col md={4}>
                Name
              </Col>
              <Col md={3}>
                Family Relationship
              </Col>
              <Col md={1}>
                Age
              </Col>
              <Col md={2}>
                Member Since
              </Col>
              <Col md={2}>
                Edit  | Delete
              </Col>
            </Row>
          </Col>
          <Col md={12}>
            <ListGroup>
              {membersList.map((_member, _index) =>
                <ListGroupItem key={_index}>
                  <Row>
                    <Col md={4}>
                      {_member.avatar &&
                        <Image
                          className="img-responsive"
                          src={_member.avatar.dataUri}
                          circle
                        />
                      }
                      {_member.firstName} {_member.lastName}
                    </Col>
                    <Col md={3}>
                      {MEMBER_RELATIONSHIP_TYPES[_member.familyRelationship]}
                    </Col>
                    <Col md={1}>
                      {_member.birthDate &&
                        moment().diff(_member.birthDate, 'year', false)
                      }
                    </Col>
                    <Col md={2}>
                      {moment(_member.createdAt).format('MMM D, YYYY')}
                    </Col>
                    <Col md={2}>
                      <Col md={6} styleName="action-icon">
                        <FaEdit
                          size={16}
                          onClick={this.editMember.bind(this, _member.id)}
                        />
                      </Col>
                      <Col md={6} styleName="action-icon">
                        <Confirm
                          onConfirm={this.deleteMember.bind(this, _member)}
                          body="Are you sure you want to delete this member?"
                          confirmText="Confirm Delete"
                          title="Deleting Member"
                        >
                          <a><FaClose size={16} /></a>
                        </Confirm>
                      </Col>
                    </Col>
                  </Row>
                </ListGroupItem>
              )}
            </ListGroup>
          </Col>

          <Col md={12}>
            <Button
              bsStyle="primary"
              className="pull-right"
              styleName="btn-add-member"
              onClick={this.addNewMember.bind(this)}
            >
              Add new member
            </Button>
          </Col>
        </Row>

        <Row>
          {this.state.showMemberForm &&
            <AddFamilyMemberForm
              onSubmit={this.props.onSubmitForm.bind(this)}
            />
          }
        </Row>
      </Well>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setEditingMember: (id) => dispatch(setEditingMember(id)),
    onSubmitForm: (values) => dispatch(submitMemberForm(values)),
    deleteMember: (id) => dispatch(deleteMember(id)),
    resetForm: () => dispatch(resetForm('familyMember')),
  };
}

export default connect(null, mapDispatchToProps)(MyFamilyMembers);

