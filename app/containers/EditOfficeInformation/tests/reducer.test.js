import expect from 'expect';
import { fromJS } from 'immutable';

import editOfficeInformationReducer from '../reducer';

describe('editOfficeInformationReducer', () => {
  it('returns the initial state', () => {
    expect(editOfficeInformationReducer(undefined, {})).toEqual(fromJS({}));
  });
});
