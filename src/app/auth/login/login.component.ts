import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]], 
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe(
        (result) => {
          if (result) {
            this.router.navigate(['/products']); 
          } else {
            this.errorMessage = 'Invalid username or password';
          }
        },
        (error) => {
          this.errorMessage = 'Authentication failed. Please try again.';
        }
      );
    } else {
      // Angular Reactive Forms validation failed, display validation errors if any
      // You can choose to handle this part as per your UI requirements
    }
  }
}
