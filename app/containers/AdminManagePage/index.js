import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

import { selectCurrentUser } from 'containers/App/selectors';

import AdminManageTabs from 'components/AdminManageTabs';
import ManagersList from 'components/ManagersList';
import LoadingSpinner from 'components/LoadingSpinner';
import {
  changePageTitle,
  fetchAccountManagers,
  selectManager,
  toggleAddingManager,
  addManager,
  toggleEditingManager,
  editManager,
} from './actions';
import styles from './styles.css';

import AddManagerForm from './modals/addManager';
import EditManagerForm from './modals/editManager';

function mapStateToProps(state) {
  return {
    managers: state.AdminManagePage.managers,
    selectedManager: state.AdminManagePage.selectedManager,
    addingManager: state.AdminManagePage.addingManager,
    editingManager: state.AdminManagePage.editingManager,
    user: selectCurrentUser(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    // app 
    changePageTitle: (title) => dispatch(changePageTitle(title)),
    fetchAccountManagers: () => dispatch(fetchAccountManagers()),
    selectManager: (manager) => dispatch(selectManager(manager)),
    toggleAddingManager: (value) => dispatch(toggleAddingManager(value)),
    addManager: values => dispatch(addManager(values)),
    toggleEditingManager: (value) => dispatch(toggleEditingManager(value)),
    editManager: values => dispatch(editManager(values)),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles, { allowMultiple: true })
export default class AdminManagePage extends React.Component {

  static propTypes = {
    // app - dispatch
    changePageTitle: React.PropTypes.func.isRequired,
    fetchAccountManagers: React.PropTypes.func.isRequired,
    managers: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    selectManager: React.PropTypes.func.isRequired,
    addingManager: React.PropTypes.bool.isRequired,
    toggleAddingManager: React.PropTypes.func.isRequired,
    addManager: React.PropTypes.func.isRequired,
    toggleEditingManager: React.PropTypes.func.isRequired,
    editManager: React.PropTypes.func.isRequired,
    user: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]).isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.user) {
      this.props.fetchAccountManagers();
    }
  }

  componentDidMount() {
    this.props.changePageTitle('Dentists');
  }

  onSelectManager = manager => {
    this.props.selectManager(manager);
  };

  toggleAddManager = value => {
    this.props.toggleAddingManager(value);
  };

  addManager = values => {
    this.props.addManager(values);
  };

  toggleEditManager = value => {
    this.props.toggleEditingManager(value);
  };

  editManager = values => {
    this.props.editManager({...values, id: this.props.editingManager.id});
  };

  render () {
    if (this.props.managers === null) {
      return (
        <div>
          <AdminManageTabs active="managers" />

          <div styleName="content content--filler">
            <LoadingSpinner showOnlyIcon={false} />
          </div>
        </div>
      );
    }
    return (
      <div>
        <AdminManageTabs active='managers' />
        <div styleName="content">
          <ManagersList
            managers={this.props.managers}
            selectManager={this.onSelectManager}
            selectedManager={this.props.selectedManager}
            onEditButtonClick={this.toggleEditManager}
          />
          <br />
          <input
            type="button"
            className={styles['button--short']}
            value="ADD ACCOUNT MANAGER"
            onClick={() => this.toggleAddManager(true)}
          />
          <AddManagerForm
            addingManager={this.props.addingManager}
            onCancel={() => this.toggleAddManager(false)}
            onSubmit={this.addManager}
          />

          <EditManagerForm
            editingManager={this.props.editingManager}
            onCancel={() => this.toggleEditManager(null)}
            onSubmit={this.editManager}
          />
        </div>
      </div>
    )
  }
}
