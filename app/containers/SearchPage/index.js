import React, { Component, PropTypes } from "react";
import Col from "react-bootstrap/lib/Col";
import Image from "react-bootstrap/lib/Image";
import Modal from "react-bootstrap/lib/Modal";
import Row from "react-bootstrap/lib/Row";
import CSSModules from "react-css-modules";
import { connect } from "react-redux";
import { Link } from "react-router";
import { push } from "react-router-redux";

import logo from "assets/images/wells-family-dentistry-logo.png";
import PageHeader from "components/PageHeader";
import DentistCard from "components/DentistCard";
import GoogleMaps from "components/GoogleMaps";
import SearchForm from "containers/SearchForm";
import Filters from "./components/filters";

import { searchRequest } from "./actions";

import {
  searchResultsSelector,
  specialtiesListSelector,
  searchLoadingStatusSelector,
  dentistCountSelector,
  errorsSelector,
  activeFiltersSelector
} from "./selectors";
import LoadingSpinner from 'components/LoadingSpinner';
import styles from "./styles.css";

function mapStateToProps (state) {
  return {
    searchResults: searchResultsSelector(state),
    specialtiesList: specialtiesListSelector(state),
    loadingResults: searchLoadingStatusSelector(state),
    totalDentistCount: dentistCountSelector(state),
    errors: errorsSelector(state),
    activeFilters: activeFiltersSelector(state)
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // app
    changeRoute: url => dispatch(push(url)),

    // search
    searchRequest: (filters, specialtiesRequired) =>
      dispatch(searchRequest(filters, specialtiesRequired))
  };
}

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
export default class SearchPage extends Component {
  static propTypes = {
    searchRequest: React.PropTypes.func.isRequired,
    searchResults: React.PropTypes.array.isRequired,
    specialtiesList: React.PropTypes.array.isRequired,
    totalDentistCount: React.PropTypes.number.isRequired,
    loadingResults: React.PropTypes.bool.isRequired
  };

  initialState = {
    searchQuery: '',
    specialties: [],
    distance: null,
    sort: 'price',
    coordinates: {
      lat: 34.1,
      lng: -118.5
    }
  };

  constructor (props) {
    super(props);

    this.state = this.initialState;
  }

  componentWillMount () {
    this.fireSearch(true);
  }

  onSearch = query => {
    this.setState({
      searchQuery: query
    });
  }

  searchRequested = () => {
    this.setState({
      ...this.initialState,
      searchQuery: this.state.searchQuery
    }, () => {
      this.filterComponent.resetFilters();
      this.fireSearch();
    });
  }

  onSelectDistance = distance => {
    this.setState({
      distance
    }, this.fireSearch);
  }

  onSelectSpecialty = specialty => {
    if (specialty) {
      this.setState({
        specialties: [ specialty ]
      }, this.fireSearch);
    } else {
      this.setState({
        specialties: []
      }, this.fireSearch);
    }
  }

  onSelectSortType = sortType => {
    if (sortType === 'score') {
      return false;
    }
    this.setState({
      sort: sortType
    }, this.fireSearch);
  }

  fireSearch = (specialtiesRequired = false) => {
    const { searchQuery, specialties, distance, sort, coordinates } = this.state;
    this.props.searchRequest(
      {
        searchQuery,
        specialties,
        distance,
        sort,
        coordinates
      },
      specialtiesRequired
    );
  }

  updateActiveResultId = id => {
    this.setState({
      activeResultId: id
    });
  };

  handleClick = officeId => {
    this.props.changeRoute(`/marketplace/profile/${officeId}`);
  };

  renderResultsCount () {
    const { searchResults, totalDentistCount } = this.props;
    if (searchResults.length > 0) {
      return (
        <div className="col-md-12 col-sm-12 text-center">
          <h3>
            Now viewing {searchResults.length} of {totalDentistCount} dentists
          </h3>
        </div>
      );
    }
    return '';
  }

  renderDentists () {
    const { searchResults } = this.props;

    if (searchResults.length > 0) {
      return (
        <ul styleName="dentist-list">
          {searchResults.map(dentist => {
            return (
              <DentistCard
                {...dentist}
                key={dentist.id}
                active={dentist.id === this.state.activeResultId}
                updateActiveId={this.updateActiveResultId}
                handleClick={this.handleClick}
              />
            );
          })}
        </ul>
      );
    }

    return (
      // TODO: Need no results design!
      <div>No Dentists found mathching the search criteria.</div>
    );
  }

  renderMap () {
    const { searchResults } = this.props;
    const markerArray = [];

    if (searchResults.length > 0) {
      for (let i = 0; i < searchResults.length; i++) {
        if (searchResults[i].location) {
          if (searchResults[i].location.coordinates.length) {
            markerArray.push({
              id: searchResults[i].id,
              active: searchResults[i].id === this.state.activeResultId,
              lat: searchResults[i].location.coordinates[0],
              lng: searchResults[i].location.coordinates[1]
            });
          }
        }
      }

      return (
        <GoogleMaps
          markers={markerArray}
          updateActiveId={this.updateActiveResultId}
        />
      );
    }

    return false;
  }

  renderResults = () => {
    const { loadingResults, errors } = this.props;
    if (errors) {
      return (
        <div className="container">
          <div className="row">
            <h3>{errors}</h3>
          </div>
        </div>
      );
    }
    if (loadingResults) {
      return (
        <div className="container">
          <div className="row">
            <LoadingSpinner />
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="row">
            {this.renderResultsCount()}
            <div className="col-md-6">{this.renderDentists()}</div>
            <div className="col-md-6">{this.renderMap()}</div>
          </div>
        </div>
      );
    }
  }

  render () {
    const {
      specialtiesList,
      loadingResults
    } = this.props;

    
    const borderContent = (
      <span className="text-uppercase">
        <Filters
          specialtiesList={specialtiesList}
          onSelectDistance={this.onSelectDistance}
          onSelectSpecialty={this.onSelectSpecialty}
          onSelectSortType={this.onSelectSortType}
          ref={filterComponent => { this.filterComponent = filterComponent; }}
        />
      </span>
    );

    const searchForm = (
      <SearchForm
        header
        query={this.props.location.query.q}
        onSearch={this.onSearch}
        onSubmit={this.searchRequested}
        shouldDisable={loadingResults}
      />
    );

    return (
      <div styleName="container-wrapper">
        <PageHeader
          children={searchForm}
          borderContent={borderContent}
        />
        <div styleName="floating-menu">
          <ul styleName="login-links">
            <li styleName="login-links__link--secondary">
              <Link to="/accounts/login">Login</Link>
            </li>
          </ul>
        </div>
        {this.renderResults()}
      </div>
    );
  }
}
