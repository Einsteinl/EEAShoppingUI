import { CartService } from './../Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';

import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../Model/Product';
import { Router } from '@angular/router';
import { Cart } from '../Model/Cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;

  prod : Product;
  dicountedPrice: number;
  constructor(private router : Router, private productService : ProductService, private cartService: CartService) { }


  ngOnInit() {

  }

  gotoProduct(productid) {
    //  this.router.navigate(["admin/products",product])
     console.log("product");
     console.log(productid);
    this.productService.getProduct(productid).subscribe(prod => {
      // console.log(prod +"hooooo")
      this.prod = prod;
      this.router.navigate(['products', prod.id])
    }, err => {
      console.log(err);
    });

    //
  }

  promo(){
    if(this.prod.promotion != null){
     let promoPrice = this.prod.price * this.prod.promotion.percentage
     this.dicountedPrice = this.prod.price - promoPrice;
    }
  }

  addToCart(product:Product) {
    let username = sessionStorage.getItem('username');
    if(username == "no_user" || username == ""){
      this.router.navigate(['login'])
    }else{
      let cart =<Cart> new Object();
      cart.product = product
      cart.username = username;
      cart.quantity = 1;

      this.cartService.addToCart(cart).subscribe(res => {
        console.log(res)
      });
    }

  }
}
