import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';

import {Ingredient} from '../../shared/ingredient.model';
import * as ShActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;

  subscription: Subscription;
  editedItem: Ingredient;
  editMode = false;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('sh')
      .subscribe((data) => {
        if (data.editedIngredientIndex > -1) {
          this.editedItem = data.editedIngredient;
          this.editMode = true;

          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShActions.StopEdit());
  }

  onSubmit(slForm: NgForm) {
    const ingName = slForm.value.name;
    const ingAmount = slForm.value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);

    if (this.editMode) {
      this.store.dispatch(new ShActions.UpdateIngredient(newIngredient));
    } else {
      this.store.dispatch(new ShActions.AddIngredient(newIngredient));
    }

    this.editMode = false;
    this.slForm.reset();
  }

  onDelete() {
    this.store.dispatch(new ShActions.DeleteIngredient());
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }
}
