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
  searchLoadingStatusSelector
} from "./selectors";
import LoadingSpinner from 'components/LoadingSpinner';
import styles from "./styles.css";

/*
Redux
------------------------------------------------------------
*/
function mapStateToProps(state) {
  return {
    searchResults: searchResultsSelector(state),
    specialtiesList: specialtiesListSelector(state),
    loadingResults: searchLoadingStatusSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // app
    changeRoute: url => dispatch(push(url)),

    // // search
    searchRequest: (filters, specialtiesRequired) =>
      dispatch(searchRequest(filters, specialtiesRequired))
  };
}

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
export default class SearchPage extends Component {
  // static propTypes = {
  //   searchResults: PropTypes.arrayOf(PropTypes.shape({
  //     id: PropTypes.number.isRequired,
  //     firstName: PropTypes.string.isRequired,
  //     lastName: PropTypes.string.isRequired,
  //     avatar: PropTypes.string,
  //     rating: PropTypes.number,
  //     type: PropTypes.string,
  //     affordability: PropTypes.number,
  //     planStartingCost: PropTypes.number,
  //     dentistInfo: PropTypes.shape({
  //       officeName: PropTypes.string,
  //       url: PropTypes.string,
  //       email: PropTypes.string,
  //       address: PropTypes.string.isRequired,
  //       city: PropTypes.string.isRequired,
  //       state: PropTypes.string.isRequired,
  //       zipCode: PropTypes.string.isRequired,
  //       lat: PropTypes.number.isRequired,
  //       lng: PropTypes.number.isRequired,
  //     }).isRequired,
  //   })).isRequired,
  // };

  static propTypes = {
    searchRequest: React.PropTypes.func.isRequired,
    searchResults: React.PropTypes.array.isRequired,
    specialtiesList: React.PropTypes.array.isRequired
  };

  constructor (props) {
    super(props);

    this.state = {
      searchQuery: '',
      specialties: [],
      distance: 25,
      sort: '',
      coordinates: {
        lat: 34.1,
        lng: -118.5
      }
    };
  }

  componentWillMount () {
    this.fireSearch(true);
  }

  componentWillReceiveProps (nextProps) {
    // if (this.props.location.query.q !== nextProps.location.query.q) {
    //   this.props.getSearch(nextProps.location.query.q);
    // }
    // console.log("cwrp",this.props, nextProps);
  }

  onSearch = query => {
    this.setState({
      searchQuery: query
    });
  }

  searchRequested = () => {
    this.fireSearch();
  }

  onSelectDistance = distance => {
    this.setState({
      distance
    }, this.fireSearch);
  }

  onSelectSpecialty = specialty => {
    if (specialty) {
      const { specialties } = this.state;
      specialties.push(specialty);
      this.setState({
        specialties
      }, this.fireSearch);
    } else {
      this.setState({
        specialties: []
      }, this.fireSearch);
    }
  }

  onSelectSortType = sortType => {
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

  renderResults () {
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
        markerArray.push({
          id: searchResults[i].id,
          active: searchResults[i].id === this.state.activeResultId,
          lat: searchResults[i].location.coordinates[0],
          lng: searchResults[i].location.coordinates[1]
        });
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

    if (loadingResults) {
      return (
        <div styleName="container-wrapper">
          <PageHeader
            children={
              searchForm
            }
            borderContent={borderContent}
          />

          <div className="container">
            <div className="row">
              <LoadingSpinner />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div styleName="container-wrapper">
        <PageHeader
          children={
            searchForm
          }
          borderContent={borderContent}
        />

        <div className="container">
          <div className="row">
            <div className="col-md-6">{this.renderResults()}</div>
            <div className="col-md-6">{this.renderMap()}</div>
          </div>
        </div>
      </div>
    );
  }
}
