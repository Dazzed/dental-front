import React, { PropTypes, Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { reset as resetForm } from 'redux-form';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';

import AddFamilyMemberForm from 'components/AddFamilyMemberForm';
import {
  setEditingMember,
  submitMemberForm,
  deleteMember,
} from 'containers/MyFamilyMembers/actions';

import FamilyMember from './FamilyMember';
import styles from './FamilyMembers.css';


@CSSModules(styles, { allowMultiple: true })
class FamilyMembers extends Component {
  static propTypes = {
    accountStatus: PropTypes.string,
    monthlyDue: PropTypes.string,
    dueDate: PropTypes.string,
    members: PropTypes.array,
    owner: PropTypes.object,
    setEditingMember: PropTypes.func,
    onSubmitForm: PropTypes.func,
    deleteMember: PropTypes.func,
    resetForm: PropTypes.func,
  }

  constructor (props) {
    super(props);

    // show/hide based on the state selector?
    // in case we need to hide the form after save
    this.state = {
      showMemberForm: false,
    };
  }

  onSubmitForm = (data) => {
    this.props.onSubmitForm(data);

    setTimeout(() => {
      this.hideMemberForm();
    }, 500);
  }

  showMemberForm = () => {
    this.setState({ showMemberForm: true });
  }

  hideMemberForm = () => {
    this.setState({ showMemberForm: false });
  }

  addNewMember = () => {
    this.showMemberForm();
    this.props.setEditingMember();
    this.props.resetForm();
  }

  editMember = (id) => {
    this.showMemberForm();
    this.props.setEditingMember(id);
  }

  deleteMember = (member) => {
    this.hideMemberForm();
    this.props.deleteMember(member);
  }

  render () {
    const { accountStatus, monthlyDue, dueDate, members, owner } = this.props;

    return (
      <Well styleName="family-members-container">
        <Row styleName="top-header">
          <Col md={4}>
            <span styleName="label">Account:</span>
            <span styleName={`value ${accountStatus}`}>{accountStatus}</span>
          </Col>
          <Col md={4}>
            <span styleName="label">Your total monthly due:</span>
            <span styleName="value">${monthlyDue}</span>
          </Col>
          <Col md={4}>
            <span styleName="label">Payment due date:</span>
            <span styleName="value">{dueDate}</span>
          </Col>
        </Row>
        <Row styleName="list-header">
          <Col md={3}>Name</Col>
          <Col md={3}>Family Relationshiop</Col>
          <Col md={1}>Fee</Col>
          <Col md={3} className="text-right">Member Since</Col>
        </Row>
        <Row styleName="list-content">
          {owner.payingMember &&
            <FamilyMember details={owner} />
          }

          {members &&
            members.map((member, index) => (
              <FamilyMember
                details={member}
                key={index}
                onEdit={this.editMember.bind(this, member.id)}
                onDelete={this.deleteMember.bind(this, member)}
              />
            ))
          }
        </Row>

        <Row>
          <Col md={12}>
            <button
              className="btn btn-darkest-green btn-round pull-right"
              onClick={this.addNewMember}
            >
              Add new member
            </button>
          </Col>
        </Row>

        <Row style={{ marginTop: '15px' }}>
          {this.state.showMemberForm &&
            <AddFamilyMemberForm
              onSubmit={this.onSubmitForm}
            />
          }
        </Row>
      </Well>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setEditingMember: (id) => dispatch(setEditingMember(id)),
    onSubmitForm: (values) => dispatch(submitMemberForm(values)),
    deleteMember: (id) => dispatch(deleteMember(id)),
    resetForm: () => dispatch(resetForm('familyMember')),
  };
}

export default connect(null, mapDispatchToProps)(FamilyMembers);
