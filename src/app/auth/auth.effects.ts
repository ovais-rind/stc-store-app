import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthenticationService } from './authentication.service';
import { User } from './user.model';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthenticationService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          switchMap((result:any) => {
            if (typeof result === 'boolean') {
              // Handle boolean result (possibly indicating a successful login)
              if (result) {
                // Successful login - Provide a valid User object or handle this case as needed
                const user: User = { id: 1, username: 'user', email: 'user@gmail.com' }; // Replace with actual user data
                return of(AuthActions.loginSuccess({ user }));
              } else {
                // Failed login
                return of(AuthActions.loginFailure({ errorMessage: 'Login failed' }));
              }
            } else if (result instanceof User) {
              // Handle User object result (successful login)
              return of(AuthActions.loginSuccess({ user: result }));
            } else {
              // Handle other unexpected result types here
              return of(AuthActions.loginFailure({ errorMessage: 'Unexpected result' }));
            }
          }),
          catchError((error) =>
            of(AuthActions.loginFailure({ errorMessage: error.message }))
          )
        )
      )
    )
  );
}
