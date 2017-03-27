import React, { PropTypes, Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { reset as resetForm } from 'redux-form';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';

import MemberForm from 'components/MemberFormModal';

import { memberFormOpenedSelector } from 'containers/Dashboard/selectors';
import {
  openMemberForm,
  closeMemberForm,
  setEditingMember,
  submitMemberForm,
  deleteMember,
} from 'containers/Dashboard/actions';

import FamilyMember from './FamilyMember';
import styles from './FamilyMembers.css';


const mapDispatchToProps = (dispatch) => ({
  onSubmitForm: (values, userId) => dispatch(submitMemberForm(values, userId)),
  deleteMember: (id, values) => dispatch(deleteMember(id, values)),
  resetForm: () => dispatch(resetForm('familyMember')),
  openMemberForm: ownerId => dispatch(openMemberForm(ownerId)),
  closeMemberForm: () => dispatch(closeMemberForm()),
  setEditingMember: memberId => dispatch(setEditingMember(memberId)),
});


const mapStateToProps = state => ({
  openedForm: memberFormOpenedSelector(state),
});


@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles, { allowMultiple: true })
export default class FamilyMembers extends Component {

  static propTypes = {
    owner: PropTypes.number.isRequired,
    openedForm: PropTypes.number,
    members: PropTypes.array,
    resetForm: PropTypes.func.isRequired,
    openMemberForm: PropTypes.func.isRequired,
    onSubmitForm: PropTypes.func.isRequired,
    setEditingMember: PropTypes.func.isRequired,
    deleteMember: PropTypes.func.isRequired,
  }

  handleSubmit = (values) => {
    this.props.onSubmitForm(values, this.props.owner);
  }

  addNewMember = () => {
    this.openForm();
    this.props.setEditingMember();
  }

  editMember = (id) => {
    this.openForm();
    this.props.setEditingMember(id);
  }

  deleteMember = (member) => {
    this.props.deleteMember(this.props.owner, member);
  }

  openForm () {
    this.props.resetForm();
    this.props.openMemberForm(this.props.owner);
  }

  render () {
    const { members, openedForm, owner } = this.props;
    const showForm = openedForm === owner;

    return (
      <Well styleName="family-members-container">
        <Row styleName="list-header">
          <Col md={4}>Name</Col>
          <Col md={2} className="text-left">Relation</Col>
          <Col md={2} className="text-left">Fee</Col>
          <Col md={2} className="text-left">Paid Thru</Col>
          <Col md={2} className="text-right">Actions</Col>
        </Row>

        <Row styleName="list-content">
          {members && members.map((member, index) => (
            <FamilyMember
              details={member}
              key={index}
              onEdit={this.editMember}
              onDelete={this.deleteMember}
            />
          ))}
        </Row>

        <Row>
          <Col md={12}>
            <button
              className="btn btn-darkest-green btn-round pull-left"
              onClick={this.addNewMember}
            >
              Add new member
            </button>
          </Col>
        </Row>

        <Row style={{ marginTop: '15px' }}>
          {showForm &&
            <MemberForm
              onSubmit={this.handleSubmit}
            />}
        </Row>
      </Well>
    );
  }
}
