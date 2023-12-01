import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { BasicComponent } from './server/basic/basic.component';
import { ComponentsComponent } from './server/components/components.component';
import { BasicDirectiveDirective } from './server/directives/basic-directive.directive';
import { BetterDirectiveDirective } from './server/directives/better-directive.directive';
import { DirectivesComponent } from './server/directives/directives/directives.component';
import { UnlessDirective } from './server/directives/unless.directive';
import { DropdownDirective } from './server/directives/dropdown.directive';
import { ServicesComponent } from './server/services/services.component';
import { RoutingComponent } from './server/routing/routing.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorPageComponent } from './server/error-page/error-page.component';
import { ObservablesComponent } from './server/observables/observables.component';
import { FormssComponent } from './server/formss/formss.component';
import { PipessComponent } from './server/pipess/pipess.component';
import { CustomPipe } from './server/pipess/custom.pipe';
import { FilterPipe } from './server/pipess/filter.pipe';
import { HttpssComponent } from './server/httpss/httpss.component';
import { MyHeaderInterceptor } from './server/httpss/myHeader-interceptor.service';
import { MyLoggingInterceptor } from './server/httpss/logging-interseptor.service';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthenticationInterceptor } from './authentication/auth-intersept.service';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { NgRxComponent } from './ng-rx/ng-rx.component';
import * as fromAppReducer from './store/app.reducer';
import { AnimationsComponent } from './server/animations/animations.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ElementsComponent } from './server/elements/elements.component';
import { InsideElementsComponent } from './server/elements/inside-elements/inside-elements.component';
import { NgRxEffects } from './ng-rx/ng-rx.effects';
import { MaterialModule } from './material.module';
import { MaterialComponent } from './material/material.component';
import { MaterialSignupComponent } from './material/material-signup/material-signup.component';

@NgModule({
  declarations: [
    // in modules components, directives and pipes only once
    //  we can import it multiple times but not declared
    // we need to export it and again import it into other module
    AppComponent,
    ServerComponent,
    BasicComponent,
    ComponentsComponent,
    BasicDirectiveDirective,
    BetterDirectiveDirective,
    DirectivesComponent,
    UnlessDirective,
    DropdownDirective,
    ServicesComponent,
    RoutingComponent,
    ErrorPageComponent,
    ObservablesComponent,
    FormssComponent,
    PipessComponent,
    CustomPipe,
    FilterPipe,
    HttpssComponent,
    AuthenticationComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    NgRxComponent,
    AnimationsComponent,
    ElementsComponent,
    InsideElementsComponent,
    MaterialComponent,
    MaterialSignupComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    // BrowserModule should only be used once, use CommonModule in all other modules instead i.e ng-for
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    // exception, as this only provides services and no directives components,
    // services are availabe application wide also across modules
    // but all the other imports should be imported if we need to use it in other modules i.e feature module
    // StoreModule.forRoot({ NumbersList: numberListReducer }),
    StoreModule.forRoot(fromAppReducer.appReducer),
    EffectsModule.forRoot([NgRxEffects]),
    // to define ngrx which reducers are used i.e ActionReducerMap
    // define identifier to reducer
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }), // for service worker, ngsw-worker will be auto generated when built for production
    // Angular Materail
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    // instead of using providers we can provide these in different module i.e core module and import that module or just use providedIn
    // for multiple interseptors order matters
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyLoggingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
  ], // to provide instance application wide
  bootstrap: [AppComponent],
})
export class AppModule {}
