import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from './state/product.model';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent {
  addForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddProductDialogComponent>,
    private fb: FormBuilder
  ) {
    // Initialize the form with validators
    this.addForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  save(): void {
    if (this.addForm.valid) {
      const newProduct: Product = this.addForm.value;
      this.dialogRef.close(newProduct);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
