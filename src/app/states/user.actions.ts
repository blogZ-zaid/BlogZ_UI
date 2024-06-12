import { createAction, props } from '@ngrx/store';

export const setUserId = createAction('[User] Set User ID', props<{ userId: string }>());
export const clearUserId = createAction('[User] Clear User ID');

export const setFullName = createAction('[User] Set Full Name', props<{ fullName: string }>());
export const clearFullName = createAction('[User] Clear Full Name');

export const setEmail = createAction('[User] Set Email', props<{ email: string }>());
export const clearEmail = createAction('[User] Clear Email');

export const setPhoneNumber = createAction('[User] Set Phone Number', props<{ phoneNumber: string }>());
export const clearPhoneNumber = createAction('[User] Clear Phone Number');
