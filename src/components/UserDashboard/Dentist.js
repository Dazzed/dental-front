import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';

export default class Dentist extends Component {
  static propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    membershipFee: PropTypes.string,
    childMembershipFee: PropTypes.string,
    url: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
  }

  render() {
    const {
      name,
      description,
      membershipFee,
      childMembershipFee,
      url,
      email,
      phone,
      address,
    } = this.props;

    return (
      <div className="dentist-info">
        <div className="row" style={{'marginBottom': '10px'}}>
          <div className="col-md-6">{name}</div>
          <div className="col-md-6 text-right">
            <div>Membership Fee: {membershipFee}</div>
            <div>Kids Membership Fee: {childMembershipFee}</div>
          </div>
        </div>
        <div className="row" style={{'marginBottom': '10px'}}>
          <div className="col-md-12">{address}</div>
        </div>
        <div className="row" style={{'marginBottom': '5px'}}>
          <div className="col-md-4">{url}</div>
          <div className="col-md-4">{email}</div>
          <div className="col-md-4 text-right">{phone}</div>
        </div>
        <div className="row" style={{'marginBottom': '10px'}}>
          <div className="col-md-12">{description}</div>
        </div>
        <div className="row">
          <div className="col-md-4">Affordability: 5/5</div>
          <div className="col-md-4">
            <Button bsStyle="primary" block style={{'backgroundColor': '#00c0ef'}}>Write Message</Button>
          </div>
          <div className="col-md-4">
            <Button bsStyle="primary" block style={{'backgroundColor': '#00c0ef'}}>Write Review</Button>
          </div>
        </div>
      </div>
    );
  }
}
