import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

import LoadingSpinner from 'components/LoadingSpinner';
import { selectCurrentUser } from 'containers/App/selectors';
import styles from './styles.css';
import CustomPlans from './components/customPlans';
import CreatePlanForm from './components/createPlan';
import { changePageTitle } from 'containers/App/actions';
import {
  fetchDentistInfo,
  createMembership,
  editMembership,
  setEditingMembershipId
} from './actions';
import {
  selectActivePlans
} from './selectors';

class CustomMembershipPage extends Component {

  static propTypes = {
    changePageTitle: React.PropTypes.func.isRequired,
    fetchDentistInfo: PropTypes.func.isRequired,
    createMembership: PropTypes.func.isRequired,
    editMembership: PropTypes.func.isRequired,
    setEditingMembershipId: PropTypes.func.isRequired,

    user: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]).isRequired,

    dentistInfo: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]).isRequired,

    loading: PropTypes.object.isRequired
  }

  componentWillMount () {
    if (this.props.user) {
      this.props.fetchDentistInfo();
    }
  }

  componentDidMount () {
    this.props.changePageTitle('Custom Memberships');
  }
  

  createPlan = values => {
    this.props.createMembership(values);
  }

  editPlan = values => {
    const { editingMembershipId: membershipId } = this.props;
    this.props.editMembership({ ...values, membershipId });
  }

  render () {
    const {
      dentistInfo,
      loading,
      setEditingMembershipId
    } = this.props;

    if (!dentistInfo) {
      return (
        <div>
          <LoadingSpinner showOnlyIcon={false} />
        </div>
      );
    }

    return (
      <div>
        <p styleName="plan-header">Custom Membership Plans</p>
        <CustomPlans
          plans={dentistInfo.custom_memberships}
          onSubmit={this.editPlan}
          loading={loading.editingMembership}
          setEditingMembershipId={setEditingMembershipId}
        />
        <CreatePlanForm
          priceCodes={dentistInfo.priceCodes}
          onSubmit={this.createPlan}
          loading={loading.creatingMembership}
        />
      </div>
    );
  }
}

function mapStateToProps (state) {
  const {
    dentistInfo,
    loading,
    editingMembershipId
  } = state.dentistCustomMembershipPage;
  return {
    user: selectCurrentUser(state),
    dentistInfo: selectActivePlans(dentistInfo),
    loading,
    editingMembershipId
  };
}

function mapDispatchToProps (dispatch) {
  return {
    changePageTitle: (title) => dispatch(changePageTitle(title)),

    fetchDentistInfo: () => dispatch(fetchDentistInfo()),
    createMembership: values => dispatch(createMembership(values)),
    editMembership: (values, membershipId) => dispatch(editMembership(values, membershipId)),
    setEditingMembershipId: value => dispatch(setEditingMembershipId(value)),
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(CSSModules(
  styles, { allowMultiple: true }
)(CustomMembershipPage));
