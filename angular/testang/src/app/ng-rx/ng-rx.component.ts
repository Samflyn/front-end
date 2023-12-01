import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as NgRxActions from './ng-rx.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-ng-rx',
  templateUrl: './ng-rx.component.html',
  styleUrls: ['./ng-rx.component.css'],
})
export class NgRxComponent implements OnInit, OnDestroy {
  numbersList: Observable<{ numberList: string[] }>;
  isEdit: boolean;
  edit: string;
  numIndex: number;
  storeSub: Subscription;

  // identifier from Store.forRoot as key
  // type of data the reducer returns as value
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.isEdit = false;
    // to select slice of the state
    this.numbersList = this.store.select('numberList');
    // this.store.select('NumbersList').subscribe((response) => {
    //   console.log(response.numberList);
    // });
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }

  // dispatching action
  addToList(element: HTMLInputElement): void {
    if (element.value !== '') {
      // this.store.dispatch(new NgRxActions.AddNumber(element.value));
      // for using effects
      this.store.dispatch(new NgRxActions.AddNumberStart(element.value));
      element.value = null;
    }
  }

  toEdit(id: number): void {
    this.isEdit = true;
    this.numIndex = id;
    this.storeSub = this.store.select('numberList').subscribe((response) => {
      this.edit = response.numberList[id];
    });
  }

  updateList(element: HTMLInputElement): void {
    this.store.dispatch(
      new NgRxActions.UpdateNumber({ index: this.numIndex, num: element.value })
    );
    this.cancel();
  }

  cancel(): void {
    this.edit = null;
    this.isEdit = false;
    this.numIndex = null;
  }

  toDelete(id: number): void {
    this.store.dispatch(new NgRxActions.DeleteNumber(id));
    this.cancel();
  }
}
