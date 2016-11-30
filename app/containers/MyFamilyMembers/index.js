/*
 *
 * MyFamilyMembers
 *
 */

import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

import { changePageTitle } from 'containers/App/actions';
import { fetchMyMembers } from 'containers/Dashboard/actions';
import { selectMembersList } from './selectors';
import styles from './styles.css';
import FamilyMembers from './FamilyMembers';

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles, { allowMultiple: true })
export default class MyFamilyMembers extends Component {
  static propTypes = {
    membersList: PropTypes.array,
    fetchMyMembers: PropTypes.func,
    setEditingMember: PropTypes.func,
    onSubmitForm: PropTypes.func,
    deleteMember: PropTypes.func,
    resetForm: PropTypes.func,
    changePageTitle: PropTypes.func,
  }

  componentWillMount () {
    this.props.fetchMyMembers();
    this.props.changePageTitle('Manage Family Members');
  }

  render () {
    const { membersList } = this.props;

    return (
      <FamilyMembers
        membersList={membersList}
        title="Your Family Memberships"
      />
    );
  }
}


function mapStateToProps (state) {
  return {
    membersList: selectMembersList(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    fetchMyMembers: () => dispatch(fetchMyMembers()),
    changePageTitle: (title) => dispatch(changePageTitle(title)),
  };
}
