import { AddProductComponent } from './components/product/add-product/add-product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product/product-list/product-list.component';

const routes: Routes = [
  {
    path:'',
    component: ProductListComponent
  },
  {
    path:'products',
    component: ProductListComponent
  },
  {
    path:'product/add',
    component: AddProductComponent
  },
  
  {
    path:'product/edit/:id',
    component: AddProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
