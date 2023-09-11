import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {
  private isAuthenticated = false;

  login(username: string, password: string): Observable<boolean> {
    // Simulate a successful login for demonstration purposes.
    if (username === 'demo' && password === 'password') {
      this.isAuthenticated = true;
      return of(true);
    } else {
      return of(false);
    }
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
