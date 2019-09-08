import { CategoryService } from './../../Services/category.service';
import { Category } from './../../Model/Category';
import { Product } from './../../Model/Product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products : Product[] =[]
  filteredProducts : Product[] = []
  category : Category
  subscription : Subscription
  categories$
  constructor(private prodService : ProductService, private catService : CategoryService) {

  }

  ngOnInit() {
    this.subscription = this.prodService.getProducts().subscribe(products => {
      this.filteredProducts = this.products = products;
    }, err => {
      console.log(err)
    });

    this.categories$ = this.catService.getCategories();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  addCategory() {

    var categoryName = prompt("Enter new category name");
    console.log(categoryName);
    if(categoryName!=null || categoryName != ""){
      // this.category.name = categoryName;
      this.catService.addCategory(categoryName);
    }
  }

  filter(query:string){
    // console.log(query);
    this.filteredProducts = (query) ? this.products.filter(p=>p.name.toLowerCase().includes(query.toLowerCase()) || p.subtitle.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  deleteProduct(pid){
    console.log(pid)
    this.prodService.deleteProduct(pid).subscribe(res => {
      console.log(res);
      this.ngOnInit();
    })
  }

}
