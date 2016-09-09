import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import Button from 'react-bootstrap/lib/Button';
import Image from 'react-bootstrap/lib/Image';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import styles from './MyDentist.css';

function MyDentist ({ dentist }) {
  if (!dentist) {
    return null;
  }

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
  } = dentist;

  return (
    <Well>
      <Row styleName="my-dentist-container">
        <Col md={2}>
          <div styleName="avatar">
            <Image src={avatar} />
          </div>
          <div styleName="rating">5/5</div>
        </Col>

        <Col md={10}>
          <Row styleName="row">
            <Col md={6}>
              <div>Dental Practitioner</div>
              <div styleName="name">{name}</div>
              <div styleName="address">{address}</div>
            </Col>
            <Col md={6} styleName="membership-fee">
              <div>Membership Fee: <span styleName="fee">{membershipFee}</span></div>
              <div>Kids Membership Fee: <span styleName="child-fee">{childMembershipFee}</span></div>
            </Col>
          </Row>

          <Row styleName="row url-email-phone">
            <div styleName="pair">
              {/* <Glyphicon glyph="star" styleName="glyphicon" /> */}
              <Glyphicon glyph="envelope" styleName="glyphicon" />
              <a styleName="text" href={url} target="_blank">{url}</a>
            </div>
            <div styleName="pair">
              <Glyphicon glyph="envelope" styleName="glyphicon" />
              <span styleName="text">{email}</span>
            </div>
            <div styleName="pair">
              {/* <Glyphicon glyph="earphone" styleName="glyphicon" /> */}
              <Glyphicon glyph="envelope" styleName="glyphicon" />
              <span styleName="text">{phone}</span>
            </div>
          </Row>

          <Row styleName="row">
            <Col md={12}>
              {description}
            </Col>
          </Row>

          <Row styleName="row">
            <Col md={4} styleName="affordability">
              Affordability: 5/5
            </Col>
            <Col md={4}>
              <Button bsStyle="primary" block styleName="btn" className={classNames('btn-cyan', 'btn-shadow')}>Write Message</Button>
            </Col>
            <Col md={4}>
              <Button bsStyle="primary" block styleName="btn" className={classNames('btn-cyan', 'btn-shadow')}>Write Review</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Well>
  );
}

MyDentist.propTypes = {
  dentist: PropTypes.object,
};

export default CSSModules(styles, { allowMultiple: true })(MyDentist);
