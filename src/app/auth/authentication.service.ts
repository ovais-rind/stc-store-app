import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authState = new BehaviorSubject<boolean>(this.getInitialAuthState());
  private currentUser: User | null = null;

  constructor(private router: Router) {
    // Retrieve the initial authentication state and user from localStorage
    const initialAuthState = this.getInitialAuthState();
    this.authState.next(initialAuthState);
    this.currentUser = this.getInitialUser();
  }

  login(username: string, password: string): Observable<boolean> {
    const user = this.getUserWithRole(username, password);
    
    if (user) {
      this.setAuthState(true);
      this.currentUser = user;
      localStorage.setItem("currentUser",JSON.stringify(this.currentUser || {} ))
      return of(true);
    } else {
      return of(false);
    }
  }

  logout(): void {
    this.setAuthState(false);
    this.currentUser = null;
    localStorage.removeItem("authState");
    localStorage.removeItem("currentUser");
    this.router.navigate(['/login']);
  }

  get authState$(): Observable<boolean> {
    return this.authState.asObservable();
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.authState.value;
  }

  private getUserWithRole(username: string, password: string): User | null {
    // For demonstration purposes, this example allows "admin" and "user" with specific passwords.
    if (username === 'admin' && password === 'admin') {
      return new User(1, 'admin', 'admin@example.com');
    }
    if (username === 'user' && password === 'user') {
      return new User(2, 'user', 'user@example.com');
    }
    return null;
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

  private getInitialUser(): User | null {
    // Retrieve the initial user from localStorage
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }
}
