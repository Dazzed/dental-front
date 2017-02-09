/*
Learn More Page
================================================================================
Route: '/learn-more'
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import React from 'react';
import CSSModules from 'react-css-modules';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

// app
import PageHeader from 'components/PageHeader';

// local
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapDispatchToProps (dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
  };
}


/*
Learn More
================================================================================
*/
@connect(null, mapDispatchToProps)
@CSSModules(styles)
export default class LearnMorePage extends React.Component {
  goToDentistSignup = () => {
    this.props.changeRoute('/accounts/dentist-signup');
  }

  render() {
    return (
      <div styleName="container-wrapper">
        <PageHeader title="Start Attracting New Patients Today!" />

        {/*
        First Block
        ------------------------------------------------------------
        */}
        <div styleName="first-block">
          <div styleName="first-block__content">
            <p styleName="large-text">
              DentalHQ.com was founded by a dentist to
              <br />
              connect the over 100 million Americans without
              <br />
              dental insurance to practices offering
              <br />
              affordable monthly memberships.
            </p>

            <input type="button" styleName="large-button__inverse" value="CONTACT US &gt;" />
          </div>
        </div>

        {/*
        Second Block
        ------------------------------------------------------------
        */}
        <div styleName="second-block">
          <h2 styleName="large-title">
            Why DentalHQ.com?
          </h2>

          <p styleName="large-text">
            Cut out the middleman and attract new fee-for-service
            <br />
            patients without the hassle of dental insurance.
          </p>
        </div>

        {/*
        Third Block
        ------------------------------------------------------------
        */}
        <div styleName="third-block">
          <div styleName="third-block__content">
            <p styleName="large-text">
              We've made signing up your practice
              <br />
              and getting started easy.  Just give us a call
              <br />
              and we'll walk you through the process!
            </p>

            <input
              type="button"
              styleName="large-button__inverse"
              value="GET STARTED &gt;"
              onClick={this.goToDentistSignup}
            />
          </div>
        </div>

      </div>
    );
  }
}
