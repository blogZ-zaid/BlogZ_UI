import { createAction, props } from '@ngrx/store';

export const setUserId = createAction('[User] Set User ID', props<{ userId: string }>());
export const clearUserId = createAction('[User] Clear User ID');

export const setFullName = createAction('[User] Set User FUll Name', props<{ fullName: string }>());
export const clearFullName = createAction('[User] Clear User Full Name');
