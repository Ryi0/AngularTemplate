import {Component} from '@angular/core';
import {BorderedDirective} from "../directives/bordered.directive";
import {NgForOf} from "@angular/common";
import {RouteOnClickDirective} from "../directives/route-on-click.directive";
import {ObjectCreatorFormComponent} from "./object-creator-form/object-creator-form.component";
import {ObjectTypes} from "../data/object-types";

@Component({
  selector: 'app-data-dashboard',
  standalone: true,
  imports: [
    BorderedDirective,
    NgForOf,
    RouteOnClickDirective,
    ObjectCreatorFormComponent
  ],
  template: `
    <div appBordered [myTitle]="name" class="divSize5">
        <button>MY ACTION TESTER</button>
      <app-object-creator-form [type]="tmpType"></app-object-creator-form>
    </div>
  `,
  styleUrl: './data-dashboard.component.scss'
})
export class DataDashboardComponent {
  name =  "Data Dashboard";
  tmpType:ObjectTypes = ObjectTypes.GasEngine
}
