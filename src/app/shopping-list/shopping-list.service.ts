import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {

  private ingredients : Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  private ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  getIngredient(index: number){
    return this.ingredients[index];
  }

  updateIngredient(index: number, ingredient: Ingredient){
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next([...this.ingredients]);
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next([...this.ingredients]);
  }

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
