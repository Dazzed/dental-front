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
import SideNav from 'components/SideNav';
import PageHeader from 'components/PageHeader';

import { selectUserType, selectPageTitle } from 'containers/App/selectors';

import * as actions from './actions';
import styles from './styles.css';


const mapDispatchToProps = {
  loadUserFromToken: actions.meFromToken
};


function mapStateToProps (state) {
  return {
    userType: selectUserType(state),
    pageTitle: selectPageTitle(state),
  };
}


@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
export default class App extends Component {

  static propTypes = {
    children: React.PropTypes.node,
    loadUserFromToken: React.PropTypes.func,
    userType: React.PropTypes.string,
    pageTitle: React.PropTypes.string,
  };

  componentWillMount () {
    // Always load user details from the localStorage Token
    this.props.loadUserFromToken();
  }

  render () {
    const { userType, pageTitle } = this.props;
    const title = pageTitle ?
      <PageHeader title={pageTitle} userType={userType} /> : null;

    return (
      <div styleName="wrapper">
        <NavBar />
        {userType ?
          <div>
            {title}
            <div className="container">
              <div className="col-md-9">
                {React.Children.toArray(this.props.children)}
              </div>
              <div className="col-md-3">
                <SideNav userType={userType} />
              </div>
            </div>
          </div>
          : React.Children.toArray(this.props.children)
        }
        <Footer />
      </div>
    );
  }
}
