import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from './auth.state';

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  errorMessage: '',
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    isAuthenticated: true,
    user,
    errorMessage: '',
  })),
  on(AuthActions.loginFailure, (state, { errorMessage }) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    errorMessage,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    errorMessage: '',
  }))
);
