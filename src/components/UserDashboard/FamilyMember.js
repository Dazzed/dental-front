import React, { Component, PropTypes } from 'react';

export default class FamilyMember extends Component {
  static propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    relationship: PropTypes.string,
    createdAt: PropTypes.string,
    accountOwner: PropTypes.string,
    type: PropTypes.string,
    fee: PropTypes.string,
  }

  render() {
    const {
      firstName,
      lastName,
      relationship,
      createdAt,
      accountOwner,
      type,
      fee,
    } = this.props;

    return (
      <div className="row">
        <div className="col-md-2">

        </div>
        <div className="col-md-2 member-name">
          {`${firstName} ${lastName}`} {accountOwner === 'true' && '(Account Owner)'}
        </div>
        <div className="col-md-2">
          {relationship}
        </div>
        <div className="col-md-2">
          {type}
        </div>
        <div className="col-md-2">
          {fee}
        </div>
        <div className="col-md-2">
          {createdAt}
        </div>
      </div>
    );
  }
}
