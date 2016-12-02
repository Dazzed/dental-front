import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reset as resetForm } from 'redux-form';
import CSSModules from 'react-css-modules';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import FaGroup from 'react-icons/lib/fa/group';
import FaEnvelope from 'react-icons/lib/fa/envelope';
import FaPhone from 'react-icons/lib/fa/phone';
import FaCaretRight from 'react-icons/lib/fa/caret-right';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import FaStar from 'react-icons/lib/fa/star';
import Rating from 'react-rating';
import moment from 'moment';
import MemberForm from 'components/MemberForm';
import PaymentForm from 'containers/Authorize.net';

import WriteMessageModal from 'components/WriteMessageModal';

import { memberFormOpenedSelector } from 'containers/Dashboard/selectors';
import {
  openMemberForm,
  closeMemberForm,
  setEditingMember,
  submitMemberForm,
  deleteMember,
} from 'containers/Dashboard/actions';

import FamilyMember from './FamilyMember';
import styles from './PatientCard.css';


const mapDispatchToProps = (dispatch) => ({
  onSubmitForm: (values, userId) => dispatch(submitMemberForm(values, userId)),
  deleteMember: (id, values) => dispatch(deleteMember(id, values)),
  resetForm: () => dispatch(resetForm('familyMember')),
  openMemberForm: ownerId => dispatch(openMemberForm(ownerId)),
  closeMemberForm: () => dispatch(closeMemberForm()),
  setEditingMember: (memberId, userId) =>
    dispatch(setEditingMember(memberId, userId)),
});


const mapStateToProps = state => ({
  openedForm: memberFormOpenedSelector(state),
});


@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles, { allowMultiple: true })
export default class PatientCard extends Component {

  static propTypes = {
    id: PropTypes.number,
    owner: PropTypes.number,
    openedForm: PropTypes.number,
    payingMember: PropTypes.bool,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
    contactMethod: PropTypes.string,
    members: PropTypes.array,
    createdAt: PropTypes.string,
    subscription: PropTypes.object,
    phone: PropTypes.string,
    latestReview: PropTypes.object,
    newMsgCount: PropTypes.number,
    markMsgRead: PropTypes.func,
    setEditingMember: PropTypes.func.isRequired,
    deleteMember: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    openMemberForm: PropTypes.func.isRequired,
    onSubmitForm: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props);

    this.state = {
      showFamilyMembers: false,
      showMessageModal: false,
    };
  }

  toggleMembers = () => {
    this.setState({
      ...this.state,
      showFamilyMembers: !this.state.showFamilyMembers
    });
  }

  openMessageModal = () => {
    this.setState({
      ...this.state,
      showMessageModal: true,
    });

    if (this.props.newMsgCount > 0) {
      this.props.markMsgRead(this.props.id);
    }
  }

  closeMessageModal = () => {
    this.setState({
      ...this.state,
      showMessageModal: false,
    });
  }

  handleSubmit = (values) => {
    this.props.onSubmitForm(values, this.props.id);
  }

  addNewMember = () => {
    this.openForm();
    this.props.setEditingMember();
  }

  editMember = (memberId) => {
    this.openForm();
    this.props.setEditingMember(memberId, this.props.id);
  }

  deleteMember = (member) => {
    this.props.deleteMember(this.props.id, member);
  }

  openForm () {
    this.props.resetForm();
    this.props.openMemberForm(this.props.id);
  }

  render () {
    const {
      firstName, lastName, createdAt, contactMethod, avatar, email, id,
      members, phone, latestReview, newMsgCount, openedForm,
    } = this.props;

    const showForm = openedForm === id;

    const { showFamilyMembers } = this.state;
    const memberSince = moment(createdAt).format('MMM D, YYYY');

    const carret = showFamilyMembers
      ? <FaCaretDown size={16} styleName="toggler-icon" />
      : <FaCaretRight size={16} styleName="toggler-icon" />;

    return (
      <Row styleName="patient-card">
        <Col md={1} styleName="avatar">
          <Image src={avatar} />
          <span>Internal</span>
        </Col>

        <Col md={11} styleName="details">
          <div styleName="pane no-border">
            <Row>
              <Col md={8}>
                <span styleName="patient-name">
                  {`${firstName} ${lastName} `}
                </span>
              </Col>
              <Col md={4} styleName="member-since">
                <span styleName="desc">Member Since: </span>
                <span styleName="value">{memberSince}</span>
              </Col>
              <Col md={8}>
                <span styleName="desc">Preferred Contact Method: </span>
                <span styleName="value">{contactMethod}</span>
              </Col>
              <Col md={4}>
                <span styleName="desc">Family Member Joined: </span>
                <span styleName="value">{members.length}</span>
              </Col>
            </Row>
          </div>

          <div styleName="pane">
            <Row>
              <Col md={3}>
                <FaPhone size={16} />
                <span styleName="value">{phone}</span>
              </Col>
              <Col md={5}>
                <FaEnvelope size={16} />
                <span styleName="value">{email}</span>
              </Col>
              <Col md={4} styleName="toggler" onClick={this.toggleMembers}>
                <FaGroup size={16} />
                <span styleName="value">Family Member Details</span>
                {members.length ? carret : null }
              </Col>
            </Row>
          </div>

          <ReactCSSTransitionGroup
            transitionName="show-hide"
            transitionEnterTimeout={100}
            transitionLeaveTimeout={100}
          >
            { showFamilyMembers && members.length &&
              <div styleName="pane members-pane">
                <Row>
                  <Col md={12} styleName="members-list">
                    <Row styleName="header">
                      <Col md={3} sm={3}>Family Members</Col>
                      <Col md={3} sm={3}>Family Relation</Col>
                      <Col md={1} sm={1}>Age</Col>
                      <Col md={2} sm={2}>Type</Col>
                      <Col md={1} sm={1}>Fee</Col>
                      <Col md={2} sm={2}>Actions</Col>
                    </Row>

                    {members &&
                      members.map((member, index) =>
                        <FamilyMember
                          owner={id}
                          details={member}
                          key={index}
                          onEdit={this.editMember}
                          onDelete={this.deleteMember}
                        />
                      )}
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <button
                      className="btn btn-darkest-green btn-round pull-right"
                      onClick={this.addNewMember}
                    >
                      Add new member
                    </button>
                  </Col>
                </Row>
                <Row style={{ marginTop: '15px' }}>
                  {showForm &&
                    <MemberForm
                      onSubmit={this.handleSubmit}
                    />}
                </Row>
              </div>
            }
          </ReactCSSTransitionGroup>

          {latestReview &&
            <div styleName="pane review">
              <Row>
                <Col md={6} styleName="rating">
                  <Rating
                    empty={<FaStar size={16} color="gray" />}
                    full={<FaStar size={16} />}
                    step={1}
                    readonly
                    initialRate={latestReview.rating}
                  />
                </Col>
                <Col md={6} className="text-right">
                  <span styleName="desc">Reviewed Last: </span>
                  <span styleName="value">
                    {moment(latestReview.createdAt).format('MMM D, YYYY')}
                  </span>
                </Col>
                <Col md={12} styleName="text">
                  "{latestReview.message}"
                </Col>
              </Row>
            </div>
          }

          <div styleName="pane no-border">
            <Row>
              <Col md={4} sm={4}>
                <button
                  className="btn btn-block btn-green btn-round"
                  onClick={this.openMessageModal}
                >
                  { newMsgCount > 0
                    ? <span>{newMsgCount} New Messages</span>
                    : <span>Messages</span>
                  }
                </button>
              </Col>
              <div className="clearfix">
                <PaymentForm user={this.props} />
              </div>
            </Row>
          </div>
        </Col>

        <WriteMessageModal
          recipientId={id}
          recipientType="Patient"
          showModal={this.state.showMessageModal}
          onClose={this.closeMessageModal}
        />
      </Row>
    );
  }
}
