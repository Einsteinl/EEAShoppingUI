import { Product } from './../Model/Product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8080/product/";
  // prod : Product = null;

  getProducts() {
    return this.http.get<Product[]>(this.url+"all");
  }

  getProduct(pid)  {
    
    return this.http.get<Product>(this.url+pid);
    
  }

  addProduct(product: Product) {
    return this.http.post<Product>(this.url+"add", product).
            subscribe(product => {
              console.log(product.pName + " sucessfully added")
            },
            err => {
              console.log(product.pName + "Couldn't post"+ err)
            });
  }
}
