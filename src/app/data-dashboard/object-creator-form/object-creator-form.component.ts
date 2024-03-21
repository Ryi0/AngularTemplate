import {Component, Input} from '@angular/core';
import {ObjectTypes} from "../../data/object-types";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ObjectFactory} from "../../data/object-factory";
import {BorderedDirective} from "../../directives/bordered.directive";
import {ToolsService} from "../../../tools.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-object-creator-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BorderedDirective,
    NgIf
  ],
  template: `
    <form class=" form" [formGroup]="myForm" (ngSubmit)="submitForm()" autocomplete="off">
      <div appBordered myTitle="Name" style="padding:5px">
      <input id="name" type="text" formControlName="name">
      </div>
      <div appBordered myTitle="Attribute"  style="padding:5px">
        <input id="attribute" type="text" formControlName="attribute">
      </div>
      <ng-container *ngIf="type === ObjectTypes.ElectricEngine || type === ObjectTypes.GasEngine">
        <div appBordered myTitle="Rpm" style="padding:5px">
          <input id="rpm" type="text" formControlName="rpm">
        </div>
      </ng-container>
      <button type="submit">Submit</button>
    </form>
  `,
  styles: `
    :host{
      padding: 0 0 2rem 0;
      height: fit-content;
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

    this.of.setRpm(newObj,50);
      console.log(newObj);
      ToolsService.Db.add(newObj);
    }

    else {
     const newObj = this.of.createObject(this.type, <string>this.myForm.value.name, this.myForm.value.attribute);
      console.log(newObj);
  }
  }

  protected readonly ObjectTypes = ObjectTypes;
}
