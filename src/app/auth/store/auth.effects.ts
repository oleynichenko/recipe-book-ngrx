import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Action } from '@ngrx/store';
import {map, switchMap, mergeMap, tap} from 'rxjs/operators';

import * as authActions from './auth.actions';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup: Observable<Action> =
    this.actions$.pipe(
      ofType(authActions.TRY_SIGNUP),
      map((action: authActions.TrySignup) => {
        return action.payload;
      }),
      switchMap((authData: {username: string, password: string}) => {
        return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
      }),
      switchMap(() => {
        return from(firebase.auth().currentUser.getIdToken());
      }),
      mergeMap((token: string) => {
        this.router.navigate(['/']);

        return [
          {
            type: authActions.SIGNUP
          },
          {
            type: authActions.SET_TOKEN,
            payload: token
          }
        ];
      })
    );

  @Effect()
  authSignin: Observable<Action> =
    this.actions$.pipe(
      ofType(authActions.TRY_SIGNIN),
      map((action: authActions.TrySignin) => {
        return action.payload;
      }),
      switchMap((authData: {username: string, password: string}) => {
        return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
      }),
      switchMap(() => {
        return from(firebase.auth().currentUser.getIdToken());
      }),
      mergeMap((token: string) => {
        this.router.navigate(['/']);
        return [
          {
            type: authActions.SIGNIN
          },
          {
            type: authActions.SET_TOKEN,
            payload: token
          }
        ];
      })
    );

  @Effect({dispatch: false})
  logout = this.actions$.pipe(
    ofType(authActions.LOGOUT),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  constructor(private actions$: Actions,
              private router: Router) {}
}
