import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Define user roles as an enum
enum UserRole {
  Admin = 'admin',
  User = 'user',
}

@Injectable({
  providedIn: 'root'
})
export class MockApiService {
  private isAuthenticated = false;
  private currentUser: User | null = null;

  login(username: string, password: string): Observable<boolean> {
    // Simulate a successful login for demonstration purposes.
    if (this.isValidUser(username, password)) {
      this.isAuthenticated = true;
      this.currentUser = { username, role: username === UserRole.Admin ? UserRole.Admin : UserRole.User };
      return of(true);
    } else {
      return of(false);
    }
  }

  logout(): void {
    this.isAuthenticated = false;
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
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
}

interface User {
  username: string;
  role: UserRole;
}
