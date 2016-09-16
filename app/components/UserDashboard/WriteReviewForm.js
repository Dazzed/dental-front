import React from 'react';
import { Field, reduxForm } from 'redux-form';
import CSSModules from 'react-css-modules';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
// import StarRating from 'react-star-rating';

import LabeledInput from 'components/LabeledInput';
import { writeReviewFormValidator } from './formValidator';

import styles from './form.css';

// const renderRating = ({ input }) => (
//   <Col sm={12}>
//     <FormGroup>
//       <span>Rating</span>
//       <StarRating
//         name={input.name}
//         totalStars={5}
//         size={20}
//       />
//       <span>(please choose)</span>
//     </FormGroup>
//   </Col>
// );

// renderRating.propTypes = {
//   input: React.PropTypes.object.isRequired,
//   meta: React.PropTypes.object.isRequired,
// };

const renderError = ({ meta: { touched, error } }) => (
  (touched && error) ?
    <FormGroup className="has-error">
      <Col sm={12}>
        <HelpBlock>
          {error}
        </HelpBlock>
      </Col>
    </FormGroup>
  : false
);

renderError.propTypes = {
  meta: React.PropTypes.object.isRequired,
};

@reduxForm({
  form: 'writeReview',
  validate: writeReviewFormValidator,
})
@CSSModules(styles)
class WriteReviewForm extends React.Component {

  static propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  };

  render () {
    const { handleSubmit, submitting } = this.props;

    return (
      <form
        onSubmit={handleSubmit}
        className="form-horizontal"
      >
        <Field
          name="title"
          type="text"
          component={LabeledInput}
          label="Title"
        />
        <Field
          name="review"
          type="textarea"
          component={LabeledInput}
          label="Review"
        />

        {/* <Field
          name="rating"
          component={renderRating}
        /> */}

        <Field
          name="rating"
          type="number"
          component={LabeledInput}
          label="Rating"
        />

        <Col sm={12}>
          Reviewers Name
        </Col>

        <Col sm={12}>
          <FormGroup>
            <Col sm={6}>
              <label
                htmlFor="notAnonymous"
                styleName="normal-font"
              >
                <Field
                  name="isAnonymous"
                  component="input"
                  type="radio"
                  value="false"
                  id="notAnonymous"
                />
                Display my name
              </label>
            </Col>

            <Col sm={6}>
              <label
                htmlFor="isAnonymous"
                styleName="normal-font"
              >
                <Field
                  name="isAnonymous"
                  component="input"
                  type="radio"
                  value="true"
                  id="isAnonymous"
                />
                I want to be anonymous
              </label>
            </Col>

            <Col sm={12}>
              <Field
                name="isAnonymous"
                component={renderError}
              />
            </Col>
          </FormGroup>
        </Col>

        <Col sm={12}>
          <FormGroup>
            <Col sm={12}>
              <button
                type="submit"
                disabled={submitting}
                className="btn-cyan btn-round"
              >
                Submit
              </button>
            </Col>
          </FormGroup>
        </Col>

        <div className="clearfix" />
      </form>
    );
  }
}

export default WriteReviewForm;
