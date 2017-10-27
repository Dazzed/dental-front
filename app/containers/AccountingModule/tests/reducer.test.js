import expect from 'expect';
import patientAccountingPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('patientAccountingPageReducer', () => {
  it('returns the initial state', () => {
    expect(patientAccountingPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
