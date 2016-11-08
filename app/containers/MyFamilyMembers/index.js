/*
 *
 * MyFamilyMembers
 *
 */

import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

import { changePageTitle } from 'containers/App/actions';
import { fetchMyFamily } from 'containers/Dashboard/actions';
import { selectMembersList } from './selectors';
import styles from './styles.css';
import FamilyMembers from './FamilyMembers';

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles, { allowMultiple: true })
export default class MyFamilyMembers extends Component {
  static propTypes = {
    membersList: PropTypes.array,
    fetchMyFamily: PropTypes.func,
    setEditingMember: PropTypes.func,
    onSubmitForm: PropTypes.func,
    deleteMember: PropTypes.func,
    resetForm: PropTypes.func,
    changePageTitle: PropTypes.func,
  }

  componentWillMount () {
    this.props.fetchMyFamily();
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
    fetchMyFamily: () => dispatch(fetchMyFamily()),
    changePageTitle: (title) => dispatch(changePageTitle(title)),
  };
}
