import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';

export default class FamilyMember extends Component {
  static propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    relationship: PropTypes.string,
    createdAt: PropTypes.string,
    accountOwner: PropTypes.string,
    type: PropTypes.string,
    fee: PropTypes.string,
    avatar: PropTypes.string,
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
      avatar,
    } = this.props;

    return (
      <div className="family-member">
        <div className="row details">
          <div className="col-md-1 avatar">
            <img src={avatar} />
          </div>
          <div className="col-md-3 col-with-name">
            <p className="member-name">{`${firstName} ${lastName}`}</p>
            {accountOwner === 'true' &&
              <p className="account-owner">(Account Owner)</p>
            }
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
          <div className="col-md-2 text-right">
            {createdAt}
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 pull-right text-right">
            <Button bsStyle="primary" className="btn-cancel" onClick="">Cancel</Button>
          </div>
        </div>
      </div>
    );
  }
}
