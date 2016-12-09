import React from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import FaClose from 'react-icons/lib/fa/close';

import { updatePatientSearch } from 'containers/Dashboard/actions';
import { autosuggestPatientsSelector } from 'containers/Dashboard/selectors';


@connect(mapStateToProps, mapDispatchToProps)
export default class PatientAutosuggest extends React.Component {

  static propTypes = {
    patients: React.PropTypes.array,
    updatePatientSearch: React.PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props);

    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionSelected = (event, { suggestion }) => {
    this.props.updatePatientSearch(suggestion.fullName);
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  /** **/
  getSuggestionValue = (suggestion) => suggestion.fullName;

  getSectionSuggestions = (section) => section.members;

  getSuggestions = (value) => {
    const term = escapeRegexCharacters(value.trim()).toLowerCase();

    if (term === '') {
      return [];
    }

    return this.props.patients
      .map(patient => (
        {
          fullName: patient.fullName,
          members: patient.members.filter(
            member => member.fullName.toLowerCase().indexOf(term) > -1
          )
        }
      ))
      .filter(patient => patient.members.length > 0);
  }

  clearSearch = (evt) => {
    evt.preventDefault();

    this.setState({
      value: '',
      suggestions: []
    });
    this.props.updatePatientSearch('');
  }

  renderSuggestion = (suggestion) => (<span>{suggestion.fullName}</span>);

  renderSectionTitle = (section) => (<strong>{section.fullName}</strong>);


  render () {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Search members by name',
      value,
      onChange: this.onChange
    };

    return (
      <div>
        <Autosuggest
          multiSection
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          renderSectionTitle={this.renderSectionTitle}
          getSectionSuggestions={this.getSectionSuggestions}
          onSuggestionSelected={this.onSuggestionSelected}
          inputProps={inputProps}
        />
        <a
          href=""
          onClick={this.clearSearch}
        >
          <FaClose size={16} style={{ margin: '8px' }} />
        </a>
      </div>
    );
  }
}


function mapStateToProps (state) {
  return {
    patients: autosuggestPatientsSelector(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    updatePatientSearch: (term) => dispatch(updatePatientSearch(term)),
  };
}

function escapeRegexCharacters (str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
