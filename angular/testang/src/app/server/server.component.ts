import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { BasicComponent } from './basic/basic.component';
import { AccountsService } from './accounts.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { UserModel } from '../authentication/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  encapsulation: ViewEncapsulation.Emulated, // css encapsulation default is emulated
  providers: [AccountsService],
})
export class ServerComponent implements OnInit, OnDestroy {
  basicData: string;

  accountsList: { name: string; age: number }[] = [];

  @ViewChild(BasicComponent) basics: BasicComponent;

  user: UserModel;
  authSubscription: Subscription;

  constructor(
    private accounts: AccountsService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.accountsList = this.accounts.accountsList;
    this.authService.isLoggedIn();
    this.authSubscription = this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  fromChild(eventData: { name: string; age: number }): void {
    console.log('event fired from child');
    console.log('Data', eventData);
  }

  toBasic(eventData: string): void {
    this.basicData = eventData;
    this.basics.fromServerM(eventData);
  }

  ngOnDestroy(): void {
    // don't do this
    // this.authService.user.unsubscribe();
    // always set the subscription to a variable
    this.authSubscription.unsubscribe();
  }
}
