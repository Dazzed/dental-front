import React from 'react';
import { reduxForm } from 'redux-form';
import moment from 'moment';

import Well from 'react-bootstrap/lib/Well';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Image from 'react-bootstrap/lib/Image';
import FontAwesome from 'react-fontawesome';

import FamilyMemberForm from './FamilyMemberForm';

import style from './FamilyMembers.scss';
import validate from './familyMembersValidation';

import {
  hideFamilyMemberForm,
  showFamilyMemberForm,
} from 'redux/modules/signup';


const fields = [
  'familyMembers[]',
  'familyMembers[].avatar',
  'familyMembers[].avatarImage',
  'familyMembers[].firstName',
  'familyMembers[].lastName',
  'familyMembers[].relationship',
  'familyMembers[].birthDate',
  'familyMembers[].phone',
  'familyMembers[].email',
  'familyMembers[].accountType',
];


@reduxForm({
  form: 'signup',
  fields,
  validate,
}, state => ({
  isFormVisible: state.signup.showFamilyMemberForm,
  index: state.signup.index,
}), {
  hideForm: hideFamilyMemberForm,
  showForm: showFamilyMemberForm,
})
export default class FamilyMembers extends React.Component {

  static propTypes = {
    fields: React.PropTypes.object.isRequired,
    isFormVisible: React.PropTypes.bool.isRequired,
    hideForm: React.PropTypes.func.isRequired,
    showForm: React.PropTypes.func.isRequired,
    index: React.PropTypes.number.isRequired,
  }

  constructor(props, context, updater) {
    super(props, context, updater);
  }

  editMember(index) {
    this.props.showForm(index);
  }

  removeMember(index) {
    this.props.fields.familyMembers.removeField(index);
    if (this.props.index === index) {
      this.props.hideForm();
    }
  }

  memberHasError(member) {
    return member.error && Object.keys(member.error).length > 0;
  }

  render() {
    const { fields: { familyMembers }, isFormVisible, index } = this.props;
    const member = familyMembers[index];

    return (
      <Well>
        <h3>List Your Family Members</h3>

        <Row>
          <Col md={12}>
            <Row>
              <Col md={4}>
                Name
              </Col>
              <Col md={3}>
                Family Relationship
              </Col>
              <Col md={1}>
                Age
              </Col>
              <Col md={2}>
                Type
              </Col>
              <Col md={2} className="text-center">
                Edit | Delete
              </Col>
            </Row>
          </Col>
          <Col md={12}>
            <ListGroup>
              {familyMembers.map((_member, _index) => {
                const bsStyle = this.memberHasError(_member) ? 'danger' : null;
                return (
                  <ListGroupItem key={_index} bsStyle={bsStyle}>
                    <Row>
                      <Col md={4} className={style.familyMemberItem}>
                        {_member.avatarImage &&
                          <Image
                            className="img-responsive"
                            src={_member.avatarImage.value.dataUri}
                            circle
                          />
                          }
                          {_member.firstName.value} {_member.lastName.value}
                        </Col>
                        <Col md={3}>
                          {_member.relationship.value}
                        </Col>
                        <Col md={1}>
                          {_member.birthDate.value &&
                            moment().diff(_member.birthDate.value, 'year', false)
                          }
                        </Col>
                        <Col md={2}>
                          {_member.accountType.value}
                        </Col>
                        <Col md={2} className="text-center">
                          <FontAwesome
                            onClick={this.editMember.bind(this, _index)}
                            name="pencil"
                          />
                          {'  '}|{' '}
                          <FontAwesome
                            onClick={this.removeMember.bind(this, _index)}
                            name="times"
                          />
                        </Col>
                      </Row>
                    </ListGroupItem>);
              })}
              </ListGroup>
          </Col>
        </Row>

        {isFormVisible &&
          <FamilyMemberForm member={member} form="signup" />
        }
      </Well>
    );
  }

}
