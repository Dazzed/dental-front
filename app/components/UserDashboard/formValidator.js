import { validatorFactory } from 'utils/reduxForm';

const reviewFormSchema = {
  title: { presence: true },
  review: { presence: true },
  rating: {
    numericality: {
      greaterThanOrEqualTo: 0,
      lessThanOrEqualTo: 5,
    },
  },
  isAnonymous: { presence: { message: '^Display name or not?' } },
};

const messageFormSchema = {
  message: { presence: true },
};

export const writeReviewFormValidator = validatorFactory(reviewFormSchema);
export const writeMessageFormValidator = validatorFactory(messageFormSchema);
