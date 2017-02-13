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
          Account Status Row
          ------------------------------------------------------------
          */}
          <div className="row">
            Test 1
          </div>

          {/*
          Plan Details Row
          ------------------------------------------------------------
          */}
          <div className="row">
            Test 2
          </div>

          {/*
          Profile & Payment Info Row
          ------------------------------------------------------------
          */}
          <div className="row">
            Test 3
          </div>

        </div>
      </div>
    );
  }
}

export default YourProfilePage;
