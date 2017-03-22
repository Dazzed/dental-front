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
  const nameA = memberA.firstName + ' ' + memberA.lastName;
  const nameB = memberB.firstName + ' ' + memberB.lastName;

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
    onReEnrollMember: React.PropTypes.func.isRequired,
    onRenewMember: React.PropTypes.func.isRequired,
    onUpdateMember: React.PropTypes.func.isRequired,
    onRemoveMember: React.PropTypes.func.isRequired,
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
  TODO: Missing the membership info fields for each person:
          - `type`
          - `fee`
          - `status`
          - `monthly` or `yearly`
  */
  renderMember (patient, member) {
    const {
      avatar,
      birthDate,
      familyRelationship,
      firstName,
      id,
      lastName,
    } = member;

    const relationship = familyRelationship !== null
                       ? MEMBER_RELATIONSHIP_TYPES[familyRelationship]
                       : "Self";

    const age = moment().diff(moment(birthDate), 'years');

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
            {relationship}
          </div>
        </div>
        <div className="col-sm-1">
          <div styleName="member__detail">
            {age}
          </div>
        </div>
        <div className="col-sm-1">
          <div styleName="member__detail">
            TODO {/* TODO: Membership Type */}
          </div>
        </div>
        <div className="col-sm-1">
          <div styleName="member__detail">
            TODO {/* TODO: Membership Fee */}
          </div>
        </div>
        <div className="col-sm-3">
          <div styleName="member__detail">
            {/*
              TODO: choose button types based on membership info's `status`:
                - active monthly => Update & X
                - active yearly => Update & Renew
                - inactive => Re-Enroll
                - late => ???
            */}
            <input
              type="button"
              styleName="button--small"
              value="UPDATE"
              onClick={this.onUpdateClick.bind(this, patient, member)}
            />
            <input
              type="button"
              styleName="button--small"
              value="X"
              onClick={this.onRemoveClick.bind(this, patient, member)}
            />
          </div>
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
    } = this.props;

    let members = [...patient.members];
    members.push(patient);

    // TODO: test with yearly members
    // TODO: test with all status's
    members = members.reduce(
      (organizedMembers, member) => {
        // TODO: members don't have their own subscription info...
        //       using patient subscription info as a workaround for now...
        const statusKey = patient.subscription.status;
        const timePeriodKey = patient.subscription.monthly
                                ? "monthly"
                                : "yearly";
        organizedMembers[statusKey][timePeriodKey].push(member);
        return organizedMembers;
      },
      {
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
                return this.renderMember(patient, member);
              });
          }
        }

      }
    }

    return (
      <div styleName="members">

        {membersContent.active.monthly.length > 0 && (
          <div>
            <div className="row" styleName="members__title-row">
              <div className="col-sm-2">
                <span styleName="status--active">
                  Monthly
                </span>
              </div>
              <div className="col-sm-2">
                <span styleName="members__title--first-only">
                  Name
                </span>
              </div>
              <div className="col-sm-2">
                <span styleName="members__title--first-only">
                  Relationship
                </span>
              </div>
              <div className="col-sm-1">
                <span styleName="members__title--first-only">
                  Age
                </span>
              </div>
              <div className="col-sm-1">
                <span styleName="members__title--first-only">
                  Type
                </span>
              </div>
              <div className="col-sm-1">
                <span styleName="members__title--first-only">
                  Fee
                </span>
              </div>
              <div className="col-sm-3">
                <span styleName="members__title--first-only">
                  Edit / Cancel
                </span>
              </div>
            </div>

            {membersContent.active.monthly}
          </div>
        )}

        {membersContent.active.annual.length > 0 && (
          <div>
            <div className="row" styleName="members__title-row">
              <div className="col-sm-2">
                <span styleName="status--active">
                  Annual
                </span>
              </div>
              <div className="col-sm-2">
                <span styleName="members__title--first-only">
                  Name
                </span>
              </div>
              <div className="col-sm-2">
                <span styleName="members__title--first-only">
                  Relationship
                </span>
              </div>
              <div className="col-sm-1">
                <span styleName="members__title--first-only">
                  Age
                </span>
              </div>
              <div className="col-sm-1">
                <span styleName="members__title--first-only">
                  Type
                </span>
              </div>
              <div className="col-sm-1">
                <span styleName="members__title--first-only">
                  Fee
                </span>
              </div>
              <div className="col-sm-3">
                <span styleName="members__title--first-only">
                  Edit / Cancel
                </span>
              </div>
            </div>

            {membersContent.active.annual}
          </div>
        )}

        {(   membersContent.inactive.monthly.length > 0
          || membersContent.inactive.annual.length > 0
         ) && (
          <div>
            <div className="row" styleName="members__title-row">
              <div className="col-sm-2">
                <span styleName="status--inactive">
                  Inactive
                </span>
              </div>
              <div className="col-sm-2">
                <span styleName="members__title--first-only">
                  Name
                </span>
              </div>
              <div className="col-sm-2">
                <span styleName="members__title--first-only">
                  Relationship
                </span>
              </div>
              <div className="col-sm-1">
                <span styleName="members__title--first-only">
                  Age
                </span>
              </div>
              <div className="col-sm-1">
                <span styleName="members__title--first-only">
                  Type
                </span>
              </div>
              <div className="col-sm-1">
                <span styleName="members__title--first-only">
                  Fee
                </span>
              </div>
              <div className="col-sm-3">
                <span styleName="members__title--first-only">
                  Edit / Cancel
                </span>
              </div>
            </div>

            {membersContent.inactive.monthly}
            {membersContent.inactive.annual}
          </div>
        )}

        {(   membersContent.late.monthly.length > 0 
          || membersContent.late.annual.length > 0
         ) && (
          <div>
            <div className="row" styleName="members__title-row">
              <div className="col-sm-2">
                <span styleName="status--past-due">
                  Late
                </span>
              </div>
              <div className="col-sm-2">
                <span styleName="members__title--first-only">
                  Name
                </span>
              </div>
              <div className="col-sm-2">
                <span styleName="members__title--first-only">
                  Relationship
                </span>
              </div>
              <div className="col-sm-1">
                <span styleName="members__title--first-only">
                  Age
                </span>
              </div>
              <div className="col-sm-1">
                <span styleName="members__title--first-only">
                  Type
                </span>
              </div>
              <div className="col-sm-1">
                <span styleName="members__title--first-only">
                  Fee
                </span>
              </div>
              <div className="col-sm-3">
                <span styleName="members__title--first-only">
                  Edit / Cancel
                </span>
              </div>
            </div>

            {membersContent.late.monthly}
            {membersContent.late.annual}
          </div>
        )}

      </div>
    );
  }
}
