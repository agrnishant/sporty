import { AngularFireObject } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  cat: string;
  subscription: Subscription;
  itemRef: AngularFireObject<any>;
  item: Observable<any>; 

  constructor(public prodSrvc: ProductService, 
    public categoryService: CategoryService,
    route: ActivatedRoute ){
      route.queryParamMap.subscribe(params=> {
        this.cat = params.get('category');
      });
     this.filter('');
  }

  getProductsSubscription(){
    this.subscription = this.prodSrvc.getProductsSubscription();
  }

  getCategoriesSubscription() {
    this.subscription = this.categoryService.getCategoriesSubscription();
  }

  filter(query: String){
    return this.prodSrvc.filter(query);
  }

  listProductsInThisCategory(catName: String){
   return this.prodSrvc.listProductsInThisCategory(catName);
  }

  getProducts(){
    return this.prodSrvc.getProducts();
  }

  getCategories(){
    return this.categoryService.getCategories();
  }

  ngOnInit() {
    this.getProductsSubscription();
    this.getCategoriesSubscription();
    this.filter('');
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
