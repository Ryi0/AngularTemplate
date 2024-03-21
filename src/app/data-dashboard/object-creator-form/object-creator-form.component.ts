import {Component, Input} from '@angular/core';
import {ObjectTypes} from "../../data/object-types";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ObjectFactory} from "../../data/object-factory";
import {BorderedDirective} from "../../directives/bordered.directive";

@Component({
  selector: 'app-object-creator-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BorderedDirective
  ],
  template: `
    <form class="form" [formGroup]="myForm" (ngSubmit)="submitForm()" autocomplete="off">
      <div appBordered myTitle="Name" style="padding:5px">
      <input id="name" type="text" formControlName="name">
      </div>
      <div appBordered myTitle="Attribute"  style="padding:5px">
        <input id="attribute" type="text" formControlName="attribute">
      </div>

      <button type="submit">Submit</button>
    </form>
  `,
  styles: `

  `
})
export class ObjectCreatorFormComponent {
  of = ObjectFactory;

  @Input({required: true}) type!: ObjectTypes;
  myForm = new FormGroup({
    name: new FormControl(''),
    attribute: new FormControl(''),
  });
  submitForm() {
    if (this.type===ObjectTypes.ElectricEngine || this.type=== ObjectTypes.GasEngine){
      const newObj = this.of.createObject(this.type, <string>this.myForm.value.name, this.myForm.value.attribute);

    this.of.setRpm(newObj,50);
      console.log(newObj);
    }

    else {
     const newObj = this.of.createObject(this.type, <string>this.myForm.value.name, this.myForm.value.attribute);
      console.log(newObj);
  }
  }

}
