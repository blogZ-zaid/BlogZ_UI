import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.state';

// Create a feature selector for the user state
export const selectUserState = createFeatureSelector<UserState>('user');

// Selector to get the user ID
export const selectUserId = createSelector(
  selectUserState,
  (state: UserState) => state.userId
);

