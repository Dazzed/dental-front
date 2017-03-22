/*
Search Page
================================================================================
Route: '/search'
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import React, { Component, PropTypes } from 'react';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

// app
import logo from 'assets/images/wells-family-dentistry-logo.png';
import PageHeader from 'components/PageHeader';
import DentistCard from 'components/DentistCard';


// local
import {
  searchRequest,
} from './actions';

import {
  searchResultsSelector,
} from './selectors';

import styles from './styles.css';

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps (state) {
  return {
    // search
    searchResults: searchResultsSelector(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // search
    getSearch: (query) => dispatch(searchRequest(query)),
  };
}


/*
Search
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
export default class SearchPage extends Component {
  static propTypes = {
    searchResults: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      rating: PropTypes.number,
      type: PropTypes.string,
      affordability: PropTypes.number,
      planStartingCost: PropTypes.number,
      dentistInfo: PropTypes.shape({
        officeName: PropTypes.string,
        url: PropTypes.string,
        email: PropTypes.string,
        address: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        zipCode: PropTypes.string.isRequired,
      }).isRequired,
    })).isRequired,
  };

  componentWillMount () {
    this.props.getSearch(this.props.location.query);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.location.query !== nextProps.location.query) {
      this.props.getSearch(nextProps.location.query);
    }
  }

  renderResults() {
    const { searchResults } = this.props;

    if (searchResults.length > 0) {
      return (
        <ul styleName='dentist-list'>
          {
            searchResults.map((dentist) => {
              return <DentistCard key={dentist.id} {...dentist} />;
            })
          }
        </ul>
      );

    }

    return (
      // TODO: Need no results design!
      <div>No Reults!</div>
    );
  }

  render () {
    const borderContent = (
      <span className="text-uppercase">
        Please enter your office details here.  Questions?{' '}
        <Link to="/todo"><strong>Contact us here &gt;</strong></Link>
        {/* TODO: dentist contact link */}
      </span>
    );

    return (
      <div styleName="container-wrapper">
        <PageHeader title="Signup for a Dentist Account" borderContent={borderContent} />

        <div className="container">
          <div className="row">
            <div className="col-md-6">
              {this.renderResults()}
            </div>
            <div className="col-md-6">

            </div>
          </div>
        </div>
      </div>
    );
  }
}
