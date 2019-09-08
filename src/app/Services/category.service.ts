import { Category } from './../Model/Category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }

  url = "http://localhost:8888/category/";

  email = sessionStorage.getItem("email")
  password = sessionStorage.getItem("password")

  getCategories() {
    return this.http.get<Category[]>(this.url+"findAll");
  }

  addCategory(categoryName){
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.email + ':' + this.password)});

    return this.http.post<Category>(this.url+"add", categoryName, {headers})

  }

}
