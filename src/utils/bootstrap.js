
export function validateState(field) {
  return field.touched && field.error ? 'error' : undefined;
}
