import { AuthService } from './../Services/auth.service';
import { HomeComponent } from './../home/home.component';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';
import { User } from '../Model/User';
import { Router } from '@angular/router';
import { getUser } from '../Model/getUser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService : AuthService, private router : Router) { }
  usersName:string = "";
  user : getUser=<getUser>new Object();
  admin:boolean = false;
  ngOnInit() {
    this.usersName = this.currentUser();
   }

  query : string
  logout(){
    sessionStorage.clear();
    sessionStorage.setItem('username', 'no_user')
    this.router.navigate(['home']).then(()=>{
    location.reload();

    })
    console.log("User logged out");
  }

  currentUser(){
    let name;
    if(sessionStorage.getItem("username")!="no_user"){
      name = sessionStorage.getItem("username")
      this.authService.getUser(name).subscribe(user => {
          this.user = user
          console.log(user.role)
          if(user.role == "1"){
            this.admin = true;
          }else{
            this.admin = false;
          }
      })
    }else{
      name = "Sign In"
    }

    return name;
  }



}
