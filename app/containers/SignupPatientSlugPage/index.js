import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';

import { Jumbotron, ListGroup, ListGroupItem } from 'react-bootstrap';

import styles from './styles.css';
import './custom.css';

import NavBar from 'components/NavBar';
import PageHeader from 'components/PageHeader';
import LoadingSpinner from 'components/LoadingSpinner';

import { FETCH_OFFICES } from './constants';

const mapStateToProps = state => {
  console.log(state)
  const { items, loadingOffices, errorLoadingOffices } = state.signupOfficeSlugPage.offices;
  return {
    items,
    loadingOffices,
    errorLoadingOffices
  };
};

@connect(mapStateToProps, null)
@CSSModules(styles, { allowMultiple: true })
export default class SignupPatientSlugPage extends Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    items: React.PropTypes.array.isRequired,
    loadingOffices: React.PropTypes.bool.isRequired,
    errorLoadingOffices: React.PropTypes.bool.isRequired,
  }

  componentWillMount () {
    const { officeSlug } = this.props.routeParams;
    this.props.dispatch({ type: FETCH_OFFICES, officeSlug });
  }
  
  renderOffices = offices => {
    return offices.map((office, i) => {
      return (
        <ListGroupItem
          header={`${i + 1}.) ${office.officeName}`}
          key={office.userId} href={`/accounts/signup/my-dentist/${office.userId}`}
        >
          <p>{office.address}</p>
          <p>{office.city}, {office.state}, {office.zipCode}</p>
          <strong>Phone:</strong> {office.phone}
        </ListGroupItem>
      );
    });
  }

  render () {
    const {
      loadingOffices,
      errorLoadingOffices,
      items
    } = this.props;

    if (loadingOffices) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-offset-2 col-md-8 col-sm-12">

              <div styleName="stage">
                <LoadingSpinner showOnlyIcon={false} />
              </div>

            </div>
          </div>
        </div>
      );
    }

    if (errorLoadingOffices) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-offset-2 col-md-8 col-sm-12">
              <Jumbotron>
                <h3>There was an Error fetching offices. Please try again later.</h3>
              </Jumbotron>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div styleName="container">
        <div className="row">
          <div className="col-md-offset-2 col-md-8 col-sm-12">
            <h3>Select an Office to get started:</h3>
            <ListGroup>
              {this.renderOffices(items)}
            </ListGroup>
          </div>
        </div>
      </div>
    );
  }
}
