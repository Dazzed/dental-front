/*
Review Form Component
================================================================================
*/

/*
Import
------------------------------------------------------------
*/
// libs
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

// app
import Input from 'components/Input';
import LabeledInput from 'components/LabeledInput';
import ReviewScore from 'components/ReviewScore';
import {
  editingReviewSelector,
} from 'containers/YourDentistPage/selectors';

// local
import styles from './styles.css';
import ReviewValidator from './validator';

/*
Redux
------------------------------------------------------------
*/
const valueSelector = formValueSelector('sendReview');

const mapStateToProps = (state) => {
  const score = valueSelector(state, 'rating');

  return {
    initialValues: editingReviewSelector(state),
    score: score !== undefined
             ? parseInt(score)
             : 5, // default to 5 if score is undefined
  };
};

const mapDispatchToProps = (dispatch) => ({
  submit: () => dispatch(submitForm('sendReview')),
});


/*
Review Form
================================================================================
*/
@connect(mapStateToProps, mapDispatchToProps)
@reduxForm({
  form: 'sendReview',
  enableReinitialize: true,
  validate: ReviewValidator,
})
@CSSModules(styles)
export default class ReviewForm extends React.Component {

  static propTypes = {
    // form related
    initialValues: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    submit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,

    // form value
    score: React.PropTypes.number.isRequired,

    // modal related
    show: React.PropTypes.bool.isRequired,
    onCancel: React.PropTypes.func.isRequired,
  };

  render () {
    const {
      // form related
      handleSubmit,
      submit,
      submitting,

      // form value
      score,

      // modal related
      show,
      onCancel,
    } = this.props;

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
          <Modal.Title>Review Your Dentist</Modal.Title>
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
              <div className="col-sm-offset-2 col-sm-8">
                <ControlLabel>Review Score:</ControlLabel>
              </div>

              <div className="col-sm-offset-2 col-sm-4">
                <div className="row">
                  <Field
                    name="rating"
                    type="number"
                    component={Input}
                    label="0 to 10"
                  />
                </div>
              </div>

              <div className="col-sm-4">
                <ReviewScore score={score} />
              </div>
            </FormGroup>

            <div className="row">
              <Field
                name="review"
                type="textarea"
                component={LabeledInput}
                label="Write Your Review"
                placeholder=""
                className="col-sm-offset-2 col-sm-8"
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
          <div styleName="modal-controls">
            <button
              type="button"
              disabled={submitting}
              styleName="button--short--lowlight"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={submitting}
              styleName="button--short"
              onClick={submit}
            >
              Submit
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}
