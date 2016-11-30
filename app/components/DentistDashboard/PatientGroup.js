import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import FaCaretRight from 'react-icons/lib/fa/caret-right';
import FaCaretDown from 'react-icons/lib/fa/caret-down';

import { markMsgRead } from 'containers/Dashboard/actions';
import { selectNewMsgCount, selectSorter }
  from 'containers/Dashboard/selectors';
import PatientCard from './PatientCard';
import styles from './PatientGroup.css';

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles, { allowMultiple: true })
export default class PatientGroup extends Component {
  static propTypes = {
    title: PropTypes.string,
    groupKey: PropTypes.string,
    patients: PropTypes.array,
    sorter: PropTypes.object,
    newMsgCountBySender: PropTypes.object,
    markMsgRead: PropTypes.func,
  }

  constructor (props) {
    super(props);

    this.state = {
      isSortVisible: false,
      isCardVisible: false,
    };
  }

  toggleSort = () => {
    this.setState({
      ...this.state,
      isSortVisible: !this.state.isSortVisible,
    });
  }

  toggleCard = () => {
    this.setState({
      ...this.state,
      isCardVisible: !this.state.isCardVisible,
    });
  }

  markMsgRead = (senderId) => {
    this.props.markMsgRead(senderId);
  }

  render () {
    const { isCardVisible } = this.state;
    const { title, patients, newMsgCountBySender, groupKey }
      = this.props;
    const headerStyle = isCardVisible ? 'group-header active' : 'group-header';
    let count = patients ? patients.length : 0;

    // kind of hack :)
    if (groupKey === 'allReviews') {
      count = 'all';
    }

    return (
      <div styleName="patient-group">
        <div styleName={headerStyle}>
          <div styleName="title-wrapper" onClick={this.toggleCard}>
            <div styleName="title">
              {title} ({count})
              {
                isCardVisible
                  ? <FaCaretDown size={16} styleName="sorter-toggler" />
                  : <FaCaretRight size={16} styleName="sorter-toggler" />
              }
            </div>
            <div styleName="dot-line" />
          </div>
          <div styleName="sorter" onClick={this.toggleSort}>
            <span>Sort by</span>
          </div>
          <div className="clearfix" />
        </div>

        {patients && !!patients.length && isCardVisible &&
          <div styleName="patient-list">
            {
              patients.map((patient, index) =>
                <PatientCard
                  {...patient}
                  newMsgCount={newMsgCountBySender[patient.id]}
                  markMsgRead={this.markMsgRead}
                  key={index}
                />
              )
            }
          </div>
        }
      </div>
    );
  }
}


function mapStateToProps (state) {
  return {
    newMsgCountBySender: selectNewMsgCount(state),
    sorter: selectSorter(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    markMsgRead: (senderId) => dispatch(markMsgRead({ senderId })),
  };
}
