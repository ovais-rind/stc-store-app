import { Component } from '@angular/core';
import { AuthenticationService } from '../../auth/authentication.service'; // Import your AuthenticationService here

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private authService: AuthenticationService) {}

  logout(): void {
    this.authService.logout(); // Call the logout method from your AuthenticationService
  }
}
