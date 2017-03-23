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
import GoogleMaps from 'components/GoogleMaps';
import SearchForm from 'containers/SearchForm';


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
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }).isRequired,
    })).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeResultId: null,
    };
  }

  componentWillMount () {
    this.props.getSearch(this.props.location.query.q);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.location.query !== nextProps.location.query) {
      this.props.getSearch(nextProps.location.query.q);
    }
  }

  updateActiveResultId = (id) => {
    this.setState({
      activeResultId: id,
    });
  }

  renderResults() {
    const { searchResults } = this.props;

    if (searchResults.length > 0) {
      return (
        <ul styleName='dentist-list'>
          {
            searchResults.map((dentist) => {
              return (
                <DentistCard
                  {...dentist}
                  key={dentist.id}
                  active={dentist.id === this.state.activeResultId}
                />
              )
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

  renderMap() {
    const { searchResults } = this.props;
    const markerArray = [];

    if (searchResults.length > 0) {
      for (let i = 0; i < searchResults.length; i++) {
        markerArray.push({
          id: searchResults[i].id,
          lat: searchResults[i].dentistInfo.lat,
          lng: searchResults[i].dentistInfo.lng,
        });
      }

      return <GoogleMaps markers={markerArray} updateActiveId={this.updateActiveResultId} />;
    }

    return false;
  }

  render () {
    const borderContent = (
      <span className="text-uppercase">
        {/* TODO: Add in filters */}
      </span>
    );

    return (
      <div styleName="container-wrapper">
        <PageHeader children={<SearchForm header />} borderContent={borderContent} />

        <div className="container">
          <div className="row">
            <div className="col-md-6">
              {this.renderResults()}
            </div>
            <div className="col-md-6">
              {this.renderMap()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
