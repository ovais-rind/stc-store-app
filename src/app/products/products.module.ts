import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { ProductEffects } from './state/product.effects';
import { productReducer } from './state/product.reducer';
import { ProductService } from './state/product.service';
import { ProductListComponent } from './product-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HeaderComponent } from '../shared/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductDeleteConfirmationDialogComponent } from './product-delete-confirmation-dialog.component';
import { ProductEditDialogComponent } from './product-edit-dialog.component';
import { AddProductDialogComponent } from './add-product-dialog.component';

@NgModule({
  declarations: [ProductListComponent,AddProductDialogComponent,ProductEditDialogComponent,ProductDeleteConfirmationDialogComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductListComponent,
      },
    ]),
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([ProductEffects]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [ProductService],
})
export class ProductsModule {
  constructor() {
    console.log('ProductsModule constructor');
  }
}
