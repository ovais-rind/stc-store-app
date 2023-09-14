import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-delete-confirmation-dialog',
  template: `
    <h2 mat-dialog-title class="confirmation-title">Confirm Deletion</h2>
    <mat-dialog-content>
      <p class="confirmation-message">Are you sure you want to delete the product:</p>
      <p class="product-name">{{ data.productName }}</p>
    </mat-dialog-content>
    <mat-dialog-actions class="confirmation-actions">
      <button mat-button (click)="cancel()" class="cancel-button">Cancel</button>
      <button mat-button color="warn" (click)="confirm()" class="confirm-button">Confirm</button>
    </mat-dialog-actions>
  `,
  styleUrls: ["./product-delete-confirmation-dialog.component.scss"]
})
export class ProductDeleteConfirmationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { productName: string },
    private dialogRef: MatDialogRef<ProductDeleteConfirmationDialogComponent>
  ) {}

  cancel(): void {
    this.dialogRef.close(false); // User canceled the deletion
  }

  confirm(): void {
    this.dialogRef.close(true); // User confirmed the deletion
  }
}
