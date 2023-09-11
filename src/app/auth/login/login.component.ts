import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthenticationService) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).then((result) => {
      if (result) {
        // Redirect to protected content after successful login
      } else {
        // Handle login failure
        alert('Invalid username or password');
      }
    });
  }
}
