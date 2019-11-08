import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Category } from 'src/app/models/category';

@Injectable()
export class CategoryService {

  catsRef: AngularFireList<any> = null;
  catsData: Observable<any[]> = null;
  categories: Category[];
  filteredCategories: Category[];

  constructor(private db: AngularFireDatabase) { }

  create(category) { 
    return this.db.list('/categories').push(category);
  }

  getAll() {
    return this.db.list('/categories');
  }
  
  get(categoryId) { 
    return this.db.object('/categories/' + categoryId);
  }

  update(categoryId, category) { 
    return this.db.object('/categories/' + categoryId).update(category);
  }

  delete(categoryId) { 
    return this.db.object('/categories/' + categoryId).remove();
  }

  getCategories() {
   return this.filteredCategories;
  }

  getCategoriesList(){
    return this.catsRef = this.db.list('/categories'
    //, ref => (ref.orderByChild('name'))
    );
  }

  getCategoriesList$(){
    return this.catsData = this.db.list('/categories').valueChanges();
  }
  
  getCategoriesSubscription() {
    return this.getCategoriesList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(categories => {
      this.filteredCategories = this.categories = categories;
      console.log("this.filteredCategories", this.filteredCategories);
    });
  }

  filter(query){
    return this.filteredCategories = (query)?
    this.categories.filter(p => p.name.toLowerCase().includes(query.toLowerCase())):
    this.categories;
  }
}
