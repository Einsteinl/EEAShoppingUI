import { Cart } from './../Model/Cart';
import { CartService } from './../Services/cart.service';
import { ProductService } from './../Services/product.service';
import { Product } from './../Model/Product';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product : Product


  cart : Cart = <Cart>{};

  constructor(private route: ActivatedRoute, private router: Router, private prodcutService:ProductService, private cartService : CartService) { }

  ngOnInit() {



    this.route.paramMap.subscribe(param => {
      let id = param.get('id');
      this.prodcutService.getProduct(id).subscribe(product => {
        this.product = product;
      })
    })


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
