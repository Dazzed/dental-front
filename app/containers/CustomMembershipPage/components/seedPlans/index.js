import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import CaretDown from 'react-icons/lib/fa/caret-down';
import CaretRight from 'react-icons/lib/fa/caret-right';
import Row from 'react-bootstrap/lib/Row';
import Button from 'react-bootstrap/lib/Button';

import ConfirmModal from 'components/ConfirmModal';
import styles from './styles.css';
import SeedPlanForm from '../seedPlanForm';


@CSSModules(styles)
export default class SeedPlans extends Component {
  componentWillMount () {
    this.state = {
      expandedPlan: null,
      activatingPlan: null
    };
  }

  setExpandedPlan = plan => {
    this.setState({ expandedPlan: plan.name });
  }

  unsetExpandedPlan = (callback = () => {}) => {
    this.setState({ expandedPlan: null }, callback);
  }

  handlePlanClick = plan => {
    const { expandedPlan } = this.state;
    if (!this.props.loading) {
      if (expandedPlan === plan.name) {
        this.unsetExpandedPlan();
      } else {
        const cb = () => {
          this.setExpandedPlan(plan);
        };
        this.unsetExpandedPlan(cb);
      }
    }
  }

  renderActivationConfirmationDialog = values => {
    const { onSubmit } = this.props;
    const {
      expandedPlan,
    } = this.state;
    const onConfirm = () => {
      this.setState({ activatingPlan: null });
      onSubmit(expandedPlan, values);
    };
    const onCancel = () => {
      this.setState({ activatingPlan: null });
    };
    this.setState({
      activatingPlan: {
        title: 'Confirm Plan Activation',
        message: (
          <div>
            Do you want to activate the <strong className="hq-color">{expandedPlan}</strong> plan?
            <p>You can also modify the prices later.</p>
          </div>
        ),
        confirm: onConfirm,
        onCancel
      }
    });
  }

  renderCaret = plan => {
    const { expandedPlan } = this.state;
    if (expandedPlan === plan.name) {
      return <CaretDown />;
    }
    return <CaretRight />;
  }

  renderSeedPlanForm = plan => {
    const { expandedPlan } = this.state;
    const { loading } = this.props;
    if (expandedPlan === plan.name) {
      return (
        <div className="col-sm-12 edit-form-container">
          <SeedPlanForm
            plan={plan}
            loading={loading}
            onSubmit={this.renderActivationConfirmationDialog}
          />
        </div>
      );
    }
    return '';
  }

  renderPlan = plan => {
    return (
      <Row key={plan.name}>
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
        {this.renderSeedPlanForm(plan)}
      </Row>
    );
  }

  renderActivatePlanModal = () => {
    const { activatingPlan } = this.state;
    if (activatingPlan) {
      return (
        <ConfirmModal
          showModal
          message={activatingPlan.message}
          onCancel={activatingPlan.onCancel}
          onConfirm={activatingPlan.confirm}
          title={activatingPlan.title}
        />
      );
    }
    return '';
  }

  render () {
    const {
      seedPlans
    } = this.props;

    return (
      <div>
        { seedPlans.map(p => this.renderPlan(p)) }
        {this.renderActivatePlanModal()}
      </div>
    );
  }
}
