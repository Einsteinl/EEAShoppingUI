import { SalesOrder } from './../Model/SalesOrder';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {

  url = "http://localhost:8080/salesOrder/";
  constructor(private http:HttpClient) { }


  getAllOrders(){
    return this.http.get<SalesOrder[]>(this.url)
  }

  getSalesOrder(id){
    return this.http.get<SalesOrder>(this.url+id);
  }

  getOrdersByUid(uid:string){
    return this.http.get<SalesOrder[]>(this.url+"user/"+uid);
  }

  addOrders(sale:SalesOrder){

    return this.http.post<SalesOrder>(this.url+"add", sale);
  }
}
