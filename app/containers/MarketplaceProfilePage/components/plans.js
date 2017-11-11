import React, { Component } from 'react';
import CSSModules from "react-css-modules";
import FaCheck from 'react-icons/lib/fa/check';
import Button from 'react-bootstrap/lib/Button';

import styles from "./styles.css";

@CSSModules(styles)
export default class Plans extends Component {

  render() {

    let { memberships } = this.props.dentist;
    if (memberships.length === 0) {
      return <h2>This dentist Doesn't have any membership plans.</h2>;
    }
    memberships = memberships.filter(m => m.active);
    const adultMembership = (() => {
      let adultMonthly = memberships.find(m => m.subscription_age_group === 'adult' && m.active && m.type === 'month');
      // let adultAnnual = memberships.find(m => m.name === 'default annual membership');
      if (adultMonthly) {
        let savings = Number(adultMonthly.price) * 4;
        return {
          monthly: adultMonthly.price.replace('.00', ''),
          savings: String(Math.floor(savings))
        };
      } else {
        return {
          monthly: '',
          savings: '',
        };
      }
    })();

    const adultMonthly = memberships.find(m => m.subscription_age_group === 'adult' && m.active && m.type === 'month');
    const adultDiscount = adultMonthly.discount;

    const childMembership = (() => {
      let childMonthly = memberships.find(m => m.subscription_age_group === 'child' && m.active && m.type === 'month');
      if (childMonthly) {
        let savings = Number(childMonthly.price) * (36 / 7);
        return {
          monthly: childMonthly.price.replace('.00', ''),
          savings: String(Math.floor(savings))
        };
      } else {
        return {
          monthly: '',
          savings: '',
        };
      }
    })();

    const childMonthly = memberships.find(m => m.subscription_age_group === 'child' && m.active && m.type === 'month');
    const childDiscount = childMonthly.discount;

    return (
      <div styleName="content">
        <div className="row">
          <div className="col-md-offset-1 col-md-5">
            <div styleName="membership">
              <h3 styleName="membership__title">Adult Membership</h3>

              <p styleName="membership__includes-list__label">
                Includes:
                </p>

              <ul styleName="membership__includes-list">
                <li><FaCheck styleName="membership__HQ_color" /> 2 cleanings/year*</li>
                <li><FaCheck styleName="membership__HQ_color" /> 1-2 exams/year</li>
                <li><FaCheck styleName="membership__HQ_color" /> X-rays as determined necessary</li>
                <li><FaCheck styleName="membership__HQ_color" /> 1 emergency exam with X-ray/year</li>
                <li><FaCheck styleName="membership__HQ_color" /> {adultDiscount}% off any needed treatment</li>
              </ul>

              <p styleName="membership__cost">
                ${adultMembership.monthly} A Month
                </p>

              <p styleName="membership__savings">
                Total Annual Savings: ${adultMembership.savings}**
                </p>

              <p styleName="membership__disclaimer">
                *If periodontal disease is present additional treatment will be necessary prior to your cleaning.
                </p>

              <p styleName="membership__disclaimer">
                **Total annual savings if ALL services used.
                </p>
            </div>
          </div>

          {/*
            Child Membership
            ------------------------------------------------------------
          */}
          <div className="col-md-5">
            <div styleName="membership">
              <h3 styleName="membership__title">
                Child Membership
                  {' '}
                <small>(13 and under)</small>
              </h3>

              <p styleName="membership__includes-list__label">
                Includes:
                </p>

              <ul styleName="membership__includes-list">
                <li><FaCheck styleName="membership__HQ_color" /> 2 cleanings/year*</li>
                <li><FaCheck styleName="membership__HQ_color" /> 1-2 exams/year</li>
                <li><FaCheck styleName="membership__HQ_color" /> X-rays as determined necessary</li>
                <li><FaCheck styleName="membership__HQ_color" /> 1 emergency exam with X-ray/year</li>
                <li><FaCheck styleName="membership__HQ_color" /> 1 Fluoride treatment/year</li>
                <li><FaCheck styleName="membership__HQ_color" /> {childDiscount}% off any needed treatment</li>
              </ul>

              <p styleName="membership__cost">
                ${childMembership.monthly} A Month
                </p>

              <p styleName="membership__savings">
                Total Annual Savings: ${childMembership.savings}**
                </p>

              <p styleName="membership__disclaimer">
                *If periodontal disease is present additional treatment will be necessary prior to your cleaning.
                </p>

              <p styleName="membership__disclaimer">
                **Total annual savings if ALL services used.
                </p>
            </div>
          </div>
        </div>
        <div styleName="refund">
          <p styleName="refund__title">
            Fully Refundable
          </p>
          <p styleName="refund__disclaimer">
            **within 30 days if NO services are used**
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
