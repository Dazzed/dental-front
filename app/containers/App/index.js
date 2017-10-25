/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

import NavBar from 'components/NavBar';
import Footer from 'components/Footer';
import PageHeader from 'components/PageHeader';

import { selectCurrentUser, selectPageTitle } from 'containers/App/selectors';
import browserDetector from 'utils/browserDetector';

import * as actions from './actions';
import styles from './styles.css';
import 'react-select/dist/react-select.css';

const staticPages = [
  '/',
  '/accounts/signup/my-dentist/', // dentistId added in the render function
  '/error/404-not-found',
  '/faq',
  '/learn-more',
  '/privacy',
  '/search',
  '/terms',
];

const unThemedPages = [
  '/accounts/login',
  '/error/404-not-found',
  '/faq',
  '/privacy',
  '/terms',
];

const pagesWithSocialLinks = [
  '/',
  '/learn-more',
  '/search',
  // /marketplace/profile/123 handled separately since we need to account for the id at the end
];

const pagesWithDisclaimer = [
  '/search',
  // /marketplace/profile/123 handled separately since we need to account for the id at the end
];

const mapDispatchToProps = {
  loadUserFromToken: actions.meFromToken
};


function mapStateToProps (state) {
  return {
    user: selectCurrentUser(state),
    pageTitle: selectPageTitle(state),
  };
}


@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
export default class App extends Component {

  static propTypes = {
    children: React.PropTypes.node,
    loadUserFromToken: React.PropTypes.func,
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool, // will be `false` until loaded
      React.PropTypes.object,
    ]),
    pageTitle: React.PropTypes.string,
    location: React.PropTypes.object,
  };

  componentWillMount () {
    // Always load user details from the localStorage Token
    this.props.loadUserFromToken();

    if (browserDetector.isOld()) {
      // eslint-disable-next-line
      alert(browserDetector.warning);
    }
  }

  render () {
    const { user, pageTitle, location: { pathname } } = this.props;

    // NOTE: Hardcoded here to avoid the common layout
    if (pathname === '/') {
      return this.props.children;
    }

    const showSocialLinks = pagesWithSocialLinks.includes(pathname)
                         || pathname.substring(0, 21) === '/marketplace/profile/';

    const showDisclaimer = pagesWithDisclaimer.includes(pathname)
                        || pathname.substring(0, 21) === '/marketplace/profile/';

    let content = null;
    const childComponents = React.Children.toArray(this.props.children);
    const title = pageTitle
                ? <PageHeader pathname={pathname} title={pageTitle} user={user} />
                : null;

    if (user && user.id && user.type && user.type === "dentist") {
      staticPages[1] = `/accounts/signup/my-dentist/${user.id}`;
    }

    // the visitor is a logged in user AND is not on a static page
    const onUserPage = user && user.type && staticPages.indexOf(pathname) < 0;
    if (onUserPage) {
      content = (
        <div styleName="container-wrapper">
          {title}
          <div className="container">
            <div className="col-md-12">
              <div styleName="content-wrapper">
                {childComponents}
              </div>
            </div>
          </div>
        </div>
      );
    }
    else {
      content = childComponents;
    }

    let wrapperStyle = "wrapper--no-navbar";
    let navbar = null;
    if (unThemedPages.indexOf(pathname) < 0) {
      wrapperStyle = "wrapper";
      navbar = (<NavBar pathname={pathname} />);
    }

    // TODO: HACK - should handle this more gracefully...
    if ( user.type === "client"
      || pathname.indexOf('/accounts/signup/my-dentist/') === 0 // special case since it has a url param
    ) {
      wrapperStyle = "wrapper";
      navbar = null;
    }

    return (
      <div styleName={wrapperStyle}>
        {navbar}
        {content}
        <Footer showSocialLinks={showSocialLinks} showDisclaimer={showDisclaimer} />
      </div>
    );
  }
}
