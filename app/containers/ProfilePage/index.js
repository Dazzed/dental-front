/*
 *
 * EditDentistMember
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Well from 'react-bootstrap/lib/Well';
import pick from 'lodash/pick';

import ProfileForm from 'components/ProfileForm';
import LoadingSpinner from 'components/LoadingSpinner';
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';
import { submitProfileForm } from 'containers/ProfilePage/actions';

const FIELDS_ARRAY = [
  'firstName', 'middleName', 'lastName',
  'email', 'contactMethod',
  'address', 'address2', 'city', 'state', 'zipCode', 'phone',
  'birthDate', 'sex', 'joinMembership',
];

@connect(mapStateToProps, mapDispatchToProps)
class ProfilePage extends React.Component {

  static propTypes = {
    currentUser: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
    isSaving: React.PropTypes.bool,
    dispatchSubmit: React.PropTypes.func,
    changePageTitle: React.PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  componentWillMount () {
    this.props.changePageTitle('Edit Your Information');
  }

  onSubmitForm (data) {
    this.props.dispatchSubmit(data);
  }

  render () {
    const { currentUser, isSaving } = this.props;

    return (
      <Well>
        { currentUser &&
          <ProfileForm
            initialValues={currentUser}
            onSubmit={this.onSubmitForm}
            isSaving={isSaving}
          />
        }
        { !currentUser &&
          <LoadingSpinner showOnlyIcon={false} />
        }
      </Well>
    );
  }
}


function mapStateToProps (state) {
  return {
    isSaving: state.profile.submitting,
    currentUser: selectCurrentUser(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchSubmit: (data) => {
      dispatch(submitProfileForm(pick(data, FIELDS_ARRAY)));
    },
    changePageTitle: (title) => dispatch(changePageTitle(title)),
  };
}
export default ProfilePage;
