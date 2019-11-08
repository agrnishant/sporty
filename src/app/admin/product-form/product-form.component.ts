import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Component, OnInit } from '@angular/core';
import {take} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireObject } from '@angular/fire/database';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {key:"", title: "", price: 0, category: "", imageUrl: "../../../assets/images/bike.jpeg"};
  id;
  itemRef: AngularFireObject<any>;
  item: Observable<any>;

  constructor( private router: Router, private route: ActivatedRoute,
    private categoryService: CategoryService, private productService: ProductService) {
      this.categories$ = categoryService.getCategoriesList$();
      this.id = this.route.snapshot.paramMap.get('id');
      this.itemRef = this.productService.get(this.id);
      this.item = this.itemRef.valueChanges();
      if (this.id) this.item.pipe(take(1)).subscribe(p => this.product = p);
  }

  save(product){
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;    
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
  saveCategory(category){
    if (this.id) this.productService.update(this.id, category);
    else this.categoryService.create(category);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {  }

}
