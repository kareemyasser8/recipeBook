import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex : number;
  editedItem : Ingredient;

  constructor(private slService: ShoppingListService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDelete(){
    this.onClear();
    this.slService.deleteIngredient(this.editedItemIndex);
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe({
      next: (index: number)=>{
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }


  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode == true){
      this.slService.updateIngredient(this.editedItemIndex,newIngredient);
      this.editMode = false;
    }else{
      this.slService.addIngredient(newIngredient);
    }
    form.reset();
  }



}
