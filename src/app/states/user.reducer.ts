import { createReducer, on } from '@ngrx/store';
import { UserState } from './user.state';
import * as UserActions from './user.actions';

export const initialState: UserState = {
  userId: null,
  fullName: null,
  email: null,
  phoneNumber: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.setUserId, (state, { userId }) => ({
    ...state,
    userId
  })),
  on(UserActions.clearUserId, state => ({
    ...state,
    userId: null
  })),
  on(UserActions.setFullName, (state, { fullName }) => ({
    ...state,
    fullName
  })),
  on(UserActions.clearFullName, state => ({
    ...state,
    fullName: null
  })),
  on(UserActions.setEmail, (state, { email }) => ({
    ...state,
    email
  })),
  on(UserActions.clearEmail, state => ({
    ...state,
    email: null
  })),
  on(UserActions.setPhoneNumber, (state, { phoneNumber }) => ({
    ...state,
    phoneNumber
  })),
  on(UserActions.clearPhoneNumber, state => ({
    ...state,
    phoneNumber: null
  }))
);
