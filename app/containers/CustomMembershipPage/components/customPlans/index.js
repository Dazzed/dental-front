import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import CaretDown from 'react-icons/lib/fa/caret-down';
import CaretRight from 'react-icons/lib/fa/caret-right';
import Row from 'react-bootstrap/lib/Row';
import Button from 'react-bootstrap/lib/Button';

import ConfirmModal from 'components/ConfirmModal';
import styles from './styles.css';
import EditPlanForm from '../editPlanForm';


@CSSModules(styles)
export default class CustomPlans extends Component {
  componentWillMount () {
    this.state = {
      expandedPlan: null,
      deletingPlan: null
    };
  }

  setExpandedPlan = plan => {
    this.setState({ expandedPlan: plan.id });
  }

  unsetExpandedPlan = (callback) => {
    const afterSetState = () => {
      return callback.call();
    };
    this.setState({ expandedPlan: null }, afterSetState);
  }

  handlePlanClick = plan => {
    const { expandedPlan } = this.state;
    const { setEditingMembershipId } = this.props;
    if (!this.props.loading) {
      if (expandedPlan === plan.id) {
        const cb = () => setEditingMembershipId(null);
        this.unsetExpandedPlan(cb);
      } else {
        const cb = () => {
          setEditingMembershipId(plan.id);
          this.setExpandedPlan(plan);
        };
        this.unsetExpandedPlan(cb);
      }
    }
  }

  renderCancelConfirmationDialog = evt => {
    const { setDeletingMembershipId, deleteMembership } = this.props;
    const deletingPlan = evt.target.attributes['data-plan-id'].value;
    const planName = evt.target.attributes['data-plan-name'].value;
    const onCancel = () => {
      this.setState({ deletingPlan: null }, () => setDeletingMembershipId(null));
    };
    this.setState({
      deletingPlan: {
        title: 'Confirm Delete Plan',
        message: (
          <div>
            Do you want to delete the <strong className="hq-color">{planName}</strong> plan?
          </div>
        ),
        confirm: () => deleteMembership(deletingPlan),
        onCancel
      }
    }, () => setDeletingMembershipId(deletingPlan));
  }

  renderCaret = plan => {
    const { expandedPlan } = this.state;
    if (expandedPlan === plan.id) {
      return <CaretDown />;
    }
    return <CaretRight />;
  }

  renderEditPlanForm = plan => {
    const { expandedPlan } = this.state;
    const { loading, onSubmit } = this.props;
    if (expandedPlan === plan.id) {
      return (
        <div className="col-sm-12 edit-form-container">
          <Button
            bsStyle="danger"
            className="delete-plan-button"
            data-plan-id={plan.id}
            data-plan-name={plan.name}
            onClick={(evt) => this.renderCancelConfirmationDialog(evt)}
          >
            DELETE THIS PLAN
          </Button>
          <EditPlanForm plan={plan} loading={loading} onSubmit={onSubmit} />
        </div>
      );
    }
    return '';
  }

  renderPlan = plan => {
    return (
      <Row key={plan.id}>
        <div className="col-sm-12 accordion-container" onClick={() => this.handlePlanClick(plan)}>
          <div className="col-sm-11">
            <p className="plan-name">{plan.name}</p>
          </div>
          <div className="col-sm-1 caret-icon-container">
            <span className="caret-icon">
              {this.renderCaret(plan)}
            </span>
          </div>
        </div>
        {this.renderEditPlanForm(plan)}
      </Row>
    );
  }

  renderDeletePlanModal = () => {
    const { deletingMembershipId } = this.props;
    const { deletingPlan } = this.state;
    if (deletingMembershipId && deletingPlan) {
      return (
        <ConfirmModal
          showModal
          message={deletingPlan.message}
          onCancel={deletingPlan.onCancel}
          onConfirm={deletingPlan.confirm}
          title={deletingPlan.title}
        />
      );
    }
    return '';
  }

  render () {
    const {
      plans
    } = this.props;

    return (
      <div>
        { plans.map(p => this.renderPlan(p)) }
        {this.renderDeletePlanModal()}
      </div>
    );
  }
}
