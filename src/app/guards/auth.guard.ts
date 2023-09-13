import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
  CanActivate,
} from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Check if the user is authenticated using the isAuthenticated method
    if (!this.authService.isAuthenticated()) {
      window.alert('Access Denied, Login is Required to Access This Page!');
      this.router.navigate(['login']);
      return false; // Return false to prevent access
    }
    return true; // User is authenticated, allow access
  }
}
