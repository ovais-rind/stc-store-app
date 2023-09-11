import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Add this line
import { FormsModule } from '@angular/forms'; // Add this line
import { MatButtonModule } from '@angular/material/button'; // Add this line
import { MatInputModule } from '@angular/material/input'; // Add this line
import { MatFormFieldModule } from '@angular/material/form-field'; // Add this line
import { MatCardModule } from '@angular/material/card'; // Add this line

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // Add this line
    FormsModule, // Add this line
    MatButtonModule, // Add this line
    MatInputModule, // Add this line
    MatFormFieldModule, // Add this line
    MatCardModule // Add this line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
