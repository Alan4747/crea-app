import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  _products?: Products[] = [];
  constructor(private http: HttpClient) {}

  getAllProduct() {
    const da = localStorage.getItem('PRODUCTS')
    const localdata = JSON.stringify(da);
    this._products = JSON.parse(localdata);
    //console.log(this._products);
    return this._products;
  }

  getProductById(id: any) {
    this._products = this.getAllProduct();
    // console.log(this._products);
        
  }
}
