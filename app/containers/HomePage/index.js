/*
Home Page
================================================================================
Route: `/`

This is the first thing users see of our App, at the '/' route.

NOTE: while this component should technically be a stateless functional
component (SFC), hot reloading does not currently support SFCs. If hot
reloading is not a neccessity for you then you can refactor it and remove
the linting exception.
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import React from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

// app
import logo from 'assets/images/logo.png';
import calendarIcon from 'assets/images/calendar-icon.png';
import checkboardIcon from 'assets/images/checkboard-icon.png';
import toothIcon from 'assets/images/tooth-icon.png';
import Footer from 'components/Footer';

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
Home
================================================================================
*/
@connect(null, mapDispatchToProps)
@CSSModules(styles)
export default class HomePage extends React.Component {

  static propTypes = {
    changeRoute: React.PropTypes.func,
  };

  goToLogin = () => {
    this.props.changeRoute('/accounts/login');
  }

  performDentistSearch = (e) => {
    // TODO: grab the input text from the event and pass it on to the search page
    e.preventDefault(); // default = form submission
    this.props.changeRoute('/search');
  }

  goToFaq = () => {
    this.props.changeRoute('/faq');
  }

  render () {
    return (
      <div styleName="wrapper">

        {/*
        RHS Floating Menu
        ------------------------------------------------------------
        */}
        <div styleName="floating-menu">
          <ul styleName="login-links">
            <li styleName="login-links__link--secondary">
              <Link to="/accounts/login">Login</Link>
            </li>

            <li styleName="login-links__link--primary">
              <Link to="/accounts/login">Dentist Portal</Link>
            </li>
          </ul>
        </div>


        {/*
        First Block
        ------------------------------------------------------------
        */}
        <div styleName="first-block">
          <header>
            <h1>
              <img src={logo} alt="Dental HQ" />
            </h1>
            <h2>Quality, Affordable Membership Plans</h2>
          </header>

          <form noValidate onSubmit={this.performDentistSearch}>
            <input type="text" styleName="search" placeholder="Enter your location, zip code, dentist name, etc." required />
            <br />
            <input type="submit" styleName="button" value="GET STARTED" />
          </form>

          <div styleName="next-section-cover">
            <h3>
              Find affordable monthly service plans for the best dentists in your area!
            </h3>
            <p>
              How DentalHQ Works
              <br />
              \/
            </p>
          </div>
        </div>

        {/*
        Second Block
        ------------------------------------------------------------
        -->
        */}
        <div styleName="second-block">
          <div className="container">

            <div className="row">
              <div className="col-md-10 col-md-offset-1">
                {/* TODO: Need video link, or content to display on the site. */}
                <input type="button" styleName="large-button" value="WATCH VIDEO &gt;" />

                <h2 styleName="large-title">
                  No insurance? No problem.
                </h2>

                <p styleName="large-text">
                  Why deal with an expensive, restrictive private insurnace plan when you can find the best dental practices near you offering affordable monthly membership plans?
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div styleName="process">
                  <img src={toothIcon} alt="Tooth Icon" />
                  <h3 styleName="large-title">
                    Browse
                  </h3>
                  <p styleName="large-text">
                    from our extensive
                    <br />
                    selection of quality
                    <br />
                    dentists near you.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div styleName="process">
                  <img src={checkboardIcon} alt="Checkboard Icon" />
                  <h3 styleName="large-title">
                    Select
                  </h3>
                  <p styleName="large-text">
                    the dentist with the
                    <br />
                    membership plan that
                    <br />
                    meets your needs.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div styleName="process">
                  <img src={calendarIcon} alt="Calendar Icon" />
                  <h3 styleName="large-title">
                    Call
                  </h3>
                  <p styleName="large-text">
                    the dentist directly
                    <br />
                    to schedule an
                    <br />
                    appointment.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/*
        Third Block
        ------------------------------------------------------------
        */}
        <div styleName="third-block">
          <div styleName="third-block__overlay">
            <div className="container">

              <h2 styleName="large-title">
                Membership plans starting as low as $20 a month!
              </h2>

            </div>
          </div>
        </div>

        {/*
        Fourth Block
        ------------------------------------------------------------
        */}
        <div styleName="fourth-block">
          <div styleName="fourth-block__overlay">
            <div className="container">

              <div className="row">
                <div className="col-md-8 col-md-offset-2">
                  <h2 styleName="large-title">
                    Add Your Dental Practice
                  </h2>

                  <p styleName="large-text">
                    We're on the lookout for the best dental practices in America. Click
                    below to learn how DentalHQ can help your practice maximize its
                    potential.
                  </p>

                  <input
                    type="button"
                    styleName="large-button__hollow"
                    onClick={this.goToFaq}
                    value="LEARN MORE &gt;"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/*
        Footer
        ------------------------------------------------------------
        */}
        <Footer />

      </div>
    );
  }
}
