import React from 'react';
import CSSModules from 'react-css-modules';
import moment from 'moment';

import styles from '../../styles.css';

const renderAccountManager = dentistInfo => {
  const { manager } = dentistInfo;
  if (manager) {
    return (
      <p>
        Account Manager:
        {' '}
        <span className={styles['dentist-details__value']}>
          {manager.firstName} {manager.lastName}&nbsp;
          <span style={{ fontStyle: 'italic' }}>({manager.email})</span>
        </span>
      </p>
    );
  }
  return (
    <p>
      Account Manager:
      {' '}
      <span className={styles['dentist-details__value']}>
        NOT ASSIGNED
      </span>
    </p>
  );
};

const renderLinkedOffices = links => {
  if (links.length) {
    const linkedOffices = links.map(l => (
      <div
        key={l.id}
        className={`${styles['dentist-details__value']} ${styles['margin-left-5']}`}
      >
        {l.officeName}
      </div>
    ));
    return (
      <p>
        Linked Offices:
        {' '}
        {linkedOffices}
      </p>
    );
  } else {
    return (
      <p>
        Linked Offices:
        {' '}
        NOT LINKED
      </p>
    );
  }
};

const renderPlans = plans => {
  const adultPlans = plans
    .filter(p => p.subscription_age_group === 'adult')
    .filter(p => p.active)
    .map(p => (
      <div
        key={p.id}
        className={
          `${styles['dentist-details__value']} ${styles['margin-left-5']}`
        }
      >
        {p.name} , ${p.price} {p.type === 'custom' ? '(Custom Plan)' : ''}
      </div>
    ));

  const childPlans = plans
  .filter(p => p.subscription_age_group === 'child')
  .filter(p => p.active)
  .map(p => (
    <div
      key={p.id}
      className={
        `${styles['dentist-details__value']} ${styles['margin-left-5']}`
      }
    >
      {p.name} , ${p.price}
    </div>
  ));
  return (
    <p>
      Adult Plans:
      {' '}
      {adultPlans}
      <br />
      Child Plans:
      {' '}
      {childPlans}
    </p>
  );
};

const DentistDetails = ({ selectedDentist, onEditDentist }) => {
  const {
    createdAt,
    email,
    memberships,
    dentistInfo,
    links,
    firstName,
    lastName,
  } = selectedDentist;

  const {
    address,
    city,
    state,
    zipCode,

    activeMemberCount,
    marketplaceOptIn,

    priceCodes,
    affordabilityScore,
  } = dentistInfo;

  const activeSince = moment(createdAt).format("MMMM Do, YYYY");

  const phone = selectedDentist.phoneNumbers.length ? selectedDentist.phoneNumbers[0].number : 'Phone: N/A';

  const activeMembership = memberships.find(m => m.active);
  let discount = 'N/A';
  if (memberships.find(m => m.active) !== undefined) {
    discount = activeMembership.discount;
  }

  return (
    <div className={'row ' + styles['dentist-details']}>
      <div className="col-md-6">
        <p>
          <span className={styles['dentist-details__value']}>
            {address}
            <br />
            {city}, {state} {zipCode}
          </span>
        </p>

        <p>
          Contact:
          <br />
          <span className={styles['dentist-details__value']}>
            {firstName} {lastName}
            <br />
            {email}
            <br />
            {phone}
          </span>
        </p>

        <p>
          Total Active Members:
          {' '}
          <span className={styles['dentist-details__value']}>
            {activeMemberCount}
          </span>
        </p>

        <p>
          Active Since:
          {' '}
          <span className={styles['dentist-details__value']}>
            {activeSince}
          </span>
        </p>

        
        {renderAccountManager(dentistInfo)}

        <p>
          Marketplace:
          {' '}
          <span className={styles['dentist-details__value']}>
            {marketplaceOptIn ? 'Active' : 'InActive'}
          </span>
        </p>
        
        <p>
          Affordability Score:
          {' '}
          <span className={styles['dentist-details__value']}>
            {affordabilityScore || 'NOT SET'}
          </span>
        </p>

        <p>
          Treatment Discount Percent:
          {' '}
          <span className={styles['dentist-details__value']}>
            {discount}%
          </span>
        </p>

        {renderPlans(memberships)}
        {renderLinkedOffices(links)}
      </div>

      <div className="col-md-6">
        <p className={styles['dentist-details__section-title']}>
          Dental Code Fees:
        </p>

        {priceCodes.map(({ code, price }) => {
          return (
            <div key={code} className={'row ' + styles['dentist-details__price-code']}>
              <div className="col-md-3 text-right">
                {code}:
              </div>

              <div className="col-md-3" className={styles['dentist-details__value']}>
                ${parseFloat(price).toFixed(2)}
              </div>
            </div>
          );
        })}

        <p className="text-right">
          <input
            type="button"
            className={styles['button--short']}
            value="EDIT"
            onClick={() => onEditDentist()}
          />
        </p>
      </div>
    </div>
  );
};

export default CSSModules(styles, { allowMultiple: true })(DentistDetails);
