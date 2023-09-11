import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedComponent } from './protected/protected.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    ProtectedComponent,
    LoginComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
