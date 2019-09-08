import { OrderItem } from './../Model/OrderItem';
import { SalesOrder } from './../Model/SalesOrder';
import { SalesOrderService } from './../Services/sales-order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-orders-items',
  templateUrl: './view-orders-items.component.html',
  styleUrls: ['./view-orders-items.component.css']
})
export class ViewOrdersItemsComponent implements OnInit {

  order:SalesOrder;
  orderItems:OrderItem[]=[]
  constructor(private route:ActivatedRoute, private orderService:SalesOrderService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      let id = param.get('orderid');
      this.orderService.getSalesOrder(id).subscribe(order=>{
        this.order = order;
        // this.orderItems = order.orderItems;
      })
    })
  }

}
