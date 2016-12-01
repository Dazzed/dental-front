import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { reset as resetForm } from 'redux-form';
import moment from 'moment';
import Well from 'react-bootstrap/lib/Well';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import FaEdit from 'react-icons/lib/fa/edit';
import FaClose from 'react-icons/lib/fa/close';
import Confirm from 'react-confirm-bootstrap';
import changeFactory from 'change-js';
import PaymentForm from 'containers/Authorize.net';

import { MEMBER_RELATIONSHIP_TYPES } from 'common/constants';
import addFamilyMemberFactory from 'components/MemberForm';
import {
  editingMemberSelector as familyMembersToEditSelectorFactory,
} from 'containers/Dashboard/selectors';

import {
  setEditingMember,
  submitMemberForm,
  deleteMember,
  requestPayBill,
} from 'containers/Dashboard/actions';

import styles from './styles.css';

const Change = changeFactory();


@CSSModules(styles, { allowMultiple: true })
class MyFamilyMembers extends Component {
  static propTypes = {
    membersList: PropTypes.array,
    setEditingMember: PropTypes.func,
    onSubmitForm: PropTypes.func,
    deleteMember: PropTypes.func,
    resetForm: PropTypes.func,
    title: PropTypes.string,
    userId: PropTypes.number.isRequired,
    subscription: PropTypes.object,
    user: PropTypes.object,
  }

  constructor (props) {
    super(props);

    // show/hide based on the state selector?
    // in case we need to hide the form after save
    this.state = {
      showMemberForm: false,
    };

    const selector = familyMembersToEditSelectorFactory(this.props.userId);

    this.formClass =
      addFamilyMemberFactory(`familyMember${this.props.userId}`, state => ({
        initialValues: selector(state),
      }));
  }

  onSubmitForm = values => {
    this.props.onSubmitForm(values, this.props.userId);
  }

  requestPayBill = (token) => {
    this.props.requestPayBill(token, this.props.userId);
  }

  showMemberForm () {
    this.setState({ showMemberForm: true });
  }

  hideMemberForm () {
    this.setState({ showMemberForm: false });
  }

  addNewMember () {
    this.showMemberForm();
    this.props.setEditingMember(null, this.props.userId);
    this.props.resetForm(this.props.userId);
  }

  editMember (member) {
    this.showMemberForm();
    this.props.setEditingMember(member, this.props.userId);
  }

  deleteMember (member) {
    this.hideMemberForm();
    this.props.deleteMember(member, this.props.userId);
  }

  render () {
    const { membersList, title, subscription, user } = this.props;

    // TODO: better here to use selector!
    let total = subscription ? subscription.monthly : 0;

    if (subscription) {
      total = new Change({ dollars: user.payingMember ? total : 0 });
      membersList.forEach(member => {
        total = total.add(new Change({ dollars: member.subscription.monthly }));
      });
      total = total.cents;
    }

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
                Edit  | Cancel
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
                          onClick={this.editMember.bind(this, _member)}
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
            <PaymentForm
              total={total}
              user={user}
              status={subscription.status}
            />

            {subscription.status === 'active' && <strong>Paid</strong>}
            <button
              className="btn btn-darkest-green btn-round btn-padding pull-right"
              onClick={this.addNewMember.bind(this)}
            >
              Add new member
            </button>
          </Col>
        </Row>

        <Row styleName="add-member-form">
          {this.state.showMemberForm &&
            <this.formClass
              onSubmit={this.onSubmitForm}
            />
          }
        </Row>
      </Well>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setEditingMember: (id, userId) => dispatch(setEditingMember(id, userId)),
    deleteMember: (member, userId) => dispatch(deleteMember(member, userId)),
    onSubmitForm:
      (values, userId) => dispatch(submitMemberForm(values, userId)),
    resetForm: (userId) => dispatch(resetForm(`familyMember${userId}`)),
    requestPayBill: (token, userId) => dispatch(requestPayBill(token, userId)),
  };
}

export default connect(null, mapDispatchToProps)(MyFamilyMembers);
