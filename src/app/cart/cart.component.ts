import { Cart } from './../Model/Cart';
import { CartService } from './../Services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  validCheckout:boolean = false;

  username = sessionStorage.getItem("username");
  cartItems : Cart[] = []
  total = 0
  constructor(private cartService : CartService, private router:Router) { }

  ngOnInit() {

    console.log("hhhhh")
    if(this.username == "no_user"){
      this.router.navigate(['login'])
    }else{
      this.cartService.getCartItems().subscribe(cartItems => {
        this.cartItems = cartItems
        if(this.cartItems.length<1){
          this.validCheckout = false;
        }else{
          this.validCheckout = true;
        }
        // this.cartItems = (this.userId) ? this.products.filter(p=>p.pName.toLowerCase().includes(query.toLowerCase()) || p.pDescription.toLowerCase().includes(query.toLowerCase())) : this.products;

        this.calcTotal();
      })
    }

  }

  deleteCartItem(pid){
    this.cartService.deleteCartItem(pid).subscribe(res =>
    {
      if(<string>res == "1"){
        if(this.username == "no_user"){
          this.router.navigate(['login'])
        }else{
          this.cartService.getCartItems().subscribe(cartItems => {
            this.cartItems = cartItems
            if(this.cartItems.length<1){
              this.validCheckout = false;
            }else{
              this.validCheckout = true;
            }
            // this.cartItems = (this.userId) ? this.products.filter(p=>p.pName.toLowerCase().includes(query.toLowerCase()) || p.pDescription.toLowerCase().includes(query.toLowerCase())) : this.products;

            this.calcTotal();
          })
        }
      }
    }

    );

  }

  onQtyChange(units, i){
    if(units != null)
    this.cartItems[i].quantity = units;
    this.total = 0
    this.cartService.addItemsToCart(this.cartItems).subscribe(res => {
      console.log(res);
    })
    this.calcTotal();
  }

  calcTotal() {
    for(let cartItem of this.cartItems){
      this.total = cartItem.quantity*cartItem.product.price + this.total;
    }
  }




}
