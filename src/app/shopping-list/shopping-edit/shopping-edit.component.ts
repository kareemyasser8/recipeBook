import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import * as shoppingListActions from '../store/shopping-list.action';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedItem: Ingredient;

  constructor(
    private slService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) { }
  ngOnDestroy(): void {
    this.store.dispatch(new shoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }

  onDelete() {
    this.onClear();
    this.store.dispatch(new shoppingListActions.DeleteIngredient());
  }

  onClear() {
    this.slForm.reset();
    this.store.dispatch(new shoppingListActions.StopEdit());
    this.editMode = false;
  }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe({
      next: (storeData) => {
        if (storeData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = storeData.editedIngredient;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        } else {
          this.editMode = false;
        }
      }
    })

  }


  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode == true) {
      this.store.dispatch(
        new shoppingListActions.UpdateIngredient(newIngredient))

      this.editMode = false;
    } else {
      this.store.dispatch(new shoppingListActions.AddIngredient(newIngredient));
    }
    form.reset();
  }



}
