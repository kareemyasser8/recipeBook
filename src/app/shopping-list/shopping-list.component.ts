import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];
  subsciption: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.subsciption = this.slService.getIngredientsChanged().subscribe({
      next: (ingrdientsStored: Ingredient[]) => {
        this.ingredients = ingrdientsStored;
        console.log("ingrediensStored:  " + ingrdientsStored)
      },
      error: (err)=> {console.log(err)}
    })
  }

  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy(): void{
    if(this.subsciption){ this.subsciption.unsubscribe()}
  }



}
