import { AuthService } from './../Services/auth.service';
import { Auth } from './../Model/Auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errMsg = '';
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    if(sessionStorage.getItem("username") != "no_user"){
      this.router.navigate([''])
    }
  }

  authenticateUser(form){

    console.log(form);

    this.authService.authenticate(form.username, form.password).subscribe(user => {
      if(user != null){
        console.log(user);
        sessionStorage.setItem("username", user.username)
        sessionStorage.setItem("password", user.password)
        this.authService.authenticated = true;
        this.router.navigate(["home"]).then(()=>{
            location.reload();
        });

      }else{
        console.log("login failed")
        sessionStorage.setItem("username", "no_user")
        this.errMsg = "Login failed !!"
        this.authService.authenticated = false;
      }
    })

  }
}
