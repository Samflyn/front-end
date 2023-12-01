import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { AuthenticationService, AuthResponse } from './authentication.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  isLogin = true;
  isLoading = false;
  errorMessage = null;

  // if type is passed the the first matching element
  @ViewChild(PlaceholderDirective, { static: false })
  alertElement: PlaceholderDirective;
  private closeSubscription: Subscription;

  constructor(
    private authService: AuthenticationService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    let authObservable: Observable<AuthResponse>;

    if (this.isLogin) {
      this.isLoading = true;
      authObservable = this.authService.login(
        form.value.email,
        form.value.password
      );
    } else {
      if (form.valid) {
        this.isLoading = true;
        authObservable = this.authService.signUp(
          form.value.email,
          form.value.password
        );
        form.reset();
      }
    }

    authObservable.subscribe(
      (response) => {
        this.isLoading = false;
        console.log(response);
      },
      (errorM) => {
        this.isLoading = false;
        this.errorMessage = errorM;
        this.showErrorAlert(errorM);
      }
    );
  }

  onSwitchMode(): void {
    this.isLogin = !this.isLogin;
  }

  onCloseAlert(): void {
    this.errorMessage = null;
  }

  // creating component programatically
  showErrorAlert(error: string): void {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    // view container ref is needed to render
    // it should be cleared as it is an object the is used to interact with dom
    // for angular 9 or lower the AlertComponent should be added to entrycomponent in app.modules
    this.alertElement.viewContainerRef.clear();
    const createdCompRef = this.alertElement.viewContainerRef.createComponent(
      alertComponentFactory
    );
    // to pass data to the created component
    createdCompRef.instance.message = error;
    // event emitter should not be subscribed usually
    this.closeSubscription = createdCompRef.instance.closeAlert.subscribe(
      () => {
        this.closeSubscription.unsubscribe();
        this.alertElement.viewContainerRef.clear();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }
}
