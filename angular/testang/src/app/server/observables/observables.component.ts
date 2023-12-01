import { Component, OnDestroy, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.css'],
})
export class ObservablesComponent implements OnInit, OnDestroy {
  private firstSubscription: Subscription;
  private firstCustomSubscription: Subscription;
  data: number;
  isActive: boolean;
  activeSub: Subscription;

  constructor(private accountsService: AccountsService) {}

  // angular observables are managed by itself
  // observables are not killed when the component is destroyed
  ngOnInit(): void {
    // this.firstSubscription = interval(1000).subscribe((count) => {
    //   this.count = count;
    //   console.log(count);
    // });

    // an error cancels observables
    const customObservable = new Observable((observer) => {
      let count = 0;
      const interval = setInterval(() => {
        observer.next(count);
        if (count === 4) {
          observer.complete();
        }
        if (count === 6) {
          clearInterval(interval);
          observer.error(new Error('Count is greater than 5'));
        }
        count++;
      }, 1000);
    });

    // operators are used to change data before subscription
    // operators are from rxjs
    const pipedData = customObservable.pipe(
      map((data: number) => {
        return `Number : ${data}`;
      })
    );

    pipedData.subscribe((data) => {
      console.log(data);
    });

    this.firstCustomSubscription = customObservable.subscribe(
      (data: Data) => {
        this.data = +data;
      },
      (error: Error) => {
        console.log(error);
      },
      () => {
        console.log('completed');
      }
    );

    this.activeSub = this.accountsService.activatedSubject.subscribe((data) => {
      console.log(data);
    });
  }
  // subjects can used as replacement for eventEmitter across component through services
  // not for eventEmitter with @Output
  toActivate(): void {
    this.accountsService.activatedSubject.next(true);
    // this.onActivate();
  }

  ngOnDestroy(): void {
    // this.firstSubscription.unsubscribe();
    this.firstCustomSubscription.unsubscribe();
    this.activeSub.unsubscribe();
  }
}
