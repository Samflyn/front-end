import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import * as NgRxActions from './ng-rx.actions';
import { Injectable } from '@angular/core';

// effects are code snips which not important for immediate update of current state
// $ indicates observable
// actions is an observable that gives access to all dispatched actions
// an effect by default should always return an action when it's done as it does not change the state

// if an error occurs this observable dies and will not run the next time the action is dispatched
// it should always return an observable even if there is an error

// if an effect is not goind to dispatch an action we need to use @Effect({ dispatch: false })

@Injectable()
export class NgRxEffects {
  @Effect()
  adding = this.actions$.pipe(
    // filter for which type of effects to handle in this observable pipe, can add multiple actions
    ofType(NgRxActions.ADD_NUMBER_START),
    switchMap((addData: NgRxActions.AddNumberStart) => {
      // return some observable like http request
      return this.http.get('https://jsonplaceholder.typicode.com/todos/1').pipe(
        map((resData) => {
          console.log('inside map');
          return new NgRxActions.AddNumber('iii');
        }),
        catchError((error) => {
          return of();
        })
      );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
