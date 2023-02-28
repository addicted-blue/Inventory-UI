import { AlertDialogComponent } from './../../common/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './../../common/confirm-dialog/confirm-dialog.component';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/modals/enums/category.enum';
import { UnitType } from 'src/app/modals/enums/unittype.enum';
import { Product } from 'src/app/modals/product.modal';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = []
  constructor(private productService: ProductService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe((result) => {
      this.products = result;
    });
  }

  removeProduct(product: Product): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '170px',
      width: '380px',
      data: { product: product },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.productService.removeProduct(product.id).subscribe((result: any) => {
          const alertDialogRef = this.dialog.open(AlertDialogComponent, {
            height: '170px',
            width: '280px'
          }).afterClosed().subscribe((result) => {
            this.getProducts();
          });
        })
      }
    });
  }
}
