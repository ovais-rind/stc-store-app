import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from './state/product.service'; // Adjust the path
import { Product } from './state/product.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog for dialogs
import { AuthenticationService } from '../auth/authentication.service';
//import { User } from '../auth/user.model';
import { ProductDeleteConfirmationDialogComponent } from './product-delete-confirmation-dialog.component';
import { ProductEditDialogComponent } from './product-edit-dialog.component';
import { AddProductDialogComponent } from './add-product-dialog.component';
//import { ProductEditDialogComponent } from './product-edit-dialog.component'; // Adjust the path

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isAdmin:boolean= false;
  displayedColumns: string[] = ['id', 'title', 'description', 'price'];

  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>([]); // Initialize with an empty array
  pageSize = 10; // Set your desired page size here

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    private authService: AuthenticationService,
    private dialog: MatDialog // Inject MatDialog
  ) {
    this.isAdmin = this.authService.getCurrentUser()?.id === 1 ? true: false;
    if(this.isAdmin){
      this.displayedColumns.push("actions")
    }
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.dataSource.paginator = this.paginator;
    });
  }

  openProductForm() {
    const dialogRef = this.dialog.open(AddProductDialogComponent);

    dialogRef.afterClosed().subscribe((newProduct: Product | undefined) => {
      if (newProduct) {
        this.productService.addProduct(newProduct).subscribe((addedProduct) => {
          this.products.push(addedProduct);
          this.dataSource.data = this.products;
        });
      }
    });
  }


  editProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductEditDialogComponent, {
      data: { product },
    });
  
    dialogRef.afterClosed().subscribe((updatedProduct: Product | undefined) => {
      if (updatedProduct) {
        this.productService.updateProduct(updatedProduct).subscribe(() => {
          const index = this.products.findIndex(p => p.id === updatedProduct.id);
          if (index !== -1) {
            this.products[index] = updatedProduct;
          }
          this.dataSource.data = this.products;
        });
      }
    });
  }
  
  
  deleteProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductDeleteConfirmationDialogComponent, {
      data: { productName: product.title },
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.productService.deleteProduct(product.id).subscribe(() => {
          const index = this.products.findIndex(p => p.id === product.id);
          if (index !== -1) {
            this.products.splice(index, 1);
          }
          this.dataSource.data = this.products;
        });
      }
    });
  }
  
}
