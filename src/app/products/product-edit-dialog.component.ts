import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Product } from './state/product.model';

@Component({
  selector: 'app-product-edit-dialog',
  templateUrl: './product-edit-dialog.component.html',
  styleUrls: ['./product-edit-dialog.component.scss'],
})
export class ProductEditDialogComponent {
  editForm: FormGroup; // Declare a form group

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { product: Product }, // Inject the product data
    private dialogRef: MatDialogRef<ProductEditDialogComponent>,
    private formBuilder: FormBuilder // Inject FormBuilder
  ) {
    // Initialize the form with the product data
    this.editForm = this.formBuilder.group({
      title: [data.product.title, Validators.required],
      description: [data.product.description],
      price: [data.product.price, Validators.required],
    });
  }

  save(): void {
    if (this.editForm.valid) {
      const updatedProduct: Product = {
        ...this.data.product, // Keep the existing properties
        ...this.editForm.value, // Update with the form values
      };

      this.dialogRef.close(updatedProduct); // Pass the updated product data to the parent component
    }
  }

  cancel(): void {
    this.dialogRef.close(); // Close the dialog without saving changes
  }
}
