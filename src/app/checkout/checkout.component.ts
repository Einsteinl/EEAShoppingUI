import { SalesOrderService } from './../Services/sales-order.service';
import { SalesOrder } from './../Model/SalesOrder';
import { AuthService } from './../Services/auth.service';
import { Cart } from './../Model/Cart';
import { CartService} from './../Services/cart.service';
import { Component, OnInit} from '@angular/core';
import { Product} from '../Model/Product';
import { getUser } from '../Model/getUser';
import { OrderItem } from '../Model/OrderItem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartList: Cart[] = [];
  cartListLength
  total = 0;
  product: Product = < Product > new Object();
  validCheckout:boolean = false;
  username = sessionStorage.getItem("username")
  user:getUser=<getUser> new Object();

  constructor(private cartService: CartService, private authService:AuthService, private salesService:SalesOrderService, private router:Router) {

  }

  ngOnInit() {
    this.authService.getUser(this.username).subscribe(user => {
      this.user = user;
    })
    this.cartService.getCartItems().subscribe(res => {
      this.cartList = res;
      this.cartListLength = this.cartList.length;

      this.calcTotal();
    })
  }

  calcTotal() {
    for (let cartItem of this.cartList) {
      this.total = cartItem.quantity * cartItem.product.price + this.total;
    }
  }

  checkout(){

    var salesOrders:SalesOrder[] = []
    for(let cartItem of this.cartList){
      var salesOrder: SalesOrder = <SalesOrder> new Object();
      salesOrder.userId = this.user.id;
      salesOrder.productId = cartItem.product.id;
      salesOrder.productName = cartItem.product.name;
      salesOrder.currentUnitPrice = cartItem.product.price;
      salesOrder.productImage = cartItem.product.subImages;
      salesOrder.quantity = cartItem.quantity;
      salesOrder.totalPrice = cartItem.quantity * cartItem.product.price;
      salesOrders.push(salesOrder);
    }

      this.salesService.addOrders(salesOrders).subscribe(order => {
        console.log(order)
        this.router.navigate(['myorders'])
      },
      err => console.log(err));

      this.cartService.deleteCartItemsByUser(this.user.username).subscribe(res => console.log(res))
  }
}
