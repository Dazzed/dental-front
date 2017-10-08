import React from 'react'

import ReviewProfile from '../reviewProfile';

const renderReviewProfile = profile => {
  return <ReviewProfile key={profile.id} profile={profile} />;
};

const ReviewProfileList = ({ profiles }) => {
  return (
    <div>
      {profiles.map(p => renderReviewProfile(p))}
    </div>
  );
};

export default (ReviewProfileList);
