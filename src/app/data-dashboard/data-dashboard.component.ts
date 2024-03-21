import {Component, signal} from '@angular/core';
import {BorderedDirective} from "../directives/bordered.directive";
import {NgForOf, NgIf} from "@angular/common";
import {RouteOnClickDirective} from "../directives/route-on-click.directive";
import {ObjectCreatorFormComponent} from "./object-creator-form/object-creator-form.component";
import {ObjectTypes} from "../data/object-types";
import {ToolsService} from "../../tools.service";

@Component({
  selector: 'app-data-dashboard',
  standalone: true,
  imports: [
    BorderedDirective,
    NgForOf,
    RouteOnClickDirective,
    ObjectCreatorFormComponent,
    NgIf
  ],
  template: `

    <div appBordered [myTitle]="name" class="divSize5 flex AlignStartRev">
      <div appBordered myTitle="Database" class="divSize5 heightMax">
        <div class="gridContainer">
          <div class="dataGrid">
            <ng-container *ngFor="let obj of ToolsService.Db.ObjList">
              <div class="objTile">
                <h2>{{ToolsService.getTypeOfObject(obj)}}</h2>
              <h3>Name : {{ obj.name }} </h3>
                <h3>Id : {{ obj.id }}</h3>
                <ng-container *ngIf="ToolsService.IsEngine(obj)">
                  MAX RPM : {{ToolsService.GetRpm(obj)}}
                </ng-container>
              </div>
            </ng-container>
          </div>
        </div>
      </div>
      <div class="divSize3">
        <div class="typesGrid">
          <ng-container *ngFor="let type of ToolsService.Db.GetAllObjectTypes()">
            <div class="tile" (click)="SetSelectedType(type)">
              {{ type }}
            </div>
          </ng-container>
        </div>
      </div>
      <app-object-creator-form [type]="selectedType()"></app-object-creator-form>

    </div>

  `,
  styleUrl: './data-dashboard.component.scss'
})
export class DataDashboardComponent {
  selectedType  = signal<ObjectTypes>(ObjectTypes.Chair);
  logTools(){
    console.log(ToolsService.Db.ObjectCountSignal())
    console.log(ToolsService.Db.ObjList);
  }
  name =  "Data Dashboard";
  tmpType:ObjectTypes = ObjectTypes.GasEngine

  SetSelectedType(type:ObjectTypes){
    this.selectedType.set(type);
    console.log(this.selectedType());
    console.log(ToolsService.Db.ObjList)
  }


  protected readonly ToolsService = ToolsService;
  protected readonly ObjectTypes = ObjectTypes;
}
