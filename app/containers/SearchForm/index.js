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

    this.state = {
      query: '',
    };
  }

  handleSearchInputChange = (e) => {
    this.setState({
      query: e.target.value,
    });
  }

  performDentistSearch = (e) => {
    e.preventDefault(); // default = form submission
    this.props.changeRoute(`/search?q=${this.state.query}`);
  }

  render() {
    const { header } = this.props;

    return (
      <form noValidate onSubmit={this.performDentistSearch}>
        <input
          type="text"
          styleName="search"
          placeholder="Enter your location, zip code, dentist name, etc."
          value={this.state.query}
          onChange={this.handleSearchInputChange}
          required
        />
        <br />
        <input type="submit" styleName="button" value={header ? 'SEARCH' : "GET STARTED"} />
      </form>
    );
  }
}

SearchForm.propTypes = {
  changeRoute: PropTypes.func,
  header: PropTypes.bool,
};
