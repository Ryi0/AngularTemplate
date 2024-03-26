import {Component, Input} from '@angular/core';
import {ObjectTypes} from "../../data/object-types";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ObjectFactory} from "../../data/object-factory";
import {BorderedDirective} from "../../directives/bordered.directive";
import {ToolsService} from "../../../tools.service";
import {NgClass, NgIf} from "@angular/common";
import {Engine} from "../../data/engine";

@Component({
  selector: 'app-object-creator-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BorderedDirective,
    NgIf,
    NgClass
  ],
  template: `
    <form class=" form" [formGroup]="myForm" (ngSubmit)="submitForm()" autocomplete="off">
      <div appBordered myTitle="Name" style="padding:5px">
      <input id="name" type="text" formControlName="name">
      </div>
      <div appBordered myTitle="Attribute"  style="padding:5px">
        <input id="attribute" type="text" formControlName="attribute">
      </div>

        <div  [ngClass]="{'invisible':!(type === ObjectTypes.ElectricEngine || type === ObjectTypes.GasEngine)}" appBordered myTitle="Rpm" style="padding:5px">
          <input [attr.readonly]="!(type === ObjectTypes.ElectricEngine || type === ObjectTypes.GasEngine)?true:null" id="rpm" type="text" formControlName="rpm">
        </div>

      <button type="submit">Submit</button>
    </form>
  `,
  styles: `
    :host{
      padding: 0 0 .5ch 0;
      height: fit-content;
    }
    div{
      transition: 200ms;
    }
    .invisible{
      opacity: 0;
      tab-index: -1;
      pointer-events: none;
    }
  `
})
export class ObjectCreatorFormComponent {
  of = ObjectFactory;

  @Input({required: true}) type!: ObjectTypes;
  myForm = new FormGroup({
    name: new FormControl(''),
    attribute: new FormControl(''),
    rpm: new FormControl('500'),
  });
  submitForm() {
    if (this.type===ObjectTypes.ElectricEngine || this.type=== ObjectTypes.GasEngine){
      const newObj = this.of.createObject(this.type, <string>this.myForm.value.name, this.myForm.value.attribute);

      this.of.setRpm(newObj, Number(this.myForm.value.rpm));
      console.log((<Engine>newObj).maxRpm)
      console.log(newObj);
      ToolsService.Db.add(newObj);
    }

    else {
     const newObj = this.of.createObject(this.type, <string>this.myForm.value.name, this.myForm.value.attribute);
      console.log(newObj);
      ToolsService.Db.add(newObj);
  }

  }

  protected readonly ObjectTypes = ObjectTypes;
}
