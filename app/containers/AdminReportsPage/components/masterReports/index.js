/* DentiMasterReports Component
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

/* Master Reports
 * ========================================================================== */
@CSSModules(styles, { allowMultiple: true })
export default class MasterReports extends React.Component {

  static propTypes = {
    reportDates: React.PropTypes.object.isRequired,
    onMasterReportSelected: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.state = {
      activeYear: null
    };
  }

  renderMonths = (year) => {
    const months = this.props.reportDates[year]
      .map(yearData => {
        return (
          <div className="row" styleName="list-entry__wrapper" key={yearData.month}>
            <div className="col-sm-12">
              <div styleName="list-entry">
                <div styleName="list-entry__header">
                  <span styleName="list-entry__title" onClick={(evt) => this.props.onMasterReportSelected({ year, month: yearData.monthShort })}>
                    {yearData.month}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      });
    return months;
  }

  selectYear = year => {
    this.setState({
      activeYear: this.state.activeYear === year ? null : year,
    });
  }

  /* Render
   * ------------------------------------------------------ */
  render() {
    const {
      reportDates,
    } = this.props;
    
    const years = Object.keys(reportDates);

    return (
      <div>
        { years.map((year, i) => {
          return (
            <div className="row" styleName="list-entry__wrapper" key={year}>
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
                          {this.renderMonths(year)}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          )}
        )}
      </div>
    );
  }

}