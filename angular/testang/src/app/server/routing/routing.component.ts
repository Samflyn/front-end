import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CanComponentDeactivate } from './can-deactive-duard.service';

@Component({
  selector: 'app-routing',
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.css'],
})
export class RoutingComponent
  implements OnInit, OnDestroy, CanComponentDeactivate {
  user: { id: number; name: string };

  userName: string;

  paramsSubscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this is useful for the first init
    // but when the data changes this wont work
    // as angular wont create a new instance of routing
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
    };

    // only useful if the component is reloaded with new data from within
    // if the component is rechead from other component it always gets init
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.user.id = params['id'];
      this.user.name = params['name'];
    }); // observable

    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    this.route.queryParams.subscribe((data: Params) => {
      console.log(data);
    });
    this.route.fragment.subscribe((fragment: string) => {
      console.log(fragment);
    });

    // dynamic data from route
    // data accessed should be the same as the resolve variable
    this.route.data.subscribe((data: Data) => {
      this.userName = data['userName'];
    });
  }

  // observables are handled seperatly from component
  // route observables are unsubscribed by angular automatically
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  // in routerLink by default link are relative unless prefixed by /
  // 'basic' will direct to activeRoute/basic
  // '/basic' will direct to /basic
  goHome(): void {
    this.router.navigate(['server', 'basic'], {
      queryParamsHandling: 'preserve', // to preserve query params, to overwrite use 'merge'
      preserveFragment: true,
    });
    // this.router.navigateByUrl('basic');
    // this.router.navigate(['basic'], { relativeTo: this.route }); // relative route
  }

  setParams(id: number): void {
    this.router.navigate(['../../', id, this.user.name], {
      queryParams: { edit: '1' },
      fragment: 'loading',
      relativeTo: this.route,
    });
    console.log(this.route);
  }

  canDeactivate(): boolean | Promise<boolean> | Observable<boolean> {
    if (this.user.id) {
      return true;
    } else {
      return confirm('Are you sure to leave');
    }
  }
}
