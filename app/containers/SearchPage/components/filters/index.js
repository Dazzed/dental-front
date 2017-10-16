import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import styles from './styles.css';
import './custom.css';

import {
  ButtonToolbar,
  DropdownButton,
  MenuItem
} from 'react-bootstrap';

@CSSModules(styles)
export default class Filters extends React.Component {

  initialState = {
    selectedDistance: 'ANY',
    selectedSpecialty: 'ALL',
    selectedSortType: 'MEMBERSHIP PRICING'
  };

  componentWillMount () {
    this.state = this.initialState;
  }

  resetFilters = () => {
    this.setState({ ...this.initialState });
  }

  renderSpecialties = specialtiesList => {
    const allSpecialty = [ (
      <MenuItem key={Math.random()} eventKey={null}>ALL</MenuItem>
    ) ];

    const specialties = specialtiesList.map((s, i) => {
      return (
        <MenuItem key={i} eventKey={s.id}>{s.name.toUpperCase()}</MenuItem>
      );
    });

    return allSpecialty.concat(specialties);
  };

  selectDistance = key => {
    const cb = this.props.onSelectDistance(key === 'any' ? null : key);
    this.setState({ selectedDistance: key === 'any' ? 'ANY' : `${key} MILES` }, cb);
  }

  selectSpecialty = key => {
    let cb;
    let selectedSpecialty = this.props.specialtiesList.find(s => s.id === Number(key));
    if (selectedSpecialty) {
      selectedSpecialty = selectedSpecialty.name.toUpperCase();
      cb = this.props.onSelectSpecialty(key);
    } else {
      selectedSpecialty = 'ALL';
      this.props.onSelectSpecialty(null);
    }
    this.setState({ selectedSpecialty }, cb);
  }

  selectSortType = key => {
    const cb = this.props.onSelectSortType(key);
    const selectedSortType = key === 'price' ? 'MEMBERSHIP PRICING' : 'REVIEW SCORE';
    this.setState({ selectedSortType }, cb);
  }

  render () {
    const {
      specialtiesList,
    } = this.props;

    const {
      selectedDistance,
      selectedSortType,
      selectedSpecialty
    } = this.state;

    return (
      <Row>
        <Col xs={3}>
          <h4>FILTER RESULTS BY:</h4>
        </Col>
        <Col xs={3}>
          <ButtonToolbar styleName="pt-2">
            <DropdownButton
              styleName="filter-button"
              bsSize="large"
              title={`DISTANCE ${selectedDistance}`}
              id="dropdown-no-caret"
              noCaret
              onSelect={this.selectDistance}
            >
              <MenuItem eventKey="any">ANY</MenuItem>
              <MenuItem eventKey="5">5 MILES</MenuItem>
              <MenuItem eventKey="10">10 MILES</MenuItem>
              <MenuItem eventKey="25">25 MILES</MenuItem>
            </DropdownButton>
          </ButtonToolbar>
        </Col>
        <Col xs={3}>
          <ButtonToolbar styleName="pt-2">
            <DropdownButton
              styleName="filter-button"
              bsSize="large"
              title={`SORT ${selectedSortType}`}
              id="dropdown-no-caret"
              noCaret
              onSelect={this.selectSortType}
            >
              <MenuItem eventKey="price">MEMBERSHIP PRICING</MenuItem>
              <MenuItem eventKey="score">REVIEW SCORE</MenuItem>
            </DropdownButton>
          </ButtonToolbar>
        </Col>
        <Col xs={3}>
          <ButtonToolbar styleName="pt-2">
            <DropdownButton
              styleName="filter-button"
              bsSize="large"
              title={`SPECIALTY ${selectedSpecialty}`}
              id="dropdown-no-caret"
              noCaret
              onSelect={this.selectSpecialty}
            >
              {this.renderSpecialties(specialtiesList)}
            </DropdownButton>
          </ButtonToolbar>
        </Col>
      </Row>
    );
  }
}
