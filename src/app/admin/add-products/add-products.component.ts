import { Category } from './../../Model/Category';
import { CategoryService } from './../../Services/category.service';
import { Product } from '../../Model/Product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  categories : Category[] = [];
 selectedImg : File = null;

  constructor(private router : Router, private productService : ProductService, private categoryService : CategoryService) { }

  

  ngOnInit() {
    this.getCategories();
  }

  public onSubmit(product:Product) {
    
    console.log(product);
    let prod = this.productService.addProduct(product);
    this.router.navigate(['admin/products']);
    console.log(prod);

    return prod;
  }

  

  public getCategories() {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res;
    }, err => {
      console.log("Error fetching categories " + err)
    });
  }

  onImageSelect(event) {
    this.selectedImg = <File>event.target.files[0];
    const fd = new FormData();
    fd.append('image', this.selectedImg, this.selectedImg.name)
    console.log(this.selectedImg);
    this.uploadFile(this.selectedImg)
  }
  
  uploadFile(file) {
    var url = `https://api.cloudinary.com/v1_1/apiit-eea/upload`;
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  
    // Reset the upload progress bar
    //  document.getElementById('progress').style.width = 0;
    
    // Update progress (can be used to show progress indicator)
    // xhr.upload.addEventListener("progress", function(e) {
    //   var progress = Math.round((e.loaded * 100.0) / e.total);
    //   document.getElementById('progress').style.width = progress + "%";
  
    //   console.log(`fileuploadprogress data.loaded: ${e.loaded},
    // data.total: ${e.total}`);
    // });
  
    xhr.onreadystatechange = function(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // File uploaded successfully
        var response = JSON.parse(xhr.responseText);
        // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
        var url = response.secure_url;
        // Create a thumbnail of the uploaded image, with 150px width
        var tokens = url.split('/');
        tokens.splice(-2, 0, 'w_150,c_scale');
        var img = new Image(); // HTML5 Constructor
        img.src = tokens.join('/');
        img.alt = response.public_id;
        document.getElementById('gallery').appendChild(img);
      }
    };
  
    fd.append('upload_preset', "j56kaixh");
    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', file);
    xhr.send(fd);
    
  }
}
