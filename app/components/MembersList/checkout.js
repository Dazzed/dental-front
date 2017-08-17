// MembersList component which appears in the signup patient offsite page. (Dentist signs up primary account holder and his members)

/*
Members List Component
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import moment from 'moment';
import React from 'react';
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
export default class MembersList extends React.Component {

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

  onRemoveClick = (patient, member) => {
    this.props.onRemoveMember(patient, member);
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
  renderMember(patient, member, showControlCol, membershipPlans, canRemove) {
    const {
      avatar,
      birthDate,
      familyRelationship,
      firstName,
      id,
      lastName,
    } = member;

    const subscription = member.subscription || { status: 'inactive' };
    const relationship = familyRelationship
      ? MEMBER_RELATIONSHIP_TYPES[familyRelationship]
      : 'ACCOUNT OWNER';

    const age = moment().diff(moment(birthDate), 'years');

    const subscriptionType = age <= 13
      ? 'Child'
      : 'Adult';

    let amount = '-----';

    // if (subscription.status === 'active' || subscription.status === 'past_due') {
    // amount = '$' + subscription.monthly;
    // }
    amount = pluckMembershipfee(member, membershipPlans);

    // if (subscription.status === 'active' || subscription.status === 'past_due') {
    //   amount = '$' + (subscription.costs.type === 'monthly' ?
    //       subscription.costs.monthlyPrice : subscription.costs.annualPrice);
    // }


    return (
      <div key={id} className="row" styleName="member">
        <div className="col-sm-2">
          <div styleName="member__detail">
            {firstName} {lastName}
          </div>
        </div>
        <div className="col-sm-3">
          <div styleName="member__detail">
            {relationship === "ACCOUNT OWNER" ? (<strong>{relationship}</strong>) : relationship}
          </div>
        </div>
        <div className="col-sm-2">
          <div styleName="member__detail">
            {age}
          </div>
        </div>
        <div className="col-sm-2">
          <div styleName="member__detail">
            {subscriptionType}
          </div>
        </div>
        <div className="col-sm-2">
          <div styleName="member__detail">
            ${amount}
          </div>
        </div>
        {
          canRemove &&
            <div className="col-sm-1">
              <div styleName="member__detail">
                <input
                    type="button"
                    styleName="button--small"
                    value="X"
                    onClick={() =>this.onRemoveClick(patient, member)}
                  />
              </div>
            </div>
        }
      </div>
    );
  }

  /*
  Main Render
  ------------------------------------------------------------
  */
  render() {
    const {
      patient,
      dentist,
      onReEnrollMember,
      onRenewMember,
      onUpdateMember,
      onRemoveMember,
      canRemove
    } = this.props;

    if (!dentist) {
      return null;
    }
    const showControlCol = onReEnrollMember
      || onRenewMember
      || onUpdateMember
      || onRemoveMember;


    // TODO: test with yearly members
    // TODO: test with all status's
    // console.log('member', patient.members, 'patient dross member');
    const members = removeDuplicates(patient.members, 'id');
    const memberRows = [];
    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      memberRows.push(this.renderMember(patient, member, showControlCol, dentist.memberships, canRemove));
    }


    const subTotal = members.length ? calculateSubtotal(members, dentist.memberships) : null;
    return (
      <div styleName="members">
        <div styleName="members__segment">
          <div className="row" styleName="members__title-row">
            <div className="col-sm-2">
              <div styleName="members__title--first-only">
                Name
              </div>
            </div>
            <div className="col-sm-3">
              <div styleName="members__title--first-only">
                Relationship
              </div>
            </div>
            <div className="col-sm-2">
              <div styleName="members__title--first-only">
                Age
              </div>
            </div>
            <div className="col-sm-2">
              <div styleName="members__title--first-only">
                Type
              </div>
            </div>
            <div className="col-sm-2">
              <div styleName="members__title--first-only">
                Fee
              </div>
            </div>
          </div>
          {memberRows}
          {subTotal &&
            <div styleName="subtotal">
              <strong>Subtotal: </strong>${subTotal}
            </div>}
        </div>
      </div>
    );
  }
}
