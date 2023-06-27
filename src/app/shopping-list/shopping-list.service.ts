import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {

  private ingredients : Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  private ingredientsChanged = new Subject<Ingredient[]>();

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next([...this.ingredients]);
  }

  getIngredients(){
    return [...this.ingredients];
  }

  getIngredientsChanged(){
    this.ingredientsChanged.next([...this.ingredients]);
    return this.ingredientsChanged.asObservable();
  }

  addIngredients(ingredients: Ingredient[]){
      this.ingredients.push(...ingredients)
      this.ingredientsChanged.next([...this.ingredients]);
  }

  constructor() { }
}
