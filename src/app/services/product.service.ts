import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../modals/product.modal';

@Injectable()
export class ProductService {

  baseProductAPiUrl= 'products/api/';
  
  constructor(private http: HttpClient) {
    
  }

  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(environment.baseapiurl + this.baseProductAPiUrl + environment.apiVersion);
  }

  getProduct(id: string): Observable<Product>{
    return this.http.get<Product>(environment.baseapiurl + this.baseProductAPiUrl + environment.apiVersion + '/product/' + id);
  }

  addUpdateProduct(product: any, file: File): Observable<any> {
    var header = new HttpHeaders();
    header.set('Accept', 'application/json');
    header.delete('Content-Type');
    const httpOptions = {headers:  header};
    
    let formData = this.toFormData<Product>(product);
    if(!product.id)
      return this.http.post(environment.baseapiurl + this.baseProductAPiUrl + environment.apiVersion,
        formData, httpOptions);
    return this.http.patch(environment.baseapiurl + this.baseProductAPiUrl + environment.apiVersion + '/product/' + product.id,
        formData, httpOptions);
  }

  removeProduct(productId: any): Observable<any> {
    return this.http.delete(environment.baseapiurl + this.baseProductAPiUrl + environment.apiVersion + '/product/' + productId);
  }
  
  private toFormData<T>(formValue: any): FormData {
    const formData = new FormData();
  
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    
    return formData;
  }
}
