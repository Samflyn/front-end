import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// service can only be injected to something with metadata
// @Injectable() should be used in service that can receive another service
// i.e receiving service should have it
@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  toShare = new EventEmitter();

  activatedSubject = new Subject<boolean>();

  accountsList: { name: string; age: number }[] = [
    { name: 'sam', age: 1 },
    { name: 'sam', age: 2 },
  ];

  constructor() {}

  clickToShare(): void {
    this.toShare.emit(
      'Subscribe to EventEmitter and get notified of any changes.'
    );
  }
}
