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
    .wrap{
      transition: 250ms;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      /*background-color: red;*/
    }
    .wrap:hover{
        background-color: black ;
        color: white;
    }
    .selected{
      width: 100%;
      height: 100%;
      background-color: #20639B;
      color: white;
    }
    .selected:hover{
      background-color: #20639B;
    }
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
