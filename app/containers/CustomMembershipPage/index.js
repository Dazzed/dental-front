import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

import { changePageTitle } from 'containers/App/actions';
import LoadingSpinner from 'components/LoadingSpinner';
import { selectCurrentUser } from 'containers/App/selectors';
import styles from './styles.css';
import CustomPlans from './components/customPlans';
import CreatePlanForm from './components/createPlan';

import {
  fetchDentistInfo,
  createMembership,
  editMembership,
  setEditingMembershipId,
  deleteMembership,
  setDeletingMembershipId
} from './actions';
import {
  selectActivePlans,
  selectSeedPlans
} from './selectors';

class CustomMembershipPage extends Component {

  static propTypes = {
    changePageTitle: React.PropTypes.func.isRequired,
    fetchDentistInfo: PropTypes.func.isRequired,
    createMembership: PropTypes.func.isRequired,
    editMembership: PropTypes.func.isRequired,
    setEditingMembershipId: PropTypes.func.isRequired,
    deleteMembership: PropTypes.func.isRequired,
    setDeletingMembershipId: PropTypes.func.isRequired,

    user: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]).isRequired,

    dentistInfo: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]).isRequired,
    seedPlans: PropTypes.array.isRequired,
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
      deletingMembershipId,
      seedPlans
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
          setEditingMembershipId={this.props.setEditingMembershipId}
          setDeletingMembershipId={this.props.setDeletingMembershipId}
          deleteMembership={this.props.deleteMembership}
          deletingMembershipId={deletingMembershipId}
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
    editingMembershipId,
    deletingMembershipId
  } = state.dentistCustomMembershipPage;
  return {
    user: selectCurrentUser(state),
    dentistInfo: selectActivePlans(dentistInfo),
    loading,
    editingMembershipId,
    deletingMembershipId,
    seedPlans: selectSeedPlans(state)
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    changePageTitle,
    fetchDentistInfo,
    createMembership,
    editMembership,
    setEditingMembershipId,
    setDeletingMembershipId,
    deleteMembership
  }, dispatch);
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(CSSModules(
  styles, { allowMultiple: true }
)(CustomMembershipPage));
