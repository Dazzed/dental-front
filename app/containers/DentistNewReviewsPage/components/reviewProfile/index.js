import React from 'react';
import moment from 'moment';
import CSSModules from 'react-css-modules';

import Avatar from 'components/Avatar';
import ReviewScore from 'components/ReviewScore';
import {
  MEMBER_ORIGINS,
  PREFERRED_CONTACT_METHODS,
  PREFERRED_CONTACT_METHODS_DENTIST_POV,
} from 'common/constants';

import styles from './styles.css';

const renderReview = review => {
  return (
    <div>
      <hr />
      <div className="row">
        <div className="col-sm-4 col-sm-push-2">
          <ReviewScore score={review[0].rating} />
        </div>
        <div className="col-sm-6 text-right">
          Review Date: <span styleName="member-overview__info">{moment(review[0].updatedAt).format('MMM D, YYYY')}</span>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-sm-10 col-sm-push-2" styleName="line-height">
          "{review[0].message}"
        </div>
      </div>
    </div>
  );
};

const ReviewProfile = ({ profile: patient }) => {
  const {
    avatar,
    contactMethod,
    createdAt,
    email,
    firstName,
    id,
    lastName,
    members,
    origin,
    phone,
    type,
  } = patient;

  const memberOrigin = MEMBER_ORIGINS[origin];
  const contactMethodMessage = type === 'client'
    ? PREFERRED_CONTACT_METHODS[contactMethod]
    : PREFERRED_CONTACT_METHODS_DENTIST_POV[contactMethod];

  const memberSince = moment(createdAt).format('MMMM D, YYYY');

  // find active members w/o a cancellation pending
  const activeMembers = members.filter((member) => {
    return member.subscription !== undefined && member.subscription.status === 'active';
  });
  if (patient.subscription !== undefined && patient.subscription.status === 'active') {
    activeMembers.push(patient);
  }

  // find active members w/ a cancellation pending
  const cancellingMembers = members.filter((member) => {
    return member.subscription !== undefined && member.subscription.status === 'cancellation_requested';
  });
  if (patient.subscription !== undefined && patient.subscription.status === 'cancellation_requested') {
    cancellingMembers.push(patient);
  }

  // calculate the total number of active subscriptions
  // (including currently active members w/ a cancellation pending)
  const activeMembersCount = activeMembers.length + cancellingMembers.length;

  const summaryStatus = activeMembersCount > 0 ? 'active' : 'inactive';

  let statusStyle = "status";
  switch (summaryStatus) {
    case 'active':
      statusStyle += ' status--active';
      break;

    case 'late':
      statusStyle += ' status--past-due';
      break;

    case 'inactive':
      statusStyle += ' status--inactive';
      break;

    default:
      // Status is unknown, so don't add anything;
      break;
  }
  return (
    <div key={id} styleName="patient-list__entry">
      <div className="row">
        <div className="col-sm-2">
          <div styleName="member-avatar">
            <Avatar url={avatar} size={'100%'} />
            <p styleName="member-category">{memberOrigin}</p>
          </div>
        </div>

        <div className="col-sm-10">
          <div styleName="member-overview">

            <div className="row">
              <div className="col-sm-7">
                <h3 styleName="member-overview__name">{firstName} {lastName}</h3>
                {' '}
                <span styleName={"member-overview__status " + statusStyle}>
                  ({summaryStatus})
                </span>
              </div>
              <div className="col-sm-5 text-right">
                Member Since:
                {' '}
                <span styleName="member-overview__info">{memberSince}</span>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-7">
                Preferred Contact Method:
                {' '}
                <span styleName="member-overview__info">{contactMethodMessage}</span>
              </div>
              <div className="col-sm-5 text-right">
                Active Members:
                {' '}
                <span styleName="member-overview__info">{activeMembersCount}</span>
              </div>
            </div>

            <div styleName="divided-row">
              <div className="row">
                <div className="col-sm-9">
                  <span styleName="member-overview__info">{phone}</span>
                  <a href={`mailto:${email}`} styleName="member-overview__email">{email}</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {renderReview(patient.clientReviews)}
    </div>
  );
};

export default CSSModules(styles, { allowMultiple: true })(ReviewProfile);
