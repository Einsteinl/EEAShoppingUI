import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cart } from '../Model/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems$;
  constructor(private http: HttpClient) { }

  url = "http://localhost:8888/cart/";

  username = sessionStorage.getItem("username")
  password = sessionStorage.getItem("password")

  getCartItems() {

    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.email + ':' + this.password)});
    return this.http.get<Cart[]>(this.url + "username/"+ this.username) //filter from user

  }


  addToCart(cartItem: Cart) {
    console.log(cartItem)
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.email + ':' + this.password)});
    // this.http.post(this.url+"register.do", user);
    // console.log(this.http.post(this.url + "add", cartItem,headers))
    return this.http.post(this.url + "add", cartItem,headers)
  }

  updateQty(item: Cart, qty: number) {
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.email + ':' + this.password)});

    item.quantity = item.quantity + qty;
    console.log(item)
    return this.http.put<Cart>(this.url, item).subscribe(item => console.log(item.quantity))
  }

  deleteCartItemsByUser(username : string) {
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.email + ':' + this.password)});

    return this.http.delete(this.url + "username/" + username);
  }

  deleteCartItem(id: string) {
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.email + ':' + this.password)});

    return this.http.delete(this.url +"delete/" + id);
  }

  addItemsToCart(cartItems: Cart[]) {
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.email + ':' + this.password)});

    return this.http.post<Cart>(this.url + "add/items", cartItems);

  }
}
