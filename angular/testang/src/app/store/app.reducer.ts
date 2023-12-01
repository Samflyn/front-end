import { ActionReducerMap } from '@ngrx/store';
import * as fromNgRxReducer from '../ng-rx/ng-rx.reducer';
import * as fromAuthReducer from '../authentication/store/auth.reducer';

export interface AppState {
  numberList: fromNgRxReducer.State;
  auth: fromAuthReducer.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  numberList: fromNgRxReducer.numberListReducer,
  auth: fromAuthReducer.authReducer,
};
