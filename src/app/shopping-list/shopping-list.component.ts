import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import * as shoppingListActions from '../shopping-list/store/shopping-list.action';
import * as fromAppState from '../store/app.reducer';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients$: Observable<{ ingredients: Ingredient[] }>;
  subsciption: Subscription;

  constructor(
    private slService: ShoppingListService,
    private store: Store<fromAppState.AppState>
  ) {}

  ngOnInit(): void {
    this.ingredients$ = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.store.dispatch(new shoppingListActions.StartEdit(index));
    // this.slService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    if (this.subsciption) {
      this.subsciption.unsubscribe();
    }
  }
}
