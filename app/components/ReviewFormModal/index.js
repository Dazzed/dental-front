import React from 'react';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Modal from 'react-bootstrap/lib/Modal';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import {
  Field,
  formValueSelector,
  reduxForm,
  submit as submitForm
} from 'redux-form';

import Input from 'components/Input';
import LabeledInput from 'components/LabeledInput';
import ReviewScore from 'components/ReviewScore/clickAndRate';

import styles from './styles.css';
import ReviewValidator from './validator';

const mapStateToProps = (state) => {
  let rating = null, message = '', title = '', id = null;
  const clientReviews = state.global.currentUser.clientReviews;
  if (clientReviews.length > 0) {
    rating = clientReviews[0].rating;
    message = clientReviews[0].message;
    title = clientReviews[0].title;
    id = clientReviews[0].id;
  }
  return {
    initialValues: {
      rating,
      message,
      title,
      id
    }
  };
};

const mapDispatchToProps = (dispatch) => ({
  submit: () => dispatch(submitForm('review')),
});

@connect(mapStateToProps, mapDispatchToProps)
@reduxForm({
  form: 'review',
  enableReinitialize: true,
  validate: ReviewValidator,
})
@CSSModules(styles)
export default class ReviewFormModal extends React.Component {

  static propTypes = {
    // form related
    initialValues: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    submit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,

    // modal related
    show: React.PropTypes.bool.isRequired,
    onCancel: React.PropTypes.func.isRequired,
  };

  getInput(props) {
    return new Input(props);
  }

  getLabeledInput(props) {
    return new LabeledInput(props);
  }

  componentWillMount () {
    const { rating } = this.props.initialValues;
    this.state = {
      rating,
    };
  }

  handleRatingChange = evt => {
    let rating;
    if (typeof evt === 'object') {
      rating = evt.target.value;
    } else {
      rating = evt * 2;
    }
    const cb = () => this.props.change('rating', rating);
    if (rating < 0) {
      this.setState({ rating: 0 }, cb);
    } else if (rating > 10) {
      this.setState({ rating: 10 }, cb);
    } else {
      this.setState({ rating: Math.floor(rating) }, cb);
    }
  }

  render () {
    const {
      // form related
      initialValues,
      handleSubmit,
      submit,
      submitting,

      // modal related
      show,
      onCancel,
      valid,
      pristine,
    } = this.props;

    const { rating } = this.state;
    let title = "Edit Your Review";
    let saveText = "Edit Review";
    if (initialValues === null || !initialValues.id) {
      title = "Review Your Dentist";
      saveText = "Add Review";
    }

    return (
      <Modal
        backdrop={'static'}
        bsSize={'lg'}
        onHide={onCancel}
        show={show}
      >
        {/*
        Modal Header
        ------------------------------------------------------------
        */}
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        {/*
        Modal Body
        ------------------------------------------------------------
        */}
        <Modal.Body>
          <form
            onSubmit={handleSubmit}
            className="form-horizontal"
          >
            <FormGroup>
              <div className="col-sm-12">
                <ControlLabel>Rate your dentist:</ControlLabel>
              </div>

              <div className="col-sm-6 col-md-4">
                <div className="row">
                  <ReviewScore
                    rating={rating / 2}
                    onRate={this.handleRatingChange}
                  />
                </div>
              </div>

              {/*<div className="col-sm-6 col-md-4">
                <ReviewScore
                  rating={rating / 2}
                  onRate={this.handleRatingChange}
                />
              </div>*/}
            </FormGroup>
            <div className="row">
              <Field
                name="title"
                type="text"
                component={this.getLabeledInput}
                label="Title"
                placeholder="Title of your review"
                className="col-sm-6"
              />
            </div>
            <div className="row">
              <Field
                name="message"
                type="textarea"
                component={this.getLabeledInput}
                label="Write Your Review"
                placeholder=""
                className="col-sm-12"
                rows={5}
              />
            </div>
          </form>
        </Modal.Body>

        {/*
        Modal Footer
        ------------------------------------------------------------
        */}
        <Modal.Footer>
          <div className="modal-controls">
            <input
              type="button"
              className="modal-control"
              disabled={submitting || !valid || pristine}
              onClick={submit}
              value={saveText}
            />
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}
