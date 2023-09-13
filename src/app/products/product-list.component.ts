import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from './state/product.service'; // Adjust the path
import { Product } from './state/product.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['id', 'title', 'description', 'price'];

  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>([]); // Initialize with an empty array
  pageSize = 10; // Set your desired page size here

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.dataSource.paginator = this.paginator;
    });
  }
}
