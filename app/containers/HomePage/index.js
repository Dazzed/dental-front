/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import CSSModules from 'react-css-modules';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Image from 'react-bootstrap/lib/Image';
import { Link } from 'react-router';

import Footer from 'components/Footer';

import styles from './styles.css';

import logo from 'assets/images/logo.png';
import calendarIcon from 'assets/images/calendar-icon.png';
import checkboardIcon from 'assets/images/checkboard-icon.png';
import toothIcon from 'assets/images/tooth-icon.png';
import raleigh from './raleigh.png';
import durham from './durham.png';
import chapelHill from './chapel-hill.png';

import select from './select.png';
import search from './search.png';
import call from './call.png';


function mapDispatchToProps (dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
  };
}


@connect(null, mapDispatchToProps)
@CSSModules(styles)
export default class HomePage extends React.Component {

  static propTypes = {
    changeRoute: React.PropTypes.func,
  };

  goToLogin = () => {
    this.props.changeRoute('/accounts/login');
  }

  goToSignUp = () => {
    this.props.changeRoute('/accounts/dentist-signup');
  }

  goToLearnMore = () => {
    this.props.changeRoute('/learn-more');
  }

  render () {
    return (
      <div styleName="wrapper">

        {/*
        First Block
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        */}
        <div styleName="first-block">
          <header>
            <h1>
              <img src={logo} alt="Dental HQ" />
            </h1>
            <h2>Quality, Affordable Membership Plans</h2>
          </header>

          <form>
            <input type="text" styleName="search" placeholder="Enter your location, zip code, dentist name, etc." />
            <br />
            <input type="submit" styleName="get-started" value="GET STARTED" />
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
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        -->
        */}
        <div styleName="second-block">
          <div className="container">
            <input type="button" styleName="large-button" value="WATCH VIDEO &gt;" />

            <h2 styleName="large-title">
              No insurance? No problem.
            </h2>

            <p styleName="large-text">
              Why deal with an expensive, restrictive private insurnace plan when you can find the best dental practices near you offering affordable monthly membership plans?
            </p>

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
          <h3 styleName="large-title">
            Membership plans starting as low as $20 a month!
          </h3>
        </div>
         

      </div>
    );


      {/*
      <div styleName="wrapper">
        <div className="container">
          <Navbar styleName="navbar">
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">
                  <img src={logo} alt="My Dental Marketplace" />
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
              <Nav pullRight styleName="nav">
                <NavItem>
                  <button
                    className="btn-green btn-round btn-outline"
                    onClick={this.goToLogin}
                  >
                    Log In
                  </button>
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <div className="col-md-5 col-md-offset-5" styleName="first-block">
            <h1>Your dentist awaits.</h1>
            <p>
              Connecting you with all-star dentist in your area
              offering affordable monthly memberships.
            </p>

            <h3>locations</h3>

            <div className="row">
              <div className="col-md-4">
                <Image src={raleigh} circle />
                <span>Raleigh</span>
              </div>
              <div className="col-md-4">
                <Image src={durham} circle />
                <span>Durham</span>
              </div>
              <div className="col-md-4">
                <Image src={chapelHill} circle />
                <span>Chapel Hill</span>
              </div>
            </div>
          </div>

          <div className="col-md-5 col-md-offset-5" styleName="second-block">
            <h1>How it works</h1>
            <p>
              <strong>No insurance, No problem.</strong> Why deal with the
              hassle of restrictive private dental insurance plans when you
              can join an all-star dental practice offering affordable
              monthly membership plans.
              Simply <strong>enter your zipcode</strong> to see highly rated
              dentists in your area offering memberships
              starting <strong>as low as $20/month.</strong>
            </p>

            <h2>
              Affordable, Accessible. Quality Service. Happy mouth,
              happy life.
            </h2>

            <br />

            <div className="row">
              <div className="col-md-4">
                <Image src={search} />
                <p>
                  Browse <small>
                    from our selection of dental offices near you.
                  </small>
                </p>
              </div>
              <div className="col-md-4">
                <Image src={select} />
                <p>
                  Select <small>
                    the quality dentist offering a membership that meets your
                    needs and sign up.
                  </small>
                </p>
              </div>
              <div className="col-md-4">
                <Image src={call} />
                <p>
                  Call <small>
                    your chosen office and set an appointment.
                  </small>
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-5 col-md-offset-5" styleName="third-block">
            <h1>Membership Package Includes:</h1>
            <ul>
              <li>
                Basic Dental Cleaning every 6 months
              </li>
              <li>
                Exams and Xrays as needed with cleanings
              </li>
              <li>
                Flouride treatment for kids once per year
              </li>
              <li>
                1 emergency exam and xrays per year
              </li>
              <li>
                Discount on any needed treatment
              </li>
              <li>
                Affordable memberships plans starting as low
                as $20/month
              </li>
            </ul>
          </div>

          <div className="col-md-5 col-md-offset-5" styleName="four-block">
            <h1>Our All-Star Dentist</h1>
            <p>
              Are you an all-star dentist looking to attrack more quality fee
              for service patients to your practice? Click here to see how
              mydentalmarketplace.com can help your practice reach its
              potential.
            </p>
            &nbsp;&nbsp;
            <button
              className="btn-green btn-round btn-outline"
              onClick={this.goToLearnMore}
            >
              Learn More
            </button>
          </div>

          <div className="row" styleName="footer-block">
            <Footer />
          </div>
        </div>
      </div>
    */}
  }
}
