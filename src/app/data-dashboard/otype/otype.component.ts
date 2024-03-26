import {Component, input, Input, signal} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-otype',
  standalone: true,
  imports: [
    NgClass
  ],
  template: `
    <div  class="wrap" [ngClass]="{'selected':isSelected()}">
        {{name}}
    </div>
  `,
  styles: `

  `
})
export class OTypeComponent {
  @Input({required: true}) name!: string;
  isSelected = input<boolean>()

  // private SetSelected(){
  //   this.isSelected.set(true)
  // }
  // private UnsetSelected(){
  //   this.isSelected.set(false);
  // }
  // public ClickHandler(){
  //   if (!this.isSelected()){
  //     this.SetSelected()
  //   }
  //   else {
  //   this.UnsetSelected()
  //   }
  // }
}
