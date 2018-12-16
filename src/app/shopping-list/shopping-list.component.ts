import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import * as fromApp from '../store/app.reducers';
import * as ShActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shopListState: Observable<{ingredients: Ingredient[]}>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.shopListState = this.store.select('sh');
  }

  onEditItem(i) {
    this.store.dispatch(new ShActions.StartEdit(i));
  }
}
