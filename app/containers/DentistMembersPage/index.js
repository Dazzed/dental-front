/*
Dentist Members Page
================================================================================
Route: `/dentist/members`
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
Members
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
class DentistMembersPage extends React.Component {

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
    this.props.changePageTitle('Members');
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
          <DentistDashboardTabs active="members" />

          <div styleName="content">
            <LoadingSpinner showOnlyIcon={false} />
          </div>
        </div>
      );
    }

    return (
      <div>
        <DentistDashboardTabs active="members" />

        <div styleName="content">
          {/* TODO: remove */}
          Dentist Members Page

          {/* TODO: sort by */}
          {/* TODO: list members */}

        </div>

        {/* TODO: modals */}
      </div>
    );
  }
}

export default DentistMembersPage;
