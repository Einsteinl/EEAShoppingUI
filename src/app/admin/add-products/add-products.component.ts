// import { Product } from './../../Model/Product';
import { ImagesService } from './../../Services/images.service';
import { Category } from './../../Model/Category';
import { CategoryService } from './../../Services/category.service';
import { Product } from '../../Model/Product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  categories : Category[] = [];
  selectedImg : File = null;
  preview:boolean = false;
  product:Product =<Product> new Object();

  constructor(private router : Router, private route: ActivatedRoute, private productService : ProductService, private categoryService : CategoryService, private imagesService : ImagesService) { }



  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      let id = param.get("pid");
      if(id != null || id != ""){
        if(id == "new"){
          this.product = <Product> new Object();
        }else{
          this.productService.getProduct(id).subscribe(product => {
            this.product = product;
          })
        }
      }
    })
    this.getCategories();
  }

  public onSubmit() {

    if(this.product!=null){
      console.log(this.product);
      let prod = this.productService.addProduct(this.product).subscribe(product => {
        console.log(product.name + " sucessfully added")
      this.router.navigate(['admin/products']);

      },
      err => {
        console.log(this.product.name + "Couldn't post"+ err)
      });
      console.log(prod);

      return prod;
    }

  }

  previewCard(form){
    if(form != null){
      this.preview = true;
    this.product = form;
    }

  }

  public getCategories() {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res;
    }, err => {
      console.log("Error fetching categories " + err)
    });
  }

  onImageSelect(img) {
    // this.selectedImg = <File>event.target.files[0];
    // const fd = new FormData();
    // fd.append('image', this.selectedImg, this.selectedImg.name)
    console.log(img);
    this.imagesService.uploadAnImage(img).subscribe(res => {
      console.log(res);
    })
    // this.uploadFile(this.selectedImg)
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

  // uploadImage() {
  //   let reqId = MediaManager
  // }
}
