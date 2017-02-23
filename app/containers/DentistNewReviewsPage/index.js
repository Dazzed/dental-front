/*
Dentist New Reviews Page
================================================================================
Route: `/dentist/new-reviews`
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
import DentistDashboardHeader from 'components/DentistDashboardHeader';
import DentistDashboardTabs from 'components/DentistDashboardTabs';
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
    // TODO
  };
}


/*
New Reviews
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
class DentistNewReviewsPage extends React.Component {

  static propTypes = {
    // state
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]),
    // TODO

    // dispatch
    changePageTitle: React.PropTypes.func.isRequired,
    // TODO
  }

  componentDidMount() {
    this.props.changePageTitle('New Reviews');
  }

  /*
  Page Actions
  ------------------------------------------------------------
  */
  // TODO

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
      // TODO
    } = this.props;

    // precondition: the data must be loaded, otherwise wait for it
    // TODO
    if (false) {
      return (
        <div>
          {/* TODO */}
          <DentistDashboardHeader revenueToDate="$100,000" />
          <DentistDashboardTabs active="new-reviews" />

          <div styleName="content">
            <LoadingSpinner showOnlyIcon={false} />
          </div>
        </div>
      );
    }

    return (
      <div>
        {/* TODO */}
        <DentistDashboardHeader revenueToDate="$100,000" />
        <DentistDashboardTabs active="new-reviews" />

        <div styleName="content">
          {/* TODO: remove */}
          Dentist New Reviews Page

          {/* TODO: sort by */}
          {/* TODO: list reviews */}

        </div>

        {/* TODO: modals */}
      </div>
    );
  }
}

export default DentistNewReviewsPage;
