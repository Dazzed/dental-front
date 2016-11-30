/*
 *
 * EditDentistMember
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { push } from 'react-router-redux';
import { fetchMyPatients } from 'containers/Dashboard/actions';
import { changePageTitle } from 'containers/App/actions';

import {
  allMembersSelector,
} from 'containers/Dashboard/selectors';

import styles from './styles.css';
import FamilyMembers from './FamilyMembers';


@connect(mapStateToProps, mapDispatchToProps)
export class EditDentistMember extends React.Component {

  static propTypes = {
    patients: React.PropTypes.array,
    fetchMyPatients: React.PropTypes.func.isRequired,
    changePageTitle: React.PropTypes.func.isRequired,
  }

  componentWillMount () {
    this.props.changePageTitle('Manage Members');

    if (!this.props.patients) {
      this.props.fetchMyPatients();
    }
  }

  render () {
    const { patients } = this.props;
    return (
      <div className={styles.editDentistMember}>
        {patients && patients.map(item =>
          <FamilyMembers
            key={item.id}
            membersList={item.familyMembers}
            title={`${item.firstName} ${item.lastName}'s family members`}
            userId={item.id}
            user={item}
            subscription={item.subscriptions && item.subscriptions[0]}
          />
        )}
      </div>
    );
  }
}


function mapStateToProps (state) {
  return {
    patients: allMembersSelector(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    fetchMyPatients: () => dispatch(fetchMyPatients()),
    changeRoute: (url) => dispatch(push(url)),
    changePageTitle: (title) => dispatch(changePageTitle(title)),
  };
}
export default EditDentistMember;
