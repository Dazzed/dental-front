import React, { PropTypes } from 'react';

import FamilyMember from './FamilyMember';

const FamilyMembers = (props) => {
  return (
    <div className="family-members-container">
      <div className="row top-header">
        <div className="col-md-4">
          <span className="label">Account:</span>
          <span className="value status">{props.accountStatus}</span>
        </div>
        <div className="col-md-4">
          <span className="label">Your total monthly due:</span>
          <span className="value">${props.monthlyDue}</span>
        </div>
        <div className="col-md-4">
          <span className="label">Payment due date:</span>
          <span className="value">{props.dueDate}</span>
        </div>
      </div>
      <div className="row list-header">
        <div className="col-md-3">Name</div>
        <div className="col-md-3">Family Relationshiop</div>
        <div className="col-md-2">Type</div>
        <div className="col-md-1">Fee</div>
        <div className="col-md-3 text-right">Member Since</div>
      </div>
      <div className="list-content">
        {
          props.members.map((member, index) => (
            <FamilyMember {...member} key={index} />
          ))
        }
      </div>
    </div>
  );
};

FamilyMembers.propTypes = {
  accountStatus: PropTypes.string,
  monthlyDue: PropTypes.string,
  dueDate: PropTypes.string,
  members: PropTypes.array,
};

export default FamilyMembers;
