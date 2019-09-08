import { Router } from '@angular/router';
import { Role } from './../Model/Role';
import { AuthService } from './../Services/auth.service';
import { User } from './../Model/User';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  roles : Role[] = [{'roleId': 'jfnjk33','role':'USER'}]
  // ,{'roleId': 'aifi33','role':'ADMIN'}]
   userRole  =  ([{'roleId': 'jfnjk33','role':'USER'}])

  isEmailValid : boolean = true;
  isUsernameValid : boolean = true;
  formInvalid : boolean;
  constructor(private auth : AuthService, private router:Router) { }
  errMsg = ""
  usernameErrMsg = ""
  ngOnInit() {
  }

  onSubmit(form:FormGroup) {
    let user : User = form.value;
    let newUser : User = <User> new Object();
    newUser = user;
    newUser.role = "2";

    if(form.invalid) {
      this.formInvalid = true;
      console.log("user req did not send")
    }
    else{
      this.formInvalid = false
      this.auth.RegisterUser(newUser).subscribe(res => {
        console.log(res)
        this.router.navigate(['login'])
      }, err => console.log(err))

    }




  }

  onEmailBlur(email : string) {

    if(email != ""){
      if(email.includes("@")){
        this.auth.CheckEmail(email).subscribe(res=>{
          if(<boolean> res){
            this.isEmailValid = false
            this.errMsg = "Email address is already exist"
          }
          else {
            this.isEmailValid = true
          }

        },
        err=>console.log(err));
      }
      else{
        this.isEmailValid = false;
        this.errMsg = "Email address is not valid"
      }
    }
  }

  onUsernameBlur(username : string) {

    if(username != ""){
      this.auth.CheckUsername(username).subscribe(res=>{
          if(<boolean> res){
            this.isUsernameValid = false
            this.usernameErrMsg = "Username is already exist"
          }
          else {
            this.isUsernameValid = true
          }

        },
        err=>console.log(err));
    }
  }
}
