import expect from 'expect';

import {
  ME_FROM_TOKEN,
  SET_AUTH_DATA,
  SET_USER_DATA,
} from '../constants';

import {
  meFromToken,
  setUserData,
  setAuthData,
} from '../actions';

describe('App Actions', () => {
  describe('meFromToken', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: ME_FROM_TOKEN,
      };

      expect(meFromToken()).toEqual(expectedResult);
    });
  });

  describe('setUserData', () => {
    it('should return the correct type and the passed user object', () => {
      const user = {
        id: 1,
        name: 'Test User',
      };
      const expectedResult = {
        type: SET_USER_DATA,
        payload: {
          currentUser: user,
        },
      };

      expect(setUserData(user)).toEqual(expectedResult);
    });
  });

  describe('setAuthData', () => {
    it('should return the correct type and the passed auth token', () => {
      const authData = {
        token: 'eyJhbGci',
        type: 'client',
      };
      const expectedResult = {
        type: SET_AUTH_DATA,
        payload: {
          authData,
        },
      };

      expect(setAuthData(authData)).toEqual(expectedResult);
    });
  });
});
