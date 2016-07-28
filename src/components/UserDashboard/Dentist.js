import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import StarRating from 'react-star-rating';

export default class Dentist extends Component {
  static propTypes = {
    name: PropTypes.string,
    address: PropTypes.string,
    description: PropTypes.string,
    membershipFee: PropTypes.string,
    childMembershipFee: PropTypes.string,
    url: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    avatar: PropTypes.string,
  }

  render() {
    const {
      name,
      address,
      description,
      membershipFee,
      childMembershipFee,
      url,
      email,
      phone,
      avatar,
    } = this.props;

    return (
      <div className="dentist-container row">

        <div className="col-md-2">
          <div className="avatar">
            <img src={avatar} />
          </div>
          <div className="rating">5/5</div>
          <div>
            <StarRating totalStars={5} rating={5} size={20} />
          </div>
        </div>

        <div className="col-md-10">
          <div className="row">
            <div className="col-md-6">
              <div>Dental Practitioner</div>
              <div className="name">{name}</div>
              <div className="address">{address}</div>
            </div>
            <div className="col-md-6 text-right membership-fee">
              <div>Membership Fee: <span className="fee">{membershipFee}</span></div>
              <div>Kids Membership Fee: <span className="child-fee">{childMembershipFee}</span></div>
            </div>
          </div>

          <div className="row url-email-phone">
            <div className="pair">
              <Glyphicon glyph="link" />
              <a className="text" href={url} target="_blank">{url}</a>
            </div>
            <div className="pair">
              <Glyphicon glyph="envelope" />
              <span className="text">{email}</span>
            </div>
            <div className="pair">
              <Glyphicon glyph="earphone" />
              <span className="text">{phone}</span>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              {description}
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 affordability">
              Affordability: 5/5
            </div>
            <div className="col-md-4">
              <Button bsStyle="primary" block className="with-shadow">Write Message</Button>
            </div>
            <div className="col-md-4">
              <Button bsStyle="primary" block className="with-shadow">Write Review</Button>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
