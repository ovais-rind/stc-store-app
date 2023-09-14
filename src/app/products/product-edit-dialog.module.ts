import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ProductEditDialogComponent } from './product-edit-dialog.component';

@NgModule({
  declarations: [ProductEditDialogComponent],
  imports: [
    CommonModule,
    FormsModule, // Add this line
    // ...
  ],
  exports: [
    ProductEditDialogComponent,
  ],
})
export class ProductEditDialogModule { }
