import React, { Component } from 'react';
import CSSModules from "react-css-modules";
import FaCheck from 'react-icons/lib/fa/check';
import Button from 'react-bootstrap/lib/Button';

import styles from "./styles.css";

@CSSModules(styles)
export default class Plans extends Component {

  render() {
    const {
      savings,
    } = this.props;

    let { memberships } = this.props.dentist;
    if (memberships.length === 0) {
      return <h2>This dentist Doesn't have any membership plans.</h2>;
    }

    memberships = memberships.filter(m => m.active);

    const adultMembership = (() => {
      let adultMonthly = memberships.find(m => m.subscription_age_group === 'adult' && m.type === 'month');
      let adultYearly = memberships.find(m => m.subscription_age_group === 'adult' && m.type === 'year');

      return {
        monthly: adultMonthly ? adultMonthly.price.replace('.00', '') : null,
        yearly: adultYearly ? adultYearly.price.replace('.00', '') : null,
        discount: (adultMonthly ? adultMonthly.discount : null)
               || (adultYearly ? adultYearly.discount : null),
      };
    })();

    const childMembership = (() => {
      let childMonthly = memberships.find(m => m.subscription_age_group === 'child' && m.type === 'month');
      let childYearly = memberships.find(m => m.subscription_age_group === 'child' && m.type === 'year');

      return {
        monthly: childMonthly ? childMonthly.price.replace('.00', '') : null,
        yearly: childYearly ? childYearly.price.replace('.00', '') : null,
        discount: (childMonthly ? childMonthly.discount : null)
               || (childYearly ? childYearly.discount : null),
      };
    })();

    let marketingColOffset = '1';
    if ( (adultMembership.monthly === null && adultMembership.yearly === null)
      || (childMembership.monthly === null && childMembership.yearly === null)
    ) {
      marketingColOffset = '4';
    }

    return (
      <div styleName="content">

        <div className="row">
          {/*
          Adult Membership
          ------------------------------------------------------------
          TODO: Pull this & the Child Membership out into their own component?
                It's also on the Patient Membership Info Page.
          */}
          {(savings.yearly.adult !== null || savings.monthly.adult !== null) && (
            <div className={`col-md-offset-${marketingColOffset} col-md-4`}>
              <div styleName="membership">
                <h3 styleName="membership__title">Adult Membership</h3>

                <p styleName="membership__includes-list__label">
                  Includes:
                </p>

                <ul styleName="membership__includes-list">
                  <li><FaCheck /> 1 basic cleaning every 6 months*</li>
                  <li><FaCheck /> 1-2 exams/year</li>
                  <li><FaCheck /> X-rays as determined necessary</li>
                  <li><FaCheck /> 1 emergency exam with X-ray/year</li>
                  <li><FaCheck /> {adultMembership.discount}% off any needed treatment</li>
                </ul>

                {/*
                  {savings.yearly.adult !== null && (
                    <div>
                      <p styleName="membership__cost">
                        ${adultMembership.yearly} / Year
                      </p>

                      <p styleName="membership__savings">
                        Total Annual Savings: ${savings.yearly.adult}**
                      </p>
                    </div>
                  )}
                */}

                {savings.monthly.adult !== null && (
                  <div>
                    <p styleName="membership__cost">
                      ${adultMembership.monthly} / Month
                    </p>

                    <p styleName="membership__savings">
                      Total Annual Savings: ${savings.monthly.adult}**
                    </p>
                  </div>
                )}

                <p styleName="membership__disclaimer">
                  *If periodontal disease is present additional treatment will be necessary prior to your cleaning.
                </p>

                <p styleName="membership__disclaimer">
                  **Total annual savings if ALL services used.
                </p>
              </div>
            </div>
          )}

          {/*
          Child Membership
          ------------------------------------------------------------
          */}
          {(savings.yearly.child !== null || savings.monthly.child !== null) && (
            <div className={`col-md-offset-${marketingColOffset} col-md-4`}>
              <div styleName="membership">
                <h3 styleName="membership__title">
                  Child Membership
                  {' '}<br />
                  <small>(13 and under)</small>
                </h3>

                <p styleName="membership__includes-list__label">
                  Includes:
                </p>

                <ul styleName="membership__includes-list">
                  <li><FaCheck /> 1 basic cleaning every 6 months*</li>
                  <li><FaCheck /> 1-2 exams/year</li>
                  <li><FaCheck /> X-rays as determined necessary</li>
                  <li><FaCheck /> 1 emergency exam with X-ray/year</li>
                  <li><FaCheck /> 1 Fluoride treatment/year</li>
                  <li><FaCheck /> {childMembership.discount}% off any needed treatment</li>
                </ul>

                {/*
                  {savings.yearly.child !== null && (
                    <div>
                      <p styleName="membership__cost">
                        ${childMembership.yearly} / Year
                      </p>

                      <p styleName="membership__savings">
                        Total Annual Savings: ${savings.yearly.child}**
                      </p>
                    </div>
                  )}
                */}

                {savings.monthly.child !== null && (
                  <div>
                    <p styleName="membership__cost">
                      ${childMembership.monthly} / Month
                    </p>

                    <p styleName="membership__savings">
                      Total Annual Savings: ${savings.monthly.child}**
                    </p>
                  </div>
                )}

                <p styleName="membership__disclaimer">
                  *If periodontal disease is present additional treatment will be necessary prior to your cleaning.
                </p>

                <p styleName="membership__disclaimer">
                  **Total annual savings if ALL services used.
                </p>
              </div>
            </div>
          )}
          {/* End Membership Info */}
        </div>

        <div styleName="refund">
          <p styleName="refund__title">
            Fully Refundable
          </p>
          <p styleName="refund__disclaimer">
            **within 90 days if NO services are used**
          </p>
        </div>
        <hr />
        <div className={`row ${styles['membership-page-signup-button-container']}`}>
          <div className="col-sm-4 col-sm-push-4">
            <br />
            <Button
              styleName="signup--button"
              className="btn-lg"
              bsStyle="success"
              onClick={() => this.props.history.push(`/accounts/signup/my-dentist/${this.props.id}?frommarketplace=true`)}>
              SIGN UP
            </Button>
          </div>
        </div>
        <br />
        <div className={`row ${styles['membership-page-disclaimer-container']}`}>
          <p styleName="custom-membership-header">
            Custom & Annual Memberships May Also Be Available!
          </p>
          <p styleName="custom-membership-subheader">
            Check with your dentist for plan details.
          </p>
        </div>
      </div>
    );
  }
}
