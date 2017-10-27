/*
Patient Accounting Page
================================================================================
Route: `/patient/accounting`
*/

/*
Imports
------------------------------------------------------------
*/

// lib
import React from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

// app
import Avatar from 'components/Avatar';
import LoadingSpinner from 'components/LoadingSpinner';
import NavBar from 'components/NavBar';
import PatientDashboardHeader from 'components/PatientDashboardHeader';
import PatientDashboardTabs from 'components/PatientDashboardTabs';
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';
import {
  // payments
  fetchPatientPayments,
  setPaymentFilters
} from 'containers/AccountingModule/actions';
import {
  // payments
  patientPaymentsSelector,
  paymentFiltersSelector,
} from 'containers/AccountingModule/selectors';
import {
  fetchDentist,
} from 'containers/PatientProfilePage/actions';
import {
  dentistSelector,
} from 'containers/PatientProfilePage/selectors';

// local
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps(state) {
  return {
    // fetch
    dentist: dentistSelector(state),
    user: selectCurrentUser(state),

    // payments
    payments: patientPaymentsSelector(state),
    filters: paymentFiltersSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // app
    changePageTitle: (title) => dispatch(changePageTitle(title)),

    // fetch
    fetchDentist: () => dispatch(fetchDentist()),

    // payments
    fetchPayments: (patientId, year) => dispatch(fetchPatientPayments(patientId, year)),
    setPaymentFilters: (patientId, year) => dispatch(setPaymentFilters(patientId, year)),
  };
}

/*
Patient Accounting Page
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
export default class PatientAccountingPage extends React.Component {

  static propTypes = {
    // react
    location: React.PropTypes.object.isRequired,

    // app - dispatch
    changePageTitle: React.PropTypes.func.isRequired,

    // fetch - state
    dentist: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]),
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]),

    // fetch - dispatch
    fetchDentist: React.PropTypes.func.isRequired,

    // payments - state
    payments: React.PropTypes.array,
    filters: React.PropTypes.object,

    // payments - dispatch
    fetchPayments: React.PropTypes.func.isRequired,
    setPaymentFilters: React.PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.changePageTitle('Accounting');
    this.props.fetchDentist();

    if (this.props.user.id !== undefined) {
      this.props.fetchPayments(this.props.user.id, this.props.filters.year);
      this.props.setPaymentFilters(this.props.user.id);
    }
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render() {
    const {
      // react
      location,

      // fetch
      dentist,
      user,
    } = this.props;

    // precondition: the data must be loaded, otherwise wait for it
    if (dentist === false || !dentist.dentistInfo) {
      return (
        <div>
          <NavBar pathname={location.pathname} logo={false} />
          <PatientDashboardTabs active={false} />

          <div styleName="content">
            {
              dentist && !dentist.dentistInfo ?
                <h3 className="text-muted block text-center">You Have No Membership</h3> :
                <LoadingSpinner showOnlyIcon={false} />
            }
            
          </div>
        </div>
      );
    }

    /*
    Main Render
    ------------------------------------------------------------
    */
    return (
      <div>
        <NavBar pathname={location.pathname} logo={dentist.dentistInfo.logo || false} />
        <PatientDashboardHeader user={user} />
        <PatientDashboardTabs active={false} />

        <div styleName="content">

          <div className="row">

            {/*
            Patient Accounting History
            ------------------------------------------------------------
            */}
            TODO

            {/* End Row */}
          </div>

          {/* End Content */}
        </div>

        {/* End Wrapper Div */}
      </div>
    );
  }
}
