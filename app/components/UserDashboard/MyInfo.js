import React, { PropTypes, Component } from 'react';
import moment from 'moment';
import CSSModules from 'react-css-modules';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import Image from 'react-bootstrap/lib/Image';
import FaCalendar from 'react-icons/lib/fa/calendar';
import FaEnvelope from 'react-icons/lib/fa/envelope';
import FaPhone from 'react-icons/lib/fa/phone';

import { US_STATES, PREFERRED_CONTACT_METHODS } from 'common/constants';
import styles from './MyInfo.css';

const defaultAvatar = 'http://www.teenink.com/images/default_face.gif';

class MyInfo extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  render () {
    const { user } = this.props;

    if (!user) {
      return null;
    }

    const {
      firstName,
      lastName,
      avatar,
      city,
      state,
      email,
      phone,
      birthDate,
      contactMethod,
    } = user;

    return (
      <Well>
        <Row styleName="my-info-container">
          <Col md={2}>
            <div styleName="avatar">
              <Image src={avatar || defaultAvatar} />
            </div>
          </Col>

          <Col md={10}>
            <Row styleName="row">
              <Col md={6}>
                <div>Primary Account Holder</div>
                <div styleName="name">{firstName} {lastName}</div>
                {city && state &&
                  <div styleName="address">
                    {city}, {US_STATES[state]}
                  </div>
                }
              </Col>
            </Row>

            <Row styleName="row url-email-phone">
              {email &&
                <div styleName="pair">
                  <FaEnvelope size={16} />
                  <a
                    styleName="text"
                    href={`mailto:${email}`}
                    rel="noopener noreferrer"
                  >
                    {email}
                  </a>
                </div>
              }
              {phone &&
                <div styleName="pair">
                  <FaPhone size={16} />
                  <a
                    styleName="text"
                    href={`tel:${phone}`}
                    rel="noopener noreferrer"
                  >
                    {phone}
                  </a>
                </div>
              }
              {birthDate &&
                <div styleName="pair">
                  <FaCalendar size={16} />
                  {moment(birthDate).format('MMM D, YYYY')}
                </div>
              }
            </Row>

            <Row styleName="row">
              <Col md={12}>
                <span>Preferred Contact Method: {' '}</span>
                <span styleName="address">
                {contactMethod &&
                  PREFERRED_CONTACT_METHODS[contactMethod]
                }
                {!contactMethod && 'Not specified'}
                </span>
              </Col>
            </Row>

          </Col>
        </Row>
      </Well>
    );
  }
}

export default CSSModules(styles, { allowMultiple: true })(MyInfo);
