import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Product } from 'src/app/models/product';

@Injectable()
export class ProductService {
  prodsRef: AngularFireList<any> = null;
  prodsData: Observable<any[]> = null;
  products: Product[];
  filteredProducts: Product[];

  constructor(private db: AngularFireDatabase) { }

  create(product) { 
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products');
  }
  
  get(productId) { 
    return this.db.object('/products/' + productId);
  }

  update(productId, product) { 
    return this.db.object('/products/' + productId).update(product);
  }

  updateProd(key: string, value: any): Promise<void> {
    return this.prodsRef.update(key, value);
  }

  delete(productId) { 
    return this.db.object('/products/' + productId).remove();
  }

  getProducts() {
   return this.filteredProducts;
  }

  getProductsList() {
    return this.prodsRef = this.db.list('/products'
    );
  }
  getProductsList$() {
    return this.prodsData = this.db.list('/products').valueChanges();
  }

  getProductsSubscription(){
    return this.getProductsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(products => {
      this.filteredProducts = this.products = products;
      console.log("this.filteredProducts", this.filteredProducts);
    });
  }

  filter(query){
    return this.filteredProducts = (query)?
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())):
    this.products;
  }

  listProductsInThisCategory(catName: String){
    return this.filteredProducts = (catName)?
    this.products.filter(p => p.category.toLowerCase().includes(catName.toLowerCase())):
    this.products;
  }

}
