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
export default class FamilyMemberListEdit extends Component {

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

    const membership = member.clientSubscription ? member.clientSubscription.membership : member.membership;
    let status = member.clientSubscription.status;

    let statusStyle = 'member__detail'
    if (status === 'active') {
      statusStyle += ' status status--active';
    } else if (status === 'past_due') {
      statusStyle += ' status status--past-due';
    } else if (status === 'inactive' || status === 'canceled') {
      statusStyle += ' status status--inactive';
    } else if (status === 'cancellation_requested') {
      status = 'Cancellation Requested';
      statusStyle += ' status status--inactive';
    }

    const daysElapsed = membership
      ? moment().diff(moment(membership.createdAt), 'days')
      : 0;

    return (
      <div key={id} className="row" styleName="member">
        <div className="col-sm-2  status--active">
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
                && (membership.type === 'month' || membership.type === 'custom')
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
                && (membership.type === 'month' || membership.type === 'custom')
                && (status === "active")
                && (daysElapsed >= 90)
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

              {
                status === "active"
                  && membership.type === 'year'
                  && status === 'active'
                  && (
                    <div>
                      {
                        moment(member.subscription.stripeSubscriptionIdUpdatedAt).add('1', 'year').diff(moment(), 'days') <= 30
                        && (
                          <input
                            type="button"
                            styleName="button--small"
                            value="UPDATE"
                            onClick={this.onUpdateClick.bind(this, patient, member)}
                          />
                        )
                      }
                      <input
                        type="button"
                        styleName="button--small"
                        value="X"
                        onClick={this.onRemoveClick.bind(this, patient, member, membership.userId)}
                      />
                    </div>
                  )
              }

              {
                membership.type === 'month'
                  && status === 'Cancellation Requested'
                  && (
                    <input 
                      type="button"
                      styleName="button--small"
                      style={{fontSize: '10px'}}
                      value={`Expires ${moment(member.clientSubscription.cancelsAt).format('MMMM D, YYYY')}`}
                      disabled
                    />
                  )
              }

              { status === 'inactive'
                && (
                  <input
                    type="button"
                    styleName="button--small"
                    value={member.clientSubscription.stripeSubscriptionId ? "RE-ENROLL" : "ENROLL"}
                    onClick={this.onReEnrollClick.bind(this, patient, member, subscriptionType)}
                  />
                )
              }
            </div>
          )}
        </div>
      </div>
    );
  }

  componentWillMount() {
    console.log("FamilyMemberListEdit is mounted with ", this.props);
  }

  render() {
    const {
      patient,
      dentist,
      onReEnrollMember,
      onRenewMember,
      onUpdateMember,
      onRemoveMember,
    } = this.props;

    const primaryPatient = patient.members.find(m => m.id === patient.id);

    if (!dentist) {
      return null;
    }
    const showControlCol = onReEnrollMember
      || onRenewMember
      || onUpdateMember
      || onRemoveMember;

    patient.membershipId = patient.clientSubscription.membershipId;
    let members = [patient, ...patient.members]
      .filter(m => m.clientSubscription)
      .sort(m => m.clientSubscription.membership && m.clientSubscription.membership.type == 'year' ? 1 : -1);

    // removes duplicate members in the members array.
    members = members.reduce((acc, m) => {
      if (acc.map(t => t.id).includes(m.id)) {
        return acc;
      } else {
        acc.push(m);
        return acc;
      }
    }, []);

    const memberRows = [];
    let annualSeparated = false;
    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      if (member.clientSubscription.membership && member.clientSubscription.membership.type == 'year' && !annualSeparated) {
        annualSeparated = true;
        memberRows.push(
          <div key={Math.random()} className="row" styleName="member">
            <div className="col-sm-6 col-md-6">
              <div styleName="member__detail" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                Annual Memberships
              </div>
            </div>
          </div>
        );
      }
      memberRows.push(this.renderMember(primaryPatient, member, showControlCol, dentist.memberships));
      if (member.clientSubscription.membership && member.clientSubscription.membership.type == 'year') {
        const subscriptionStatus = member.clientSubscription.status;
        let expiresOrRenews = 'Renews At';
        if (subscriptionStatus === 'cancellation_requested') {
          expiresOrRenews = 'Expires At';
        }
        annualSeparated = true;
        memberRows.push(
          <div key={Math.random()} className="row" styleName="member">
            <div className="col-sm-6 col-md-6">
              <div styleName="member__detail" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                {expiresOrRenews}: {moment(member.clientSubscription.membership.createdAt).add(1, 'year').format('MMMM D, YYYY')}
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
