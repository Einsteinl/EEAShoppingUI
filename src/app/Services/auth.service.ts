import { getUser } from './../Model/getUser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../Model/Auth';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = "http://localhost:8888/user/"
  authenticated:boolean = false;
  $currentUser

  constructor(private http : HttpClient) { }

  RegisterUser(user) {
    return this.http.post(this.url+"register.do", user);
  }

  CheckEmail(email:string) {
    return this.http.get(this.url+"check/"+email);
  }

  CheckUsername(username:string) {
    return this.http.get(this.url+"checkUsername/"+username);
  }

  getUser(username:string){
    if(username != null){
      return this.http.get<getUser>(this.url+"auth/username/"+username)
    }else {
      return null
    }

  }

  authenticate(username:string, password:string) {
    let auth : Auth =<Auth> new Object();
    auth.username = username
    auth.password = password
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('sahan' + ':' + 's123')});
    return this.$currentUser = this.http.post<User>(this.url+"login", auth);
  }


}
