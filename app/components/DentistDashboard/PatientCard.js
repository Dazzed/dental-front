import React, { Component, PropTypes } from 'react';
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
import changeFactory from 'change-js';

import { MEMBER_RELATIONSHIP_TYPES } from 'common/constants';
import Money from 'components/Money';
import WriteMessageModal from 'components/WriteMessageModal';

import styles from './PatientCard.css';

const Change = changeFactory();

@CSSModules(styles, { allowMultiple: true })
export default class PatientCard extends Component {
  static propTypes = {
    id: PropTypes.number,
    payingMember: PropTypes.bool,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
    contactMethod: PropTypes.string,
    familyMembers: PropTypes.array,
    createdAt: PropTypes.string,
    subscriptions: PropTypes.array,
    phoneNumbers: PropTypes.array,
    latestReview: PropTypes.object,
    newMsgCount: PropTypes.number,
    markMsgRead: PropTypes.func,
  }

  constructor (props) {
    super(props);
    this.state = {
      showFamilyMembers: false,
      showMessageModal: false,
    };

    this.toggleMembers = this.toggleMembers.bind(this);
    this.openMessageModal = this.openMessageModal.bind(this);
    this.closeMessageModal = this.closeMessageModal.bind(this);
  }

  toggleMembers () {
    this.setState({
      ...this.state,
      showFamilyMembers: !this.state.showFamilyMembers
    });
  }

  openMessageModal () {
    this.setState({
      ...this.state,
      showMessageModal: true,
    });
    if (this.props.newMsgCount > 0) {
      this.props.markMsgRead(this.props.id);
    }
  }

  closeMessageModal () {
    this.setState({
      ...this.state,
      showMessageModal: false,
    });
  }

  render () {
    const {
      firstName,
      lastName,
      birthDate,
      email,
      createdAt,
      contactMethod,
      avatar,
      id,
      payingMember,
      familyMembers,
      subscriptions,
      phoneNumbers,
      latestReview,
      newMsgCount,
    } = this.props;

    // TODO: only show current active susbscription!
    const { showFamilyMembers } = this.state;
    const memberSince = moment(createdAt).format('MMM D, YYYY');
    // const paidAt = moment(#<{(|membership.paidAt|)}>#).format('MMM D, YYYY');
    // TODO: better here to use selector!
    let total = subscriptions ? subscriptions[0].monthly : 0;

    if (subscriptions) {
      total = new Change({ dollars: payingMember ? total : 0 });
      familyMembers.forEach(member => {
        total = total.add(new Change({ dollars: member.subscription.monthly }));
      });
      total = total.dollars();
    }

    let membershipStyle = 'warning';
    let phone = '';

    subscriptions.forEach(subscription => {
      if (new Date(subscription.endAt) > new Date()) {
        membershipStyle = '';
      }
    });

    if (subscriptions[0].status === 'inactive') {
      membershipStyle = 'warning';
    }

    // NOTE: By now only one number so display that.
    if (phoneNumbers && phoneNumbers[0]) {
      phone = phoneNumbers[0].number;
    }

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
                <span styleName={`membership-status ${membershipStyle}`}>
                  {`(${subscriptions[0].status})`}
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
                <span styleName="value">{familyMembers.length}</span>
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
                {familyMembers.length ? carret : null }
              </Col>
            </Row>
          </div>

          <ReactCSSTransitionGroup
            transitionName="show-hide"
            transitionEnterTimeout={100}
            transitionLeaveTimeout={100}
          >
            { showFamilyMembers && familyMembers.length &&
              <div styleName="pane members-pane">
                <Row>
                  <Col md={9} styleName="members-list">
                    <Row styleName="header">
                      <Col md={4} sm={4}>Family Members</Col>
                      <Col md={3} sm={3}>Family Relation</Col>
                      <Col md={1} sm={1}>Age</Col>
                      <Col md={2} sm={2}>Type</Col>
                      <Col md={2} sm={2}>Fee</Col>
                    </Row>

                    { payingMember &&
                      <Row>
                        <Col md={4} sm={4} styleName="avatar-name">
                          <Image src={avatar} />
                          <span>
                            {`${firstName} ${lastName}`}
                          </span>
                        </Col>
                        <Col md={3} sm={3}>
                          ActHld/Mem
                        </Col>
                        <Col md={1} sm={1}>
                          {birthDate &&
                            moment().diff(birthDate, 'year', false)
                          }
                        </Col>
                        <Col md={2} sm={2}>Custom</Col>
                        <Col md={2} sm={2}>
                          ${subscriptions[0].monthly}
                        </Col>
                      </Row>
                    }

                    { familyMembers &&
                      familyMembers.map((member, index) => (
                        <Row key={index}>
                          <Col md={4} sm={4} styleName="avatar-name">
                            <Image src={member.avatar} />
                            <span>
                              {`${member.firstName} ${member.lastName}`}
                            </span>
                          </Col>
                          <Col md={3} sm={3}>
                          {MEMBER_RELATIONSHIP_TYPES[member.familyRelationship]}
                          </Col>
                          <Col md={1} sm={1}>
                            {member.birthDate &&
                              moment().diff(member.birthDate, 'year', false)
                            }
                          </Col>
                          <Col md={2} sm={2}>Custom</Col>
                          <Col md={2} sm={2}>
                            ${member.subscription.monthly}
                          </Col>
                        </Row>
                      ))
                    }
                  </Col>
                  <Col md={3}>
                    <Row>
                      <span styleName="desc">
                        Membership:{' '}
                      </span>
                      <span styleName={`membership-status ${membershipStyle}`}>
                        {status}
                      </span>
                    </Row>
                    <Row>
                      <span styleName="desc">
                        Paid Date:{' '}
                      </span>
                      <span styleName="value">
                        {' '}
                      </span>
                    </Row>
                    <Row>
                      <span styleName="desc">
                        Total Monthly Payment:{' '}
                      </span>
                      <Money
                        styleName="value"
                        value={total}
                      />
                    </Row>
                    <Row>
                      <span styleName="update-payment">
                        Update Payment Info
                      </span>
                    </Row>
                  </Col>
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
              <Col md={4} sm={5} />
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
