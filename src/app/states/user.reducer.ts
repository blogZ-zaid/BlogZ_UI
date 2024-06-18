import { createReducer, on } from '@ngrx/store';
import { UserState } from './user.state';
import * as UserActions from './user.actions';

export const initialState: UserState = {
  userId: null,
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
);
