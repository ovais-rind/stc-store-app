import { Injectable } from '@angular/core';
import { MockApiService } from '../core/mock-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private mockApiService: MockApiService) {}

  login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.mockApiService.login(username, password).subscribe((result) => {
        resolve(result);
      });
    });
  }

  logout(): void {
    this.mockApiService.logout();
  }

  isLoggedIn(): boolean {
    return this.mockApiService.isLoggedIn();
  }
}
