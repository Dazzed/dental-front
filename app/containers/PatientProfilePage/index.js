/*
Patient Profile Page
================================================================================
Route: `/patient/profile`
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
import FaUser from 'react-icons/lib/fa/user';
import { connect } from 'react-redux';
import { reset as resetForm } from 'redux-form';

// app
import Avatar from 'components/Avatar';
import FamilyMembersPlanSummary from 'components/FamilyMembersPlanSummary';
import LoadingSpinner from 'components/LoadingSpinner';
import PatientDashboardHeader from 'components/PatientDashboardHeader';
import PatientDashboardTabs from 'components/PatientDashboardTabs';
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';

// local
import {
  fetchFamilyMembers,
} from './actions';
import {
  membersSelector,
} from './selectors';
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    members: membersSelector(state),
    user: selectCurrentUser(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    changePageTitle: (title) => dispatch(changePageTitle(title)),
    fetchFamilyMembers: () => dispatch(fetchFamilyMembers()),
    resetForm: () => dispatch(resetForm('TODO')),
  };
}


/*
Profile
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
class PatientProfilePage extends React.Component {

  static propTypes = {
    // state
    members: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.array,
    ]),
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]),

    // dispatch
    changePageTitle: React.PropTypes.func.isRequired,
    fetchFamilyMembers: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func.isRequired,
  }

  componentDidMount () {
    this.props.changePageTitle('Your Profile');
    this.props.fetchFamilyMembers();
  }

  /*
  Page Actions
  ------------------------------------------------------------
  */
  changePaymentMethod = () => {
    // TODO
  }

  editProfile = () => {
    // TODO
  }

  editSecuritySettings = () => {
    // TODO
  }

  /*
  Form Events
  ------------------------------------------------------------
  */
  // TODO

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const {
      members,
      user,
    } = this.props;

    /*
    Precondition Renders
    ------------------------------------------------------------
    */
    // precondition: the data must be loaded, otherwise wait for it
    if (user === false || members === false) {
      return (
        <div>
          <PatientDashboardTabs active="profile" />

          <div styleName="content">
            <LoadingSpinner showOnlyIcon={false} />
          </div>
        </div>
      );
    }

    /*
    Main Render
    ------------------------------------------------------------
    */
    const aggregateSubscription = {
      status: members.reduce(
        function(aggregateStatus, member) {
          if ( member.subscription.status === 'past_due'
            || aggregateStatus === 'past_due'
          ) {
            aggregateStatus = 'past_due';
          }

          else if (
               member.subscription.status === 'active'
            || aggregateStatus === 'active'
          ) {
            aggregateStatus = 'active';
          }

          // else
          // member status is 'inactive' or 'canceled'
          // aggregate status is 'inactive'
          // leave it as is

          return aggregateStatus;
        },
        'inactive'
      ),

      total: members.reduce(
        function(aggregateTotal, member) {
          return aggregateTotal + parseFloat(member.subscription.total);
        },
        0
      ),

      dueDate: members.reduce(
        function(nearestPaymentDueDate, member) {
          const memberDueDate = moment(member.subscription.endAt);
          
          if (memberDueDate.isBefore(nearestPaymentDueDate)) {
            nearestPaymentDueDate = memberDueDate;
          }

          return nearestPaymentDueDate;
        },
        moment().add(100, 'years'), // obviously larger than any paid subscription period
      ),
    };

    if (aggregateSubscription.status === 'active') {
      aggregateSubscription.status = 'Active';
    }
    else if (aggregateSubscription.status === 'past_due') {
      aggregateSubscription.status = 'Late';
    }
    else {
      aggregateSubscription.status = 'Inactive';
    }
    aggregateSubscription.total = aggregateSubscription.total.toFixed(2).replace(".00", "");
    aggregateSubscription.dueDate = aggregateSubscription.dueDate.format("MMMM D, YYYY");

    return (
      <div>
        <PatientDashboardHeader user={user} />
        <PatientDashboardTabs active="profile" />

        <div styleName="content">

          {/*
          Account Status
          ------------------------------------------------------------
          */}
          <div styleName="segment">
            <div styleName="account-status">
              <p>
                <span styleName="text--inline-label">Primary Account Hoder:</span>
                <span styleName="text--primary--bold">{user.firstName} {user.lastName}</span>
              </p>

              <p>
                <span styleName="text--inline-label">Account Status:</span>
                <span styleName="text--primary--bold">{aggregateSubscription.status}</span>
              </p>

              <p>
                <span styleName="text--inline-label">Current Balance:</span>
                <span styleName="text--bold">${aggregateSubscription.total}</span>
              </p>

              <p>
                <span styleName="text--inline-label">Payment Due Date:</span>
                <span styleName="text--bold">{aggregateSubscription.dueDate}</span>
              </p>
            </div>
          </div>

          {/*
          Your Members
          ------------------------------------------------------------
          */}
          <div styleName="segment">

            <p styleName="text--label">
              Your Memberships:
            </p>

            <FamilyMembersPlanSummary members={members} />

          </div>

          {/*
          Profile & Payment Info
          ------------------------------------------------------------
          */}
          <div styleName="segment">
            <div className="row" styleName="personal-info">

              <div className="col-md-7">
                <p>
                  <span styleName="text--label">Address:</span>
                  <br />
                  {user.address}
                  <br />
                  {user.city}, {user.state} {user.zipCode}
                </p>

                <p>
                  <span styleName="text--label">Phone:</span>
                  <br />
                  {user.phone}
                </p>

                <p>
                  <span styleName="personal-info__change-link" onClick={this.editProfile}>
                    Edit Profile
                  </span>

                  <span styleName="personal-info__change-link" onClick={this.editSecuritySettings}>
                    Login &amp; Security Settings
                  </span>
                </p>
              </div>

              <div className="col-md-5">
                <p>
                  <span styleName="text--label">Payment Info:</span>

                  <span styleName="personal-info__change-link" onClick={this.changePaymentMethod}>
                    Edit / Add Payment Method
                  </span>
                </p>

                <p>
                  <span styleName="text--bold">Card Number</span>
                  <br />
                  Visa ending in 1731 {/* TODO */}
                </p>

                <p>
                  <span styleName="text--bold">Name</span>
                  <br />
                  Bob Sample {/* TODO */}
                </p>

                <p>
                  <span styleName="text--bold">Exp. Date</span>
                  <br />
                  02/2019 {/* TODO */}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default PatientProfilePage;
