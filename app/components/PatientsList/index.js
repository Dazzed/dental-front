/*
Patients List Component
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
import FaPencil from 'react-icons/lib/fa/pencil';

// app
import {
  MEMBER_ORIGINS,
  PREFERRED_CONTACT_METHODS,
  PREFERRED_CONTACT_METHODS_DENTIST_POV,
} from 'common/constants';
import Avatar from 'components/Avatar';
import MemberListEdit from 'components/MemberListEdit';

// local
import styles from './styles.css';

/*
Patients List
================================================================================
*/
@CSSModules(styles, { allowMultiple: true })
class PatientsList extends React.Component {

  static propTypes = {
    // passed in - data
    patients: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,

    // passed in - higher order functions
    getAdditionalMembershipContent: React.PropTypes.func,

    // passed in - event handlers
    onAddMember: React.PropTypes.func.isRequired,
    onToggleReEnrollmentFee: React.PropTypes.func,
    onUpdatePatientPayment: React.PropTypes.func,
    onUpdatePatientProfile: React.PropTypes.func,

    onReEnrollMember: React.PropTypes.func,
    onRemoveMember: React.PropTypes.func,
    onRenewMember: React.PropTypes.func,
    onUpdateMember: React.PropTypes.func,
    dentist: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      showMemberDetails: {},
    };
  }

  /*
  State Actions
  ------------------------------------------------------------
  */
  toggleMemberDetails = (memberId) => {
    let showMemberDetails = {
      ...this.state.showMemberDetails,
    };

    showMemberDetails[memberId] = !this.state.showMemberDetails[memberId];

    this.setState({
      ...this.state,
      showMemberDetails,
    })
  }

  /*
  Delegated Controls
  ------------------------------------------------------------
  */
  // NOTE: The following functions must be bound to the patient in the
  //       patient specific event attributes.
  onAddClick = (patient) => {
    this.props.onAddMember(patient);
  }

  onReEnrollmentFeeClick = (patient) => {
    this.props.onToggleReEnrollmentFee(patient, {
      reEnrollmentFeeWaiver: !patient.reEnrollmentFeeWaiver,
    });
  }

  onUpdatePaymentClick = (patient) => {
    this.props.onUpdatePatientPayment(patient);
  }

  onUpdateProfileClick = (patient) => {
    this.props.onUpdatePatientProfile(patient);
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render() {
    const {
      // passed in - data
      patients,

      // passed in - higher order functions
      getAdditionalMembershipContent,

      // passed in - event handlers
      onReEnrollMember,
      onRemoveMember,
      onRenewMember,
      onUpdateMember,
      dentist,
    } = this.props;

    const patientRows = patients.map((patient) => {
      const {
        avatar,
        contactMethod,
        createdAt,
        email,
        firstName,
        id,
        lastName,
        members,
        origin,
        phone,
        type,
        subscription,
        membership,
      } = patient;

      // find active members w/o a cancellation pending
      let activeMembers = members.filter((member) => {
        return member.subscription !== undefined && member.subscription.status === 'active';
      });
      if (patient.subscription !== undefined && patient.subscription.status === 'active') {
        activeMembers.push(patient);
      }

      // find active members w/ a cancellation pending
      let cancellingMembers = members.filter((member) => {
        return member.subscription !== undefined && member.subscription.status === 'cancellation_requested';
      });
      if (patient.subscription !== undefined && patient.subscription.status === 'cancellation_requested') {
        cancellingMembers.push(patient);
      }

      // calculate the next month's subscription price
      // (only members w/o a cancellation pending)
      const paymentDueAmount = activeMembers
        .reduce((paymentDueAccumulator, member) => {
          if (member.subscription.membership.type === 'month') {
            paymentDueAccumulator += Number.parseFloat(member.subscription.membership.price);
          }
          return paymentDueAccumulator;
        }, 0)
        .toFixed(2);

      // calculate the total number of active subscriptions
      // (including currently active members w/ a cancellation pending)
      const activeMembersCount = activeMembers.length + cancellingMembers.length;

      // determine how to style the account's summary status
      // TODO: need to include other statuses beyond 'active' and 'inactive'
      const summaryStatus = activeMembersCount > 0 ? 'active' : 'inactive';

      let statusStyle = "status";
      switch (summaryStatus) {
        case 'active':
          statusStyle += ' status--active';
          break;

        case 'late':
          statusStyle += ' status--past-due';
          break;

        case 'inactive':
          statusStyle += ' status--inactive';
          break;

        default:
          // Status is unknown, so don't add anything;
          break;
      }

      const memberOrigin = MEMBER_ORIGINS[origin];

      const contactMethodMessage = type === 'client'
        ? PREFERRED_CONTACT_METHODS[contactMethod]
        : PREFERRED_CONTACT_METHODS_DENTIST_POV[contactMethod];

      const memberSince = moment(createdAt).format('MMMM D, YYYY');

      let paymentDueDate = 'N/A';
      if (patient.recurring_payment_date && patient.recurring_payment_date !== 'N/A') {
        paymentDueDate = moment.unix(patient.recurring_payment_date).format('MMMM D, YYYY');
      }

      const waiveReEnrollmentFee = !patient.reEnrollmentFeeWaiver;

      let additionalMembershipContent = null;
      if (getAdditionalMembershipContent) {
        additionalMembershipContent = getAdditionalMembershipContent(patient);
      }
      return (
        <div key={id} styleName="patient-list__entry">
          <div className="row">

            {/*
            Avatar
            ------------------------------------------------------------
            */}
            <div className="col-sm-2">
              <div styleName="member-avatar">
                <Avatar url={avatar} size={'100%'} />
                <p styleName="member-category">{memberOrigin}</p>
              </div>
            </div>

            <div className="col-sm-10">

              {/*
              Member Overview
              ------------------------------------------------------------
              */}
              <div styleName="member-overview">

                <div className="row">
                  <div className="col-sm-7">
                    <h3 styleName="member-overview__name">{firstName} {lastName}</h3>
                    {' '}
                    <span styleName={"member-overview__status " + statusStyle}>
                      ({summaryStatus})
                    </span>
                  </div>
                  <div className="col-sm-5 text-right">
                    Member Since:
                    {' '}
                    <span styleName="member-overview__info">{memberSince}</span>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-7">
                    Preferred Contact Method:
                    {' '}
                    <span styleName="member-overview__info">{contactMethodMessage}</span>
                  </div>
                  <div className="col-sm-5 text-right">
                    Active Members:
                    {' '}
                    <span styleName="member-overview__info">{activeMembersCount}</span>
                  </div>
                </div>

                <div styleName="divided-row">
                  <div className="row">
                    <div className="col-sm-9">
                      <span styleName="member-overview__info">{phone}</span>
                      <a href={`mailto:${email}`} styleName="member-overview__email">{email}</a>
                      <span
                        styleName="member-overview__edit-contact"
                        onClick={this.onUpdateProfileClick.bind(this, patient)}
                      >
                        <FaPencil />
                      </span>
                    </div>
                    <div className="col-sm-3 text-right">
                      <span
                        styleName="member-overview__details-toggle"
                        onClick={this.toggleMemberDetails.bind(this, id)}
                      >
                        Member Details
                        {' '}
                        {this.state.showMemberDetails[id]
                          ? <FaCaretDown />
                          : <FaCaretRight />
                        }
                      </span>
                    </div>
                  </div>
                </div>

                {/* End Member Overview */}
              </div>

              {/*
              Member Details
              ------------------------------------------------------------
              */}
              {this.state.showMemberDetails[id] && (
                <div styleName="divided-row">
                  <div className="row">

                    {/*
                    Family Members List
                    ------------------------------------------------------------
                    */}
                    <div className="col-sm-9">
                      <MemberListEdit
                        patient={patient}
                        dentist={dentist}
                        onReEnrollMember={onReEnrollMember}
                        onRemoveMember={onRemoveMember}
                        onRenewMember={onRenewMember}
                        onUpdateMember={onUpdateMember}
                      />
                    </div>

                    <div className="col-sm-3">
                      {/*
                      Subscription Overview
                      ------------------------------------------------------------
                      */}
                      <div styleName="subscription-overview">
                        <p>
                          Membership:
                          <br />
                          <span styleName={statusStyle}>{summaryStatus}</span>
                        </p>
                        <p>
                          Recurring Payment Date:
                          <br />
                          <span styleName="subscription-overview__info">{paymentDueDate}</span>
                        </p>
                        <p>
                          Total Monthly Payment:
                          <br />
                          <span styleName="subscription-overview__info">${paymentDueAmount}</span>
                        </p>
                      </div>

                      {/*
                      Controls
                      ------------------------------------------------------------
                      */}
                      <div styleName="controls">
                      {this.props.onAddMember && (
                        <p>
                          <input
                            type="button"
                            styleName="button--full-width"
                            value="ADD MEMBER"
                            onClick={this.onAddClick.bind(this, patient)}
                          />
                        </p>
                        )}
                        {this.props.onUpdatePatientProfile && (
                          <p>
                            <input
                              type="button"
                              styleName="button--full-width"
                              value="EDIT PAYMENT INFO"
                              onClick={this.onUpdatePaymentClick.bind(this, patient)}
                            />
                          </p>
                        )}
                        {this.props.onToggleReEnrollmentFee && (
                          <p>
                            <label>
                              <input
                                type="checkbox"
                                onChange={this.onReEnrollmentFeeClick.bind(this, patient)}
                                checked={waiveReEnrollmentFee}
                              />
                              Waive Re-enrollment Fee
                            </label>
                          </p>
                        )}
                      </div>

                      {/* End Right Col */}
                    </div>

                    {/* End Member Details Row */}
                  </div>
                  {/* End Divided Row */}
                </div>
              )}

              {/* End Patient Col */}
            </div>
            {/* End Patient Row */}
          </div>

          {additionalMembershipContent}

          {/* End Wrapper Div */}
        </div>
      );
    });

    return (
      <div styleName="patient-list">
        {patientRows}
      </div>
    );
  }

}

export default PatientsList;
