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
  PREFERRED_CONTACT_METHODS,
  PREFERRED_CONTACT_METHODS_DENTIST_POV,
} from 'common/constants';
import Avatar from 'components/Avatar';
import MembersList from 'components/MembersList';

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

    onReEnrollMember: React.PropTypes.func.isRequired,
    onRemoveMember: React.PropTypes.func.isRequired,
    onRenewMember: React.PropTypes.func.isRequired,
    onUpdateMember: React.PropTypes.func.isRequired,
  }

  constructor (props) {
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
    this.props.onToggleCancelationFee(patient);
  }

  onReEnrollmentFeeClick = (patient) => {
    this.props.onToggleReEnrollmentFee(patient);
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
  render () {
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
        phone,
        subscription,
        type,
      } = patient;

      let statusStyle = "status";
      switch(subscription.status) {
        case "active":
          statusStyle += " status--active";
          break;

        case "past_due":
          statusStyle += " status--past-due";
          break;

        case "canceled":
          statusStyle += " status--canceled";
          break;

        case "inactive":
          statusStyle += " status--inactive";
          break;

        default:
          // Status is unknown, so don't add anything;
          break;
      }

      const contactMethodMessage = type === "client"
                                 ? PREFERRED_CONTACT_METHODS[contactMethod]
                                 : PREFERRED_CONTACT_METHODS_DENTIST_POV[contactMethod];

      // TODO: test the size of members when the patient is also active on the plan
      const familySize = members.length + 1; // include the user (patient)

      const memberSince = moment(createdAt).format("MMMM D, YYYY");

      const paymentDueAmount = parseFloat(subscription.total).toFixed(2);

      const paymentDueDate = moment(subscription.endAt).format("MMMM D, YYYY");

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
                <p styleName="member-category">External</p> {/* TODO: external vs. internal??? */}
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
                      ({subscription.status})
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
                    Family Member Joined:
                    {' '}
                    <span styleName="member-overview__info">{familySize}</span>
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
                      <MembersList
                        patient={patient}

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
                      TODO: Clarify what values to show for each member status, and
                            how to calculate them.
                      */}
                      <div styleName="subscription-overview">
                        <p>
                          Membership:
                          <br />
                          <span styleName={statusStyle}>{subscription.status}</span>
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
