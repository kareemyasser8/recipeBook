import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[appDropdown]',

})

export class DropDownDirective{

  @HostBinding('class.show') isOpen = false;

  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
  }
}
