import { DataService } from './../Services/data.service';
import { Category } from './../Model/Category';
import { CategoryService } from './../Services/category.service';
import { ProductService } from './../Services/product.service';
import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Product } from '../Model/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private service : ProductService, private catService : CategoryService, private dataService : DataService) { }

  products : Product[] = [];
  filteredProducts : Product[]
  contegories : Category[];
  query : string;
  ActiveCat : string;

  ngOnInit() {
    this.getAllProducts();
    this.catService.getCategories().subscribe(categories => {
      // console.log(categories[2].name)
      this.contegories = categories})
  }

  public getAllProducts() {

    this.service.getProducts().subscribe(res =>{
      console.log("fetching products...");
       this.filteredProducts = this.products = res;
      // console.log(this.products);
    }, err => {
      console.log("An error has occured during fethinh products from the server -> " + err);
    })
  }

  filter(query:string) {
      this.filteredProducts  = (query) ? this.products.filter(p=>{
        return p.name.toLowerCase().includes(query.toLowerCase()) || p.subtitle.toLowerCase().includes(query.toLowerCase())
      }) : this.products;
    // })

  }

  filterProducts(cid) {
    this.ActiveCat = cid;
    if(cid == "-1"){
      this.getAllProducts();
    }else
    {
      this.service.getProductsByCategory(cid).subscribe(res => {
      this.filteredProducts = res;
    })
  }
  }

}
