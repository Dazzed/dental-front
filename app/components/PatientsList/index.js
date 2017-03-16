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

// app
import {
  MEMBER_RELATIONSHIP_TYPES,
  PREFERRED_CONTACT_METHODS_DENTIST_POV,
} from 'common/constants';
import Avatar from 'components/Avatar';

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
    onToggleCancelationFee: React.PropTypes.func.isRequired,
    onToggleReEnrollmentFee: React.PropTypes.func.isRequired,

    onReEnrollMember: React.PropTypes.func.isRequired,
    onRenewMember: React.PropTypes.func.isRequired,
    onUpdateMember: React.PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props);

    this.state = {
      showMemberDetails: false,
    };
  }

  /*
  State Actions
  ------------------------------------------------------------
  */
  toggleMemberDetails = () => {
    this.setState({
      ...this.state,
      showMemberDetails: !this.state.showMemberDetails
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

  // NOTE: The following functions must be bound to the patient and member in
  //       the member specific event attributes.
  onReEnrollClick = (patient, member) => {
    this.props.onReEnrollMember(patient, member);
  }
  onRenewClick = (patient, member) => {
    this.props.onRenewMember(patient, member);
  }
  onUpdateClick = (patient, member) => {
    this.props.onUpdateMember(patient, member);
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      patients,
      getAdditionalMembershipContent,
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
      } = patient;

      let statusStyle = "member-overview__status";
      switch(subscription.status) {
        case "active":
          statusStyle += " member-overview__status--active";
          break;

        case "past_due":
          statusStyle += " member-overview__status--past-due";
          break;

        case "canceled":
          statusStyle += " member-overview__status--canceled";
          break;

        case "inactive":
          statusStyle += " member-overview__status--inactive";
          break;

        default:
          // Status is unknown, so don't add anything;
          break;
      }

      // TODO: might have to change to reflect the dentist's perspective
      const contactMethodMessage = PREFERRED_CONTACT_METHODS_DENTIST_POV[contactMethod];

      // TODO: test the size of members when the patient is also active on the plan
      const familySize = members.length + 1; // include the user (patient)

      const memberSince = moment(createdAt).format("MMM D, YYYY");

      const paymentDueAmount = (
          // patient's fee
          parseFloat(subscription.total)

          // sum of family members' fees
        + members.reduce(function(currentTotal, member) {
            return currentTotal + parseFloat(member.subscription.total);
          }, 0)

        // ensure that there are 2 decimal places (EX: "0.00" instead of "0")
      ).toFixed(2);

      const paymentDueDate = moment(subscription.endAt).format("MMM D, YYYY");

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
                    <span styleName={statusStyle}>({subscription.status})</span>
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
                    <div className="col-sm-3">
                      <span styleName="member-overview__info">{phone}</span>
                    </div>
                    <div className="col-sm-6">
                      <a href={`mailto:${email}`} styleName="member-overview__email">{email}</a>
                    </div>
                    <div className="col-sm-3 text-right">
                      <span styleName="member-overview__details-toggle" onClick={this.toggleMemberDetails}>
                        Member Details
                        {' '}
                        {this.state.showMemberDetails
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
              {this.state.showMemberDetails && (
                <div className="row">
                  
                  {/*
                  Family Members List
                  ------------------------------------------------------------
                  */}
                  <div className="col-sm-8">
                    {/* TODO: make a dentist oriented version of the family members list and include it here */}
                  </div>
                                   
                  <div className="col-sm-4">
                    {/*
                    Subscription Overview
                    ------------------------------------------------------------
                    TODO: Clarify what values to show for each member status, and
                          how to calculate them.
                    */}
                    <div styleName="subscription-overview">
                      <p>
                        Membership:
                        {' '}
                        {/* TODO: set a colored status style similar to the membership-overview status */}
                        <span>{subscription.status}</span>
                      </p>
                      <p>
                        Recurring Payment Date:
                        {' '}
                        <span styleName="subscription-overview__info">{paymentDueDate}</span>
                      </p>
                      <p>
                        Total Monthly Payment:
                        {' '}
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
                          styleName="button--wide"
                          value="ADD MEMBER"
                          onClick={this.onAddClick.bind(this, patient)}
                        />
                      </p>
                      <p>
                        <label>
                          <input
                            type="checkbox"
                            onChange={this.onCancelationFeeClick.bind(this, patient)}
                          />
                          Waive Cancellation Fee
                        </label>
                      </p>
                      <p>
                        <label>
                          <input
                            type="checkbox"
                            onChange={this.onReEnrollmentFeeClick.bind(this, patient)}
                          />
                          Waive Re-enrollment Fee
                        </label>
                      </p>
                    </div>

                  {/* End Right Col */}
                  </div>
                {/* End Member Details Row */}
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
