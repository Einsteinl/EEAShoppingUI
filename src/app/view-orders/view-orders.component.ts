import { AuthService } from './../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SalesOrder } from '../Model/SalesOrder';
import { SalesOrderService } from '../Services/sales-order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {

  orders:SalesOrder[] = []
  constructor(private orderService:SalesOrderService, private userService:AuthService, private router:Router) { }

  username = sessionStorage.getItem("username")
  ngOnInit() {
    if(this.username != "no_user"){
      this.userService.getUser(this.username).subscribe(user => {
        this.orderService.getOrdersByUid(user.id).subscribe(orders => {
        this.orders = orders;
      }, err => console.log("getting orders failed !!"))
        })
    }else{
      this.router.navigate(['login'])
    }

  }

}
