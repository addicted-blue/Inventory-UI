import { UnitType } from './../../../modals/enums/unittype.enum';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/modals/enums/category.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/modals/product.modal';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../common/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  categoryKeys = Object.keys(Category).filter(f => !isNaN(Number(f)));
  unitTypeKeys = Object.keys(UnitType).filter(f => !isNaN(Number(f)));
  Category = Category;
  UnitType = UnitType;
  uploadFile: any;
  productId: string | null = null;
  isEditMode: boolean = false;

  productForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    imageUrl: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
    unit: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
    unitType: new FormControl(null, Validators.required)
  });


  get name() { return this.productForm.get('name'); }

  get category() { return this.productForm.get('category'); }


  get unitType() { return this.productForm.get('unitType'); }


  get unit() { return this.productForm.get('unit'); }


  constructor(private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      if (this.productId != null) {
        this.isEditMode = true;
        this.productService.getProduct(this.productId).subscribe(result => {
          this.productForm.patchValue(JSON.parse(JSON.stringify(result)));
        });
      }
    })
  }

  convertToNumber(value: any): number {
    return Number(value);
  }

  validateForm(): void {
    console.log(this.productForm.value);
    var product: Product = JSON.parse(JSON.stringify(this.productForm.value));
    product.imageUrl = this.uploadFile;
    this.productService.addUpdateProduct(product, this.uploadFile).subscribe(result => {
      const alertDialogRef = this.dialog.open(AlertDialogComponent, {
        height: '170px',
        width: '280px'
      }).afterClosed().subscribe((result) => {
        this.router.navigate(['/products']);
      });
    });
  }

  onImageChangeFromFile($event: any) {
    this.uploadFile = null;
    if ($event.target.files && $event.target.files[0]) {
      let file = $event.target.files[0];
      console.log(file);
      if (file.type == "image/jpeg" || file.type == "image/png") {
        this.uploadFile = file;
      }
      else {
        this.productForm.controls["imageUrl"].reset();
        this.productForm.controls["imageUrl"].setErrors({ incorrect: true, message: 'Please upload correct jpeg/png image)' })
      }
    }
  }
}
