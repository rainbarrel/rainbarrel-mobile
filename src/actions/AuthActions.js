import Firebase from 'firebase';
import { CHANGE_EMAIL, CHANGE_PASSWORD } from './types';

export const changeEmail = email => ({
  type: CHANGE_EMAIL,
  payload: email
});

export const changePassword = password => ({
  type: CHANGE_PASSWORD,
  payload: password
});
