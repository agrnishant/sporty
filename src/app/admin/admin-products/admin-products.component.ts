import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  filteredProducts: Product[];
  subscription: Subscription;
  constructor(private prodSrvc: ProductService){
  }

  filter(query: String){
    this.filteredProducts = this.prodSrvc.filter(query);
  }

  getProductsSubscription(){
    this.subscription = this.prodSrvc.getProductsSubscription();
  }

  getProducts(){
    return this.prodSrvc.getProducts();
  }

  ngOnInit() {
    this.getProductsSubscription();
    this.filter('');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
