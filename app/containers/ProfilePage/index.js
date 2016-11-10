/*
 *
 * EditDentistMember
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Well from 'react-bootstrap/lib/Well';
// import pick from 'lodash/pick';
import omit from 'lodash/omit';

import ProfileForm from 'components/ProfileForm';
import LoadingSpinner from 'components/LoadingSpinner';
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';
import {
  fetchProfileData,
  submitProfileForm
} from 'containers/ProfilePage/actions';

@connect(mapStateToProps, mapDispatchToProps)
class ProfilePage extends React.Component {

  static propTypes = {
    profileData: React.PropTypes.any,
    isSaving: React.PropTypes.bool,
    dispatchSubmit: React.PropTypes.func,
    fetchProfileData: React.PropTypes.func.isRequired,
    changePageTitle: React.PropTypes.func.isRequired,
  }

  componentDidMount () {
    this.props.changePageTitle('Edit Your Information');
    this.props.fetchProfileData();
  }

  onSubmitForm = (data) => {
    this.props.dispatchSubmit(data);
  }

  render () {
    const { isSaving, profileData } = this.props;

    if (!profileData) {
      return (
        <Well>
          <LoadingSpinner showOnlyIcon={false} />
        </Well>
      );
    }

    return (
      <Well>
        <ProfileForm
          onSubmit={this.onSubmitForm}
          isSaving={isSaving}
        />
      </Well>
    );
  }
}


function mapStateToProps (state) {
  return {
    isSaving: state.profilePage.submitting,
    profileData: selectCurrentUser(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchSubmit: (data) => {
      dispatch(submitProfileForm(omit(data, 'unknown')));
    },
    fetchProfileData: () => dispatch(fetchProfileData()),
    changePageTitle: (title) => dispatch(changePageTitle(title)),
  };
}
export default ProfilePage;
