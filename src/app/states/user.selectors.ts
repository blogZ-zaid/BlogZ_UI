import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.state';

// Create a feature selector for the user state
export const selectUserState = createFeatureSelector<UserState>('user');

// Selector to get the user ID
export const selectUserId = createSelector(
  selectUserState,
  (state: UserState) => state.userId
);

// Selector to get the full name
export const selectFullName = createSelector(
  selectUserState,
  (state: UserState) => state.fullName
);

// Selector to get the email
export const selectEmail = createSelector(
  selectUserState,
  (state: UserState) => state.email
);

// Selector to get the phone number
export const selectPhoneNumber = createSelector(
  selectUserState,
  (state: UserState) => state.phoneNumber
);

// Combined selector to get the complete user profile
export const selectUserProfile = createSelector(
  selectUserState,
  (state: UserState) => ({
    userId: state.userId,
    fullName: state.fullName,
    email: state.email,
    phoneNumber: state.phoneNumber
  })
);
