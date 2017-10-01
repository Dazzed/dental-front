const validatePriceCode = value => {
  if (!value) {
    return 'Price code is missing';
  }
  return null;
};

const validatePrice = value => {
  if (!value) {
    return 'Price amount is missing';
  }
  if (value <= 0) {
    return 'Price amount must be greater than zero';
  }
  return null;
};

const validateFrequency = value => {
  if (!value) {
    return 'Frequency is missing';
  }
  if (value <= 0) {
    return 'Frequency must be greater than zero';
  }
  return null;
};

export {
  validatePriceCode,
  validatePrice,
  validateFrequency
};
