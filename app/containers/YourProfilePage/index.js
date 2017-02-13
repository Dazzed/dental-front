/*
Patient Profile Page
================================================================================
Route: `/your-profile`
*/

/*
Imports
------------------------------------------------------------
*/
 // lib
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import CSSModules from 'react-css-modules';
import FaUser from 'react-icons/lib/fa/user';
import { connect } from 'react-redux';
import { reset as resetForm } from 'redux-form';

// app
import Avatar from 'components/Avatar';
import LoadingSpinner from 'components/LoadingSpinner';
import PatientDashboardTabs from 'components/PatientDashboardTabs';
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';

// local
import {
  // TODO
} from './actions';
import {
  // TODO
} from './selectors';
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    user: selectCurrentUser(state),
    // TODO
  };
}

function mapDispatchToProps (dispatch) {
  return {
    changePageTitle: (title) => dispatch(changePageTitle(title)),
    resetForm: () => dispatch(resetForm('TODO')),
    // TODO
  };
}


/*
Profile
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
class YourProfilePage extends React.Component {

  static propTypes = {
    // state
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]),

    // dispatch
    changePageTitle: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func.isRequired,
  }

  componentDidMount () {
    this.props.changePageTitle('Your Profile');
  }

  /*
  Page Actions
  ------------------------------------------------------------
  */
  makePayment = () => {
    // TODO
  }

  editPlan = () => {
    // TODO
  }

  changePaymentMethod = () => {
    // TODO
  }

  editProfile = () => {
    // TODO
  }

  editSecuritySettings = () => {
    // TODO
  }

  cancelMembership = () => {
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
    const { user } = this.props;

    // precondition: the data must be loaded, otherwise wait for it
    if (user === false) {
      return (
        <div>
          <PatientDashboardTabs active="profile" />

          <div styleName="content">
            <LoadingSpinner showOnlyIcon={false} />
          </div>
        </div>
      );
    }

    return (
      <div>
        <PatientDashboardTabs active="profile" />

        <div styleName="content">

          {/*
          Account Status
          ------------------------------------------------------------
          */}
          <div className="row" styleName="segment">

            <div className="col-md-9">
              <p>
                <span styleName="text--inline-label">Account Status:</span>
                <span styleName="text--primary--bold">Active{/* TODO */}</span>
              </p>

              <p>
                <span styleName="text--inline-label">Current Balance:</span>
                <span styleName="text--bold">$100{/* TODO */}</span>
              </p>

              <p>
                <span styleName="text--inline-label">Payment Due Date:</span>
                <span styleName="text--bold">December 7, 2017{/* TODO */}</span>
              </p>
            </div>

            <div className="col-md-3">
              <div styleName="user-action-buttons">
                <p>
                  <input
                    type="button"
                    styleName="button--full-width"
                    value="MAKE A PAYMENT"
                    onClick={this.makePayment}
                  />
                </p>

                <p>
                  <input
                    type="button"
                    styleName="button--lowlight--full-width"
                    value="EDIT PLAN"
                    onClick={this.editPlan}
                  />
                </p>
              </div>
            </div>

          </div>

          {/*
          Plan Details
          ------------------------------------------------------------
          */}
          <div styleName="segment">

            <p styleName="text--label">
              Plan Details:
            </p>

            {/* TODO */}
            {/* Move into a component and hookup to membership info... */}
            <div styleName="plan-details">
              <div className="row" styleName="plan-details__header">
                <div className="col-md-4">Name</div>
                <div className="col-md-3">Relationship</div>
                <div className="col-md-3">Plan Type</div>
                <div className="col-md-2">Monthly Fee</div>
              </div>

              <div className="row" styleName="plan-details__entry">
                <div className="col-md-4" styleName="plan-details__entry__title">Bob Sample</div>
                <div className="col-md-3">You</div>
                <div className="col-md-3">Custom</div>
                <div className="col-md-2">$50.00</div>
              </div>

              <div className="row" styleName="plan-details__entry">
                <div className="col-md-4" styleName="plan-details__entry__title">Bob Sample</div>
                <div className="col-md-3">You</div>
                <div className="col-md-3">Custom</div>
                <div className="col-md-2">$50.00</div>
              </div>

              <div className="row" styleName="plan-details__entry">
                <div className="col-md-4" styleName="plan-details__entry__title">Bob Sample</div>
                <div className="col-md-3">You</div>
                <div className="col-md-3">Custom</div>
                <div className="col-md-2">$50.00</div>
              </div>
            </div>

            <div className="row" styleName="plan-total">
              <div className="col-md-10" styleName="plan-total__label">
                Total Monthly Membership Fee:
              </div>

              <div className="col-md-2" styleName="plan-total__amount">
                $100.00 {/* TODO */}
              </div>
            </div>

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
                  123 Address Street {/* TODO */}
                  <br />
                  Cityname, NC 12345 {/* TODO */}
                </p>

                <p>
                  <span styleName="text--label">Phone:</span>
                  <br />
                  123-456-7788 {/* TODO */}
                </p>

                <p>
                  <span styleName="personal-info__change-link" onClick={this.editProfile}>
                    Edit Profile
                  </span>

                  <span styleName="personal-info__change-link" onClick={this.editSecuritySettings}>
                    Login &amp; Security Settings
                  </span>

                  <span styleName="personal-info__change-link" onClick={this.cancelMembership}>
                    Cancel Membership
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

export default YourProfilePage;
