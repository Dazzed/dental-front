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
    this.props.onSelectDistance(key === 'any' ? null : key);
  }

  getSpecialty = id => {
    if (!id) return null;
    const specialty = this.props.specialtiesList.find(s => s.id === Number(id));
    if (specialty) return specialty.name.toUpperCase();
    return null;
  }

  selectSpecialty = key => {
    const selectedSpecialty = this.props.specialtiesList.find(s => s.id === Number(key));
    if (selectedSpecialty) {
      this.props.onSelectSpecialty(key);
    } else {
      this.props.onSelectSpecialty(null);
    }
  }

  selectSortType = key => {
    this.props.onSelectSortType(key);
  }

  render () {
    const {
      specialtiesList,
      activeDistance,
      activeSort,
      activeSpecialty
    } = this.props;

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
              title={activeDistance ? `DISTANCE - ${activeDistance}` : 'DISTANCE'}
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
              title={activeSort ? `SORT - ${activeSort.toUpperCase()}` : 'SORT'}
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
              title={this.getSpecialty(activeSpecialty) ? `SPECIALTY - ${this.getSpecialty(activeSpecialty)}` : 'SPECIALTY'}
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
