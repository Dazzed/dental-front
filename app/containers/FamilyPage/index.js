/*
Patient Family Page
================================================================================
Route: `/your-family`
*/

/*
Imports
------------------------------------------------------------
*/
// lib
import React from 'react';
import Well from 'react-bootstrap/lib/Well';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// app
import PatientDashboardTabs from 'components/PatientDashboardTabs';
import LoadingSpinner from 'components/LoadingSpinner';
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';

// local
import {
  fetchFamilyMembers,
} from './actions';
import {
  familyMembersSelector,
} from './selectors';
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    familyMembers: familyMembersSelector(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    changePageTitle: (title) => dispatch(changePageTitle(title)),
    fetchFamilyMembers: () => dispatch(fetchFamilyMembers()),
  };
}


/*
Family
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
class FamilyPage extends React.Component {

  static propTypes = {
    changePageTitle: React.PropTypes.func.isRequired,
    familyMembers: React.PropTypes.array,
    fetchFamilyMembers: React.PropTypes.func.isRequired,
  }

  componentDidMount () {
    this.props.changePageTitle('Update Your Family Information');
    this.props.fetchFamilyMembers();
  }

  render () {
    const { familyMembers } = this.props;

    // precondition: the data must be loaded, otherwise wait for it
    if (familyMembers === undefined) {
      return (
        <Well>
          <LoadingSpinner showOnlyIcon={false} />
        </Well>
      );
    }

    return (
        <div>
          <PatientDashboardTabs active="family" />

          <div>
            Family
          </div>
        </div>
    );
  }

}

export default FamilyPage;
