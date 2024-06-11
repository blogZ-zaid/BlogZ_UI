import { createAction, props } from '@ngrx/store';

export const setUserId = createAction('[User] Set User ID', props<{ userId: string }>());
export const clearUserId = createAction('[User] Clear User ID');
