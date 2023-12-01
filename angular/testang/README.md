# Testang

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## For Angular Universal

Angular Universal is used to render the first page on the server and push it to user.

ng add @nguniversal/express-engine --clientProject project-name

for angular 8 and below

-> check for { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader'

or install by -> npm install --save @nguniversal/module-map-ngfactory-loader

This is used to enable lazyloading in angular

## Angular Universal using nestJS

ng add @nestjs/ng-universal

## Angular Animations

-> You probably need to install the new animations package : npm install --save @angular/animations

-> Add the BrowserAnimationsModule to your imports[] array in AppModule

-> This Module needs to be imported from @angular/platform-browser/animations' => import { BrowserAnimationsModule } from '@angular/platform-browser/animations' (in the AppModule!)

-> You then import trigger , state , style etc from @angular/animations instead of @angular/core

## Service Worker

-> To set angular to use service worker run : ng add @angular/pwa --project *project-name*

-> install a node server : npm install http-server

-> cd to dist and then http-server -p "port"