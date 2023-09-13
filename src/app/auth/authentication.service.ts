import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authState = new BehaviorSubject<boolean>(this.getInitialAuthState());

  constructor(private router: Router) {
    // Retrieve the initial authentication state from localStorage
    const initialAuthState = this.getInitialAuthState();
    this.authState.next(initialAuthState);
  }

  login(username: string, password: string): Observable<boolean> {
    // Simulate a successful login for demonstration purposes.
    if (this.isValidUser(username, password)) {
      this.setAuthState(true); // Update authState and persist it
      return of(true);
    } else {
      return of(false);
    }
  }

  logout(): void {
    // Implement logout logic here
    this.setAuthState(false); // Update authState and persist it
    localStorage.removeItem("authState");
    this.router.navigate(['/login']); 
  }

  // Expose authState as an observable
  get authState$(): Observable<boolean> {
    return this.authState.asObservable();
  }

  private isValidUser(username: string, password: string): boolean {
    // Implement your logic to validate user credentials here.
    // For demonstration purposes, this example allows "admin" and "user" with specific passwords.
    if (username === 'admin' && password === 'admin') {
      return true;
    }
    if (username === 'user' && password === 'user') {
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return this.authState.value;
  }

  private setAuthState(isAuthenticated: boolean): void {
    // Update the authState and persist it in localStorage
    this.authState.next(isAuthenticated);
    localStorage.setItem('authState', JSON.stringify(isAuthenticated));
  }

  private getInitialAuthState(): boolean {
    // Retrieve the initial authentication state from localStorage
    const storedAuthState = localStorage.getItem('authState');
    return storedAuthState ? JSON.parse(storedAuthState) : false;
  }
}
