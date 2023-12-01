import { Action } from '@ngrx/store';

// export const ADD_NUMBER = 'ADD_NUMBER';
// [feature name] and what it does
export const ADD_NUMBER_START = '[Actions] Add Number Start';
export const ADD_NUMBER = '[Actions] Add Number';
export const UPDATE_NUMBER = '[Actions] Update Number';
export const DELETE_NUMBER = '[Actions] Delete Number';

export class AddNumberStart implements Action {
  readonly type = ADD_NUMBER_START;

  constructor(public payload: string) {}
}

// since we need to export an action
// !!! since actions reach all reducers the identifier names should not be same across whole app
export class AddNumber implements Action {
  readonly type = ADD_NUMBER; // identifier for action
  // payload: string; // data

  constructor(public payload: string) {}
}

export class UpdateNumber implements Action {
  readonly type = UPDATE_NUMBER;

  constructor(public payload: { index: number; num: string }) {}
}

export class DeleteNumber implements Action {
  readonly type = DELETE_NUMBER;

  constructor(public payload: number) {}
}

// all types
export type AllActionTypes = AddNumber | UpdateNumber | DeleteNumber;
