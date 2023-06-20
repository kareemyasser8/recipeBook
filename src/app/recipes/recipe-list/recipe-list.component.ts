import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeClicked = new EventEmitter<Recipe>();

   recipes: Recipe[] = [
    new Recipe('A Test Recipe','This is simple a test', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
    new Recipe('A Test Recipe2','This is simple a test2', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg')
  ];

  constructor() { }

  ngOnInit(): void {

  }

  onRecipeClicked(recipe:Recipe){
    this.recipeClicked.emit(recipe);
  }

}
