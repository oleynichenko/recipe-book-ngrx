import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { map, take } from 'rxjs/operators';
import {Store} from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
              private store: Store<fromApp.AppState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth')
      .pipe(
        take(1),
        map((authState: fromAuth.State) => {
          if (authState.authenticated) {
            return true;
          } else {
            this.router.navigate(['/signin']);
          }
        })
      );
  }
}
