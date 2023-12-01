import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AccountsService } from '../accounts.service';

@Injectable({ providedIn: 'root' })
// wrap data which will be fetched
export class ServerResolver implements Resolve<string> {
  constructor(private accountsService: AccountsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<string> | Promise<string> | string {
    return this.accountsService.accountsList[1]?.name || 'sammy';
  }
}
