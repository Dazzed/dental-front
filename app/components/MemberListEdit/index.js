import React, { Component } from 'react';
import moment from 'moment';
import Modal from 'react-bootstrap/lib/Modal';
import CSSModules from 'react-css-modules';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import FaCaretRight from 'react-icons/lib/fa/caret-right';
import { removeDuplicates, pluckMembershipfee, calculateSubtotal } from 'common/utils';
// app
import {
  MEMBER_RELATIONSHIP_TYPES,
} from 'common/constants';
import Avatar from 'components/Avatar';

// local
import styles from './styles.css';

/*
Helpers
------------------------------------------------------------
*/
const sortMembersByName = (memberA, memberB) => {
  const a = memberA.client || memberA;
  const b = memberB.client || memberB;
  const nameA = (a.firstName + ' ' + a.lastName).toLowerCase();
  const nameB = (b.firstName + ' ' + b.lastName).toLowerCase();

  if (nameA < nameB) {
    return -1;
  }
  else if (nameA > nameB) {
    return 1;
  }

  return 0;
}


/*
Members List
================================================================================
*/
@CSSModules(styles, { allowMultiple: true })
export default class MemberListEdit extends Component {

  static propTypes = {
    // passed in - data
    patient: React.PropTypes.object.isRequired,

    // passed in - event handlers
    onReEnrollMember: React.PropTypes.func,
    onRenewMember: React.PropTypes.func,
    onUpdateMember: React.PropTypes.func,
    onRemoveMember: React.PropTypes.func,
  };

  /*
  Delegated Controls
  ------------------------------------------------------------
  */
  // NOTE: The following functions must be bound to the patient and member in
  //       the member specific event attributes.
  onReEnrollClick = (patient, member, type) => {
    this.props.onReEnrollMember(patient, member, type);
  }

  onRemoveClick = (patient, member, dentistId) => {
    this.props.onRemoveMember(patient, member, dentistId);
  }

  onRenewClick = (patient, member) => {
    this.props.onRenewMember(patient, member);
  }

  onUpdateClick = (patient, member) => {
    this.props.onUpdateMember(patient, member);
  }

  /*
  Member Render
  ------------------------------------------------------------
  */
  renderMember(patient, member, showControlCol, membershipPlans) {
    const {
      avatar,
      birthDate,
      familyRelationship,
      firstName,
      id,
      lastName,
    } = member;
    const relationship = familyRelationship
      ? MEMBER_RELATIONSHIP_TYPES[familyRelationship]
      : 'ACCOUNT OWNER';

    const age = moment().diff(moment(birthDate), 'years');

    const subscriptionType = age <= 13
      ? 'Child'
      : 'Adult';

    let amount = '-----';

    amount = pluckMembershipfee(member, membershipPlans);

    const membership = member.subscription ? member.subscription.membership : {};
    const status = member.subscription.status;

    let statusStyle = 'member__detail'
    if (status === 'active') {
      statusStyle += ' status status--active';
    } else if (status === 'past_due') {
      statusStyle += ' status status--past-due';
    } else if (status === 'inactive' || status === 'canceled') {
      statusStyle += ' status status--inactive';
    }

    return (
      <div key={id} className="row" styleName="member">
        <div className="col-sm-2">
          <div styleName={statusStyle}>
            {status}
          </div>
        </div>
        <div className="col-sm-2">
          <div styleName="member__detail">
            {firstName} {lastName}
          </div>
        </div>
        <div className="col-sm-2">
          <div styleName="member__detail">
            {relationship === "ACCOUNT OWNER" ? (<strong>{relationship}</strong>) : relationship}
          </div>
        </div>
        <div className="col-sm-1">
          <div styleName="member__detail">
            {age}
          </div>
        </div>
        <div className="col-sm-1">
          <div styleName="member__detail">
            {subscriptionType}
          </div>
        </div>
        <div className="col-sm-1">
          <div styleName="member__detail">
            ${amount}
          </div>
        </div>
        <div className="col-sm-3">
          {/* TODO: Enable actions for the patient / patient-user so they can
              be treated like any other member?
          */}
          {membership && showControlCol && (
            <div styleName="member__detail">
              {/* The actions for a member depend on their subscription status
                  and type:
                    - active monthly => Update & Remove
                    - active yearly => Update & Renew
                    - inactive => Re-Enroll
              */}
              {this.props.onUpdateMember
                && (status === "active")
                && (
                  <input
                    type="button"
                    styleName="button--small"
                    value="UPDATE"
                    onClick={this.onUpdateClick.bind(this, patient, member)}
                  />
                )
              }

              {this.props.onRemoveMember
                && membership.type === 'month'
                && (status === "active")
                && (
                  <input
                    type="button"
                    styleName="button--small"
                    value="X"
                    onClick={this.onRemoveClick.bind(this, patient, member, membership.userId)}
                  />
                )
              }

              {this.props.onReEnrollMember
                && status === "canceled"
                && (
                  <input
                    type="button"
                    styleName="button--small"
                    value="RE-ENROLL"
                    onClick={this.onReEnrollClick.bind(this, patient, member, subscriptionType)}
                  />
                )
              }

              {this.props.onReEnrollMember
                && status === "inactive"
                && (
                  <input
                    type="button"
                    styleName="button--small"
                    value="RE-ENROLL"
                    onClick={this.onReEnrollClick.bind(this, patient, member, subscriptionType)}
                  />
                )
              }
              {/* Hiding mocked-up portions of the UI.  Just uncomment to enable. */}
              {/*
              {    this.props.onRenewMember
                && !subscription.monthly
                && subscription.status === "active"
                && (
                  <input
                    type="button"
                    styleName="button--small"
                    value="RENEW"
                    onCLick={this.onRenewClick.bind(this, patient, member)}
                  />
                )
              }

              {    this.props.onReEnrollMember
                && subscription.status === "inactive"
                && (
                  <input
                    type="button"
                    styleName="button--small"
                    value="RE-ENROLL"
                    onClick={this.onReEnrollClick.bind(this, patient, member)}
                  />
                )
              }
              */}
            </div>
          )}
        </div>
      </div>
    );
  }

  componentWillMount() {
    console.log("MemberListEdit is mounted with ",this.props);
  }

  render () {
    const {
      patient,
      dentist,
      onReEnrollMember,
      onRenewMember,
      onUpdateMember,
      onRemoveMember,
    } = this.props;

    if (!dentist) {
      return null;
    }
    const showControlCol = onReEnrollMember
      || onRenewMember
      || onUpdateMember
      || onRemoveMember;

    patient.membershipId = patient.subscription.membershipId;
    const members = [patient, ...patient.members]
      .filter(m => m.subscription)
      .sort(m => m.subscription.membership.type == 'year' ? 1 : -1);

    const memberRows = [];
    let annualSeparated = false;
    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      if (member.subscription.membership.type == 'year' && !annualSeparated) {
        annualSeparated = true;
        memberRows.push(
          <div key={Math.random()} className="row" styleName="member">
            <div className="col-sm-6 col-md-6">
              <div styleName="member__detail" style={{fontWeight: 'bold', fontStyle: 'italic'}}>
                Annual Memberships
              </div>
            </div>
          </div>
        );
      }
      memberRows.push(this.renderMember(patient, member, showControlCol, dentist.memberships));
      if (member.subscription.membership.type == 'year') {
        annualSeparated = true;
        memberRows.push(
          <div key={Math.random()} className="row" styleName="member">
            <div className="col-sm-6 col-md-6">
              <div styleName="member__detail" style={{fontWeight: 'bold', fontStyle: 'italic'}}>
                Expires At: {moment(member.subscription.stripeSubscriptionIdUpdatedAt).add(1,'year').format('MMMM D, YYYY')}
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <div styleName="members">
        <div styleName="members__segment">
          <div className="row" styleName="members__title-row">
            <div className="col-sm-2">
              <div styleName="status--signup">
                Status
              </div>
            </div>
            <div className="col-sm-2">
              <div styleName="members__title--first-only">
                Name
              </div>
            </div>
            <div className="col-sm-2">
              <div styleName="members__title--first-only">
                Relationship
              </div>
            </div>
            <div className="col-sm-1">
              <div styleName="members__title--first-only">
                Age
              </div>
            </div>
            <div className="col-sm-1">
              <div styleName="members__title--first-only">
                Type
              </div>
            </div>
            <div className="col-sm-1">
              <div styleName="members__title--first-only">
                Fee
              </div>
            </div>
            {showControlCol && (
              <div className="col-sm-3">
                <div styleName="members__title--first-only">
                  Actions
                </div>
              </div>
            )}
            <div key={Math.random()} className="row" styleName="member">
              <div className="col-sm-6 col-md-6">
                <div styleName="member__detail" style={{fontWeight: 'bold', fontStyle: 'italic'}}>
                  Monthly Memberships
                </div>
              </div>
            </div>
            {memberRows}
          </div>
          {/*{subTotal &&
            <div styleName="subtotal">
              <strong>SubTotal: </strong>{subTotal}$
          </div>}*/}
        </div>
      </div>
    );
  }
}
