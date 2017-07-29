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
    onToggleCancelationFee: React.PropTypes.func,
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

  onCancelationFeeClick = (patient) => {
    this.props.onToggleCancelationFee(patient, {
      cancellationFeeWaiver: !patient.client.cancellationFeeWaiver,
      reEnrollmentFeeWaiver: patient.client.reEnrollmentFeeWaiver,
    });
  }

  onReEnrollmentFeeClick = (patient) => {
    this.props.onToggleReEnrollmentFee(patient, {
      cancellationFeeWaiver: patient.client.cancellationFeeWaiver,
      reEnrollmentFeeWaiver: !patient.client.reEnrollmentFeeWaiver,
    });
  }

  onUpdatePaymentClick = (patient) => {
    this.props.onUpdatePatientPayment(patient);
  }

  onUpdateProfileClick = (patient) => {
    console.log(patient, 'patient-s');
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

    const primaryMembers = patients
      .filter(patient => { return !patient.client.addedBy });

    let paymentDueAmount = patients.reduce((acc, p) => {
      let isMonthly = p.membership.type == 'monthly';
      if (isMonthly) {
        return acc += p.membership.monthlyPrice;
      } else {
        return acc += 0;
      }
    },0);
    
    paymentDueAmount = paymentDueAmount.toFixed(2);
    const patientRows = primaryMembers.map((patient) => {
      const {
        client: { avatar,
        contactMethod,
        createdAt,
        email,
        firstName,
        id,
        lastName,
        members,
        origin,
        phone,
        type },
        subscription,
        status,
        endAt,
        stripeSubscriptionId,
        membership,
      } = patient;

      const memberOrigin = MEMBER_ORIGINS[origin];

      const summaryStatus = status.toLowerCase();
      // const summaryStatus = patient.client.members ? patient.client.members.reduce(
      //   (summaryStatus, member) => {
      //     if (summaryStatus === 'Active' || member.status === 'active') {
      //       return 'Active';
      //     }

      //     if (summaryStatus === 'Late' || member.status === 'past_due') {
      //       return 'Late';
      //     }

      //     if (summaryStatus === 'Inactive' || member.status === 'canceled') {
      //       return 'Inactive';
      //     }

      //     // defaults to inactive
      //     return 'Inactive';
      //   },
      //   'Inactive'
      // ) : patient.status;

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

      const contactMethodMessage = type === 'client'
        ? PREFERRED_CONTACT_METHODS[contactMethod]
        : PREFERRED_CONTACT_METHODS_DENTIST_POV[contactMethod];

      const memberSince = moment(createdAt).format('MMMM D, YYYY');

      const paymentDueDate = moment(membership.endAt).format('MMMM D, YYYY');


      const waiveCancellationFee = !patient.client.cancellationFeeWaiver;
      const waiveReEnrollmentFee = !patient.client.reEnrollmentFeeWaiver;

      let additionalMembershipContent = null;
      if (getAdditionalMembershipContent) {
        additionalMembershipContent = getAdditionalMembershipContent(patient);
      }

      const activeMembers = patients.filter((member) => {
        return member.membership && member.status === 'active';
      });

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
                    Active Family Members:
                    {' '}
                    <span styleName="member-overview__info">{activeMembers.length}</span>
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
                      {/*<MembersList
                        patient={patient.client}
                        dentist={dentist}
                        onReEnrollMember={onReEnrollMember}
                        onRemoveMember={onRemoveMember}
                        onRenewMember={onRenewMember}
                        onUpdateMember={onUpdateMember}
                      />*/}
                      <MemberListEdit
                        patient={patient.client}
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
                        <p>
                          <input
                            type="button"
                            styleName="button--full-width"
                            value="ADD MEMBER"
                            onClick={this.onAddClick.bind(this, patient)}
                          />
                        </p>
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
                        {this.props.onToggleCancelationFee && (
                          <p>
                            <label>
                              <input
                                type="checkbox"
                                onChange={this.onCancelationFeeClick.bind(this, patient)}
                                checked={waiveCancellationFee}
                              />
                              Waive Cancellation Fee
                            </label>
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
