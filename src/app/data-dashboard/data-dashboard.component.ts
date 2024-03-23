import {Component, WritableSignal, signal} from '@angular/core';
import {BorderedDirective} from "../directives/bordered.directive";
import {NgForOf, NgIf} from "@angular/common";
import {RouteOnClickDirective} from "../directives/route-on-click.directive";
import {ObjectCreatorFormComponent} from "./object-creator-form/object-creator-form.component";
import {ObjectTypes} from "../data/object-types";
import {ToolsService} from "../../tools.service";
import {OTypeComponent} from "./otype/otype.component";
import {DataServingService} from "../data-serving.service";
import {HttpClientModule} from "@angular/common/http";
import {InterfaceObject} from "../data/i-object";

@Component({
  selector: 'app-data-dashboard',
  standalone: true,
  imports: [
    BorderedDirective,
    NgForOf,
    RouteOnClickDirective,
    ObjectCreatorFormComponent,
    NgIf,
    OTypeComponent,
    HttpClientModule
  ],
  template: `
    <button (click)="dataHandler()">Test Data Serving</button>
    <button (click)="deleteAllClickHandler()">\\ ! / Delete all \\ ! /</button>
    <button (click)="logDbData()">Log db data</button>
    <div appBordered [myTitle]="name" class="divSize5 flex AlignStartRev">
      <div appBordered myTitle="Database" class="divSize5 heightMax">
        <div class="gridContainer">

          <div class="dataGrid">
            <ng-container *ngFor="let obj of ToolsService.Db.displayData">
              <div (click)="DbItemClickHandler(obj)" class="objTile">
                <h2>{{ToolsService.getTypeOfObject(obj)}}</h2>
                <h3>Name : {{ obj.name }} </h3>
                <p>Id : {{ obj.id }}</p>
                <ng-container *ngIf="ToolsService.IsEngine(obj)">
                  MAX RPM : {{ToolsService.GetRpm(obj)}}
                </ng-container>
              </div>
            </ng-container>
          </div>
        </div>
      </div>
      <div class="divSize1 flex" style="flex-direction: column; width: 100%; height: 15% " >
<!--        <h2>Selected Type : {{selectedType()}}</h2>-->
      <div class="divSize5">
        <div class="typesGrid">
          <ng-container *ngFor="let type of ToolsService.Db.GetAllObjectTypes() index as i ">
              <app-otype (click)="TypeClickHandler(type, i)" [isSelected]="selectedFlagsArray[i]" [name]="type"></app-otype>
          </ng-container>
        </div>
      </div>
      </div>
      <app-object-creator-form [type]="selectedType()"></app-object-creator-form>
    <div>Selected ID(s) : {{selectedIdList()}} </div>
    </div>

  `,
  styleUrl: './data-dashboard.component.scss'
})
export class DataDashboardComponent {
  name =  "Data Dashboard";
  selectedIdList: WritableSignal<string> = signal("");
  selectedItemList:InterfaceObject[] = [];
  constructor(private dataService: DataServingService) { }
  dataHandler(){
    console.log("btn pressed")
    this.dataService.postToolServiceData().subscribe(res=>{
      console.log(res)
    });
  }
  logDbData(){
    this.dataService.GETRequestDataToolService().subscribe(value => {
      ToolsService.Db.serverData = value;
      ToolsService.Db.parseServerData();
      console.log(ToolsService.Db.serverData)
    });
  }
  deleteAllClickHandler(){
    console.log('DataToBeDeleted');
    this.dataService.deleteToolServiceData().subscribe()
  }
  selectedType  = signal<ObjectTypes>(ObjectTypes.Chair);
  selectedFlagsArray:boolean[] =  Array(ToolsService.Db.GetAllObjectTypes().length).fill(false)
  TypeClickHandler(type:ObjectTypes, index:number ){
    this.selectedFlagsArray.fill(false);
    this.selectedFlagsArray[index] = true;
    this.SetSelectedType(type);
  }

  DbItemClickHandler(Item:InterfaceObject){
    const id = Item.id;
    this.dataService.GETRequestDataToolById(id).subscribe(value => {
      console.log(value);
      this.selectedItemList.push((<InterfaceObject>value));
      console.log(this.selectedItemList);
      this.selectedIdList.update(value1 => {
       return value1 + " "+(<InterfaceObject>value).id
      })
    });
  }



  SetSelectedType(type:ObjectTypes){
    this.selectedType.set(type);
    console.log(this.selectedType());
    console.log(ToolsService.Db.ObjList)
  }



  protected readonly ToolsService = ToolsService;
  // protected readonly ObjectTypes = ObjectTypes;
}
