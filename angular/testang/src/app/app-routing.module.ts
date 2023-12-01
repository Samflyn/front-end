import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { BasicComponent } from './server/basic/basic.component';
import { ComponentsComponent } from './server/components/components.component';
import { DirectivesComponent } from './server/directives/directives/directives.component';
import { RoutingComponent } from './server/routing/routing.component';
import { ServerComponent } from './server/server.component';
import { ServicesComponent } from './server/services/services.component';
import { CanDeactivateGuard } from './server/routing/can-deactive-duard.service';
import { ErrorPageComponent } from './server/error-page/error-page.component';
import { ServerResolver } from './server/routing/server-resolver.service';
import { ObservablesComponent } from './server/observables/observables.component';
import { FormssComponent } from './server/formss/formss.component';
import { PipessComponent } from './server/pipess/pipess.component';
import { HttpssComponent } from './server/httpss/httpss.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { NgRxComponent } from './ng-rx/ng-rx.component';
import { AnimationsComponent } from './server/animations/animations.component';
import { AppComponent } from './app.component';
import { ElementsComponent } from './server/elements/elements.component';
import { MaterialComponent } from './material/material.component';
import { MaterialSignupComponent } from './material/material-signup/material-signup.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent, pathMatch: 'full' },
  // { path: 'login', component: AuthenticationComponent },
  {
    path: 'server',
    component: ServerComponent,
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    // canActivate: [AuthenticationGuard],
    children: [
      { path: 'basic', component: BasicComponent },
      { path: 'components', component: ComponentsComponent },
      { path: 'directives', component: DirectivesComponent },
      { path: 'services', component: ServicesComponent },
      {
        path: 'routing',
        component: RoutingComponent,
        resolve: { userName: ServerResolver }, // dynamic data to route
        canDeactivate: [CanDeactivateGuard],
      },
      { path: 'routing/:id/:name', component: RoutingComponent }, // dynamic params
      { path: 'observables', component: ObservablesComponent },
      { path: 'formss', component: FormssComponent },
      { path: 'pipess', component: PipessComponent },
      { path: 'httpss', component: HttpssComponent },
      { path: 'animations', component: AnimationsComponent },
      { path: 'elements', component: ElementsComponent },
      {
        path: 'error',
        component: ErrorPageComponent,
        data: { message: 'Page Not Found!!!' }, // static data to route
      },
    ],
  },
  { path: 'ngrx', component: NgRxComponent },
  {
    path: 'material',
    component: MaterialComponent,
    children: [{ path: 'signup', component: MaterialSignupComponent }],
  },

  { path: '**', redirectTo: 'server/error' },
  // Lazy Loading
  // modules which are lazyLoaded should be removed from app module declarations
  // for lazyloading feature modules should have it's own routes
  // to only load when the url is visited
  // { path: 'lazyLoading', loadChildren: 'path/to/module#exportedModule' },
  // in newer versions for loading loading
  // {
  //   path: 'lazyLoading',
  //   loadChildren: () => import('./path/to/module').then((m) => m.moduleName),
  // },
  // in the imorted module use the route with path: '' since the path is already /lazyLoading
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      useHash: false,
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabled',
    }),
  ], // in other modules use RouterModule.forChild(), this merges with the forRoot() in appModule
  exports: [RouterModule],
})
export class AppRoutingModule {}
