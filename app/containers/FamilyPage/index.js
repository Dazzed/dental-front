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
import moment from 'moment';
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import CSSModules from 'react-css-modules';
import FaUser from 'react-icons/lib/fa/user';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { reset as resetForm } from 'redux-form';

// app
import { MEMBER_RELATIONSHIP_TYPES } from 'common/constants';
import FamilyMembersList from 'components/FamilyMembersList';
import LoadingSpinner from 'components/LoadingSpinner';
import MemberForm from 'components/MemberForm';
import PatientDashboardTabs from 'components/PatientDashboardTabs';
import { changePageTitle } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';

// local
import {
  fetchFamilyMembers,
  setEditingMember,
  clearEditingMember,
  submitMemberForm,
} from './actions';
import {
  editingActiveSelector,
  membersSelector,
} from './selectors';
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    editingActive: editingActiveSelector(state),
    members: membersSelector(state),
    user: selectCurrentUser(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    changePageTitle: (title) => dispatch(changePageTitle(title)),
    fetchFamilyMembers: () => dispatch(fetchFamilyMembers()),
    resetForm: () => dispatch(resetForm('familyMember')),
    setEditingMember: (member) => dispatch(setEditingMember(member)),
    clearEditingMember: () => dispatch(clearEditingMember()),
    submitMemberForm: (values, userId) => dispatch(submitMemberForm(values, userId)),
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
    // state
    editingActive: React.PropTypes.bool.isRequired,
    members: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.array,
    ]),
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]),

    // dispatch
    changePageTitle: React.PropTypes.func.isRequired,
    fetchFamilyMembers: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func.isRequired,
    setEditingMember: React.PropTypes.func.isRequired,
    clearEditingMember: React.PropTypes.func.isRequired,
    submitMemberForm: React.PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props);

    this.state = {
      showCancelModal: false,
    };
  }

  componentDidMount () {
    this.props.changePageTitle('Update Your Family Information');
    this.props.fetchFamilyMembers();
  }

  /*
  Page Actions
  ------------------------------------------------------------
  */
  addMember = () => {
    this.props.resetForm();
    this.props.setEditingMember(null);
  }

  editMember = (member) => {
    this.props.resetForm();
    this.props.setEditingMember(member);
  }

  cancelMemberFormAction = () => {
    this.props.clearEditingMember();
  }

  cancelMember = (member) => {
    // TODO

    this.toggleCancelModal();
  }

  /*
  Form Submissions
  ------------------------------------------------------------
  */
  handleMemberFormSubmit = (values) => {
    this.props.submitMemberForm(values, this.props.user.id);
  }

  handleCancelSubmit = (values) => {
    // TODO
  }

  /*
  Modal Toggles
  ------------------------------------------------------------
  */
  toggleCancelModal = () => {
    this.setState({
      ...this.setState,
      showCancelModal: !this.state.showCancelModal,
    });
  }

  /*
  Render
  ------------------------------------------------------------
  */
  render () {
    const { editingActive, members } = this.props;

    // precondition: the data must be loaded, otherwise wait for it
    if (members === false) {
      return (
        <div>
          <PatientDashboardTabs active="family" />

          <div styleName="content">
            <LoadingSpinner showOnlyIcon={false} />
          </div>
        </div>
      );
    }

    return (
      <div>
        <PatientDashboardTabs active="family" />

        <div styleName="content">
          <div styleName="add-family-member-wrapper">
            <input
              type="button"
              styleName="button"
              value="ADD FAMILY MEMBER +"
              onClick={this.addMember}
            />
          </div>

          <FamilyMembersList
            members={members}
            onCancel={this.cancelMember}
            onEdit={this.editMember}
          />          
        </div>

        {/*
        Member Form Modal
        ------------------------------------------------------------
        */}
        <MemberForm
          show={editingActive}
          onCancel={this.cancelMemberFormAction}
          onSubmit={this.handleMemberFormSubmit}
        />

        {/*
        Cancel Family Member Modal
        ------------------------------------------------------------
        */}
        <Modal
          backdrop={'static'}
          onHide={this.toggleCancelModal}
          show={this.state.showCancelModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Cancel A Family Member</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            TODO: CANCEL
          </Modal.Body>

          <Modal.Footer>
            TODO: CANCEL
          </Modal.Footer>
        </Modal>

      </div>
    );
  }

}

export default FamilyPage;
