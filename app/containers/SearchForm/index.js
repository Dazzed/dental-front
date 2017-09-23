/*
Search Form Component
================================================================================
*/

import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

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
Search Form
================================================================================
*/

@connect(null, mapDispatchToProps)
@CSSModules(styles)

export default class SearchForm extends Component {
  static propTypes = {
    changeRoute: React.PropTypes.func,
  };

  constructor (props) {
    super(props);

    // Intentionally forking props here
    this.state = {
      query: this.props.query || '',
    };
  }

  handleSearchInputChange = (e) => {
    this.setState({
      query: e.target.value,
    });
    this.props.onSearch(e.target.value);
  }

  performDentistSearch = (e) => {
    e.preventDefault(); // default = form submission
    this.props.onSubmit();
    // this.props.changeRoute(`/search?q=${this.state.query}`);
  }

  render () {
    const { header, shouldDisable } = this.props;
    return (
      <form noValidate onSubmit={this.performDentistSearch}>
        <input
          disabled={shouldDisable}
          type="text"
          styleName="search"
          placeholder="Enter your zip code to begin!"
          value={this.state.query}
          onChange={this.handleSearchInputChange}
          required
        />
        <br />
        <input
          type="submit"
          styleName="button"
          value={header ? 'SEARCH' : "GET STARTED"}
          disabled={shouldDisable}
        />
      </form>
    );
  }
}

SearchForm.propTypes = {
  changeRoute: PropTypes.func,
  header: PropTypes.bool,
  query: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  shouldDisable: PropTypes.bool
};
