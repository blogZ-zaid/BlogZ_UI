import { createReducer, on } from '@ngrx/store';
import { UserState } from './user.state';
import * as UserActions from './user.actions';

export const initialState: UserState = {
  userId: null,
  fullName:null
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
);
