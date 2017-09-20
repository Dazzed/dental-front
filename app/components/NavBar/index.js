/*
NavBar Component
================================================================================
NOTE: Add custom left-hand-side elements for routes in the `returnLinks`
      dictionary (a class field).
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import React from 'react';
// import Image from 'react-bootstrap/lib/Image';
import Navbar from 'react-bootstrap/lib/Navbar';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

// app
import dentalhqLogo from 'assets/images/logo.png';
import { selectCurrentUser } from 'containers/App/selectors';

// local
import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    loggedInUser: selectCurrentUser(state),
  };
}


/*
NavBar
================================================================================
*/
@connect(mapStateToProps, null)
@CSSModules(styles, { allowMultiple: true })
export default class NavBar extends React.Component {

  static propTypes = {
    changeRoute: React.PropTypes.func,
    loggedInUser: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool
    ]),
    pathname: React.PropTypes.string,
    logo: React.PropTypes.oneOfType([
      React.PropTypes.string, // show custom logo
      React.PropTypes.bool,   // false => show no logo (i.e. custom logo url is loading)
    ]),                       // null => show dentalHQ logo
  };

  returnLinks = {
    '/accounts/dentist-signup': (<Link to="/" styleName="navbar__text">&lt; Home</Link>),
    '/accounts/login': (<Link to="/" styleName="navbar__text">&lt; Home</Link>),
    '/accounts/logout': (<Link to="/" styleName="navbar__text">&lt; Home</Link>),
    '/accounts/signup': (<Link to="/" styleName="navbar__text">&lt; Home</Link>),
    '/error/404-not-found': (<Link to="/" styleName="navbar__text">&lt; Home</Link>),
    '/faq': (<Link to="/" styleName="navbar__text">&lt; Home</Link>),
    '/learn-more': (<Link to="/" styleName="navbar__text">&lt; Home</Link>),
    '/privacy': (<Link to="/" styleName="navbar__text">&lt; Home</Link>),
    '/subscribe': (<Link to="/" styleName="navbar__text">&lt; Home</Link>),
    '/terms': (<Link to="/" styleName="navbar__text">&lt; Home</Link>),
  }

  render () {
    const { logo, } = this.props;
    const { firstName, lastName, avatar, } = this.props.loggedInUser;

    const fullName = `${firstName} ${lastName}`;
    const returnLink = this.returnLinks.hasOwnProperty(this.props.pathname)
                     ? this.returnLinks[this.props.pathname]
                     : null;

    let logoDisplay = null;
    if (logo === null || logo === undefined) {
      // show dentalHQ logo
      logoDisplay = (
        <Link to="/" styleName="navbar__brand__link">
          <img src={dentalhqLogo} alt="DentalHQ" styleName="navbar__brand__img" />
        </Link>
      );
    }
    else if (logo !== false) {
      // show custom logo
      logoDisplay = (
        <img src={logo} alt="Dentist Logo" styleName="navbar__brand__img" />
      );
    }
    // else - show no logo

    return (
      <Navbar fixedTop styleName="navbar">
        <div className="row" styleName="navbar__row">
          <div className="col-md-4" styleName="navbar__col">
            {returnLink}
          </div>
          
          <div className="col-md-4" styleName="navbar__col">
            <div styleName="navbar__brand">
              {logoDisplay}
            </div>
          </div>
          
        </div>
      </Navbar>
    );
  }
}
