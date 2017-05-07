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
  const nameA = (memberA.firstName + ' ' + memberA.lastName).toLowerCase();
  const nameB = (memberB.firstName + ' ' + memberB.lastName).toLowerCase();

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
  onReEnrollClick = (patient, member) => {
    this.props.onReEnrollMember(patient, member);
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
  renderMember (patient, member, showControlCol) {
    const {
      avatar,
      birthDate,
      familyRelationship,
      firstName,
      id,
      lastName,
      subscription,
    } = member;

    const relationship = familyRelationship
                       ? MEMBER_RELATIONSHIP_TYPES[familyRelationship]
                       : "ACCOUNT OWNER";

    const age = moment().diff(moment(birthDate), 'years');

    const subscriptionType = age <= 13
                           ? "Child"
                           : "Adult";

    const amount = (
         subscription.status === "active"
      || subscription.status === "past_due"
    )
      ? "$" + subscription.monthly
      : "-----";


    return (
      <div key={id} className="row" styleName="member">
        <div className="col-sm-2">
          <Avatar url={avatar} size={'100%'} />
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
            {amount}
          </div>
        </div>
        <div className="col-sm-3">
          {/* TODO: Enable actions for the patient / patient-user so they can
              be treated like any other member?
          */}
          {id !== patient.id && showControlCol && (
            <div styleName="member__detail">
              {/* The actions for a member depend on their subscription status
                  and type:
                    - active monthly => Update & Remove
                    - active yearly => Update & Renew
                    - inactive => Re-Enroll
              */}
              {    this.props.onUpdateMember
                && (subscription.status === "active" || subscription.status === "signup")
                && (
                  <input
                    type="button"
                    styleName="button--small"
                    value="UPDATE"
                    onClick={this.onUpdateClick.bind(this, patient, member)}
                  />
                )
              }

              {    this.props.onRemoveMember
                && subscription.monthly
                && (subscription.status === "active" || subscription.status === "signup")
                && (
                  <input
                    type="button"
                    styleName="button--small"
                    value="X"
                    onClick={this.onRemoveClick.bind(this, patient, member)}
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

  /*
  Main Render
  ------------------------------------------------------------
  */
  render () {
    const {
      patient,

      onReEnrollMember,
      onRenewMember,
      onUpdateMember,
      onRemoveMember,
    } = this.props;

    const showControlCol = onReEnrollMember 
                        || onRenewMember
                        || onUpdateMember
                        || onRemoveMember;

    // TODO: test with yearly members
    // TODO: test with all status's
    const members = patient.members.reduce(
      (organizedMembers, member) => {
        const statusKey = member.subscription.status;
        const timePeriodKey = member.subscription.monthly
                            ? "monthly"
                            : "yearly";

        organizedMembers[statusKey][timePeriodKey].push(member);
        return organizedMembers;
      },
      {
        signup: {
          monthly: [],
          annual: [],
        },
        active: {
          monthly: [],
          annual: [],
        },
        inactive: {
          monthly: [],
          annual: [],
        },
        late: {
          monthly: [],
          annual: [],
        }
      }
    );

    const membersContent = {
      signup: {
        monthly: [],
        annual: [],
      },
      active: {
        monthly: [],
        annual: [],
      },
      inactive: {
        monthly: [],
        annual: [],
      },
      late: {
        monthly: [],
        annual: [],
      }
    };

    for (let statusKey in members) {
      if (members.hasOwnProperty(statusKey)) {
        const membersWithStatus = members[statusKey];

        for (let timePeriodKey in membersWithStatus) {
          if (membersWithStatus.hasOwnProperty(timePeriodKey)) {
            const membersSubset = membersWithStatus[timePeriodKey];

            membersContent[statusKey][timePeriodKey] = membersSubset
              .sort(sortMembersByName)
              .map((member) => {
                return this.renderMember(patient, member, showControlCol);
              });
          }
        }

      }
    }

    return (
      <div styleName="members">

        {membersContent.signup.monthly.length > 0 && (
          <div styleName="members__segment">
            <div className="row" styleName="members__title-row">
              <div className="col-sm-2">
                <div styleName="status--signup">
                  Monthly
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
                    Edit / Remove
                  </div>
                </div>
              )}
            </div>

            {membersContent.signup.monthly}
          </div>
        )}

        {membersContent.signup.annual.length > 0 && (
          <div styleName="members__segment">
            <div className="row" styleName="members__title-row">
              <div className="col-sm-2">
                <div styleName="status--signup">
                  Annual
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
                    Edit / Remove
                  </div>
                </div>
              )}
            </div>

            {membersContent.signup.annual}
          </div>
        )}

        {membersContent.active.monthly.length > 0 && (
          <div styleName="members__segment">
            <div className="row" styleName="members__title-row">
              <div className="col-sm-2">
                <div styleName="status--active">
                  Monthly
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
                    Edit / Cancel
                  </div>
                </div>
              )}
            </div>

            {membersContent.active.monthly}
          </div>
        )}

        {membersContent.active.annual.length > 0 && (
          <div styleName="members__segment">
            <div className="row" styleName="members__title-row">
              <div className="col-sm-2">
                <div styleName="status--active">
                  Annual
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
                    Edit / Renew
                  </div>
                </div>
              )}
            </div>

            {membersContent.active.annual}
          </div>
        )}

        {(   membersContent.late.monthly.length > 0 
          || membersContent.late.annual.length > 0
         ) && (
          <div styleName="members__segment">
            <div className="row" styleName="members__title-row">
              <div className="col-sm-2">
                <div styleName="status--past-due">
                  Late
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
                    Edit / Cancel
                  </div>
                </div>
              )}
            </div>

            {membersContent.late.monthly}
            {membersContent.late.annual}
          </div>
        )}

        {(   membersContent.inactive.monthly.length > 0
          || membersContent.inactive.annual.length > 0
         ) && (
          <div styleName="members__segment">
            <div className="row" styleName="members__title-row">
              <div className="col-sm-2">
                <div styleName="status--inactive">
                  Inactive
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
                    Re-Enroll
                  </div>
                </div>
              )}
            </div>

            {membersContent.inactive.monthly}
            {membersContent.inactive.annual}
          </div>
        )}

      </div>
    );
  }
}
