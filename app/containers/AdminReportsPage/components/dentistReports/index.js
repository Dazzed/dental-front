/* DentistReports Component
 * ==========================================================================
 */

/* Imports
 * ------------------------------------------------------ */
// lib
import moment from 'moment';
import React from 'react';
import CSSModules from 'react-css-modules';
import FaUser from 'react-icons/lib/fa/user';

// local
import styles from './styles.css';
import CaretDown from 'react-icons/lib/fa/caret-down';
import CaretRight from 'react-icons/lib/fa/caret-right';
import LoadingSpinner from 'components/LoadingSpinner';

/* Dentist Reports
 * ========================================================================== */
@CSSModules(styles, { allowMultiple: true })
export default class DentistReports extends React.Component {

  static propTypes = {
    dentists: React.PropTypes.array.isRequired,
    onSelectDentist: React.PropTypes.func.isRequired,
    onDentistReportLinkClick: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.state = {
      activeDentist: null,
      activeYear: null
    };
  }

  selectYear = year => {
    this.setState({
      activeYear: this.state.activeYear === year ? null : year,
    });
  }

  renderMonths = (yearData) => {
    return yearData.map(year => {
      return (
        <div className="row" styleName="list-entry__wrapper" key={year.month}>
          <div className="col-sm-12">
            <div styleName="list-entry">
              <div styleName="list-entry__header">
                <span styleName="list-entry__title" onClick={(evt) => this.props.onDentistReportLinkClick({ year: year.year, month: year.monthShort, url: year.url })}>
                  {year.month}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  renderYearsAndMonths = (dentist) => {
    const years = Object.keys(dentist.reports);
    return years.map((year, i) => {
      return (
        <div className="row" styleName="list-entry__wrapper" key={year + dentist.id}>
          <div className="col-sm-8">
            <div styleName="list-entry">

              <div styleName="list-entry__header" onClick={() => this.selectYear(year)}>
                <span styleName="list-entry__title">
                  {year}
                </span>

                <span styleName="list-entry__toggle">
                  {this.state.activeYear === year ? (<CaretDown />) : (<CaretRight />)}
                </span>
              </div>

              {this.state.activeYear === year && (
                <div styleName="list-entry__body">
                  <div className="row">
                    <div className="col-sm-offset-1 col-sm-10">
                      {this.renderMonths(dentist.reports[year])}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      );
    });
  }

  /* Render
   * ------------------------------------------------------ */
  render() {
    const {
      dentists,
      onSelectDentist,
      selectedDentist,
    } = this.props;

    return (
      <div>
        { dentists.map((dentist, i) => {
          return (
            <div className="row" styleName="list-entry__wrapper" key={dentist.id}>
              <div className="col-sm-8">
                <div styleName="list-entry">

                  <div styleName="list-entry__header" onClick={() => onSelectDentist(dentist)}>
                    <span styleName="list-entry__title">
                      {dentist.firstName} {dentist.lastName}
                    </span>

                    <span styleName="list-entry__toggle">
                      {selectedDentist && selectedDentist.id === dentist.id ? (<CaretDown />) : (<CaretRight />)}
                    </span>
                  </div>

                  {selectedDentist && selectedDentist.id === dentist.id && selectedDentist.reports && 
                    <div styleName="list-entry__body">
                      <div className="row">
                        <div className="col-sm-offset-1 col-sm-10">
                          {this.renderYearsAndMonths(selectedDentist)}
                        </div>
                      </div>
                    </div>
                  }

                </div>
              </div>
            </div>
          )}
        )}
      </div>
    );
  }

}