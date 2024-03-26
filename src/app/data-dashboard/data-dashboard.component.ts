import {Component, WritableSignal, signal, computed} from '@angular/core';
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
import {askConfirmation} from "@angular/cli/src/utilities/prompt";

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
    <button (click)="dataHandler()">Serve Data</button>
    <button id="deleteButt" (click)="deleteAllClickHandler()">\\ ! / Delete all \\ ! /</button>
    <button (click)="logDbData()">Load Server Data</button>
    <button (click)="StoreDataLocally()">Cache Server Data</button>
    <div appBordered [myTitle]="name" class="divSize5 flex AlignStartRev">
      <div id="db" appBordered myTitle="Database" class="divSize5 heightMax">
        <div class="dbBorder">
        <div class="gridContainer">
          <div class="dataGrid">
            <ng-container *ngFor="let obj of ToolsService.Db.displayData index as humanReadableObjectId">
              <div [id]="'dbDivItemId'+obj.id" (click)="DbItemClickHandler(obj)" class="objTile">
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
      <div style="margin-bottom: 10px"> <p> Selected ID(s) : {{selectedIdList()}} </p> </div>
      <button (click)="SendSelectionToLocalDb()">Confirm Selection</button>
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
      // console.log(ToolsService.Db.serverData)
    });
  }
  deleteAllClickHandler(){
    const decision = confirm(`Are you sure you want to delete ${ToolsService.Db.serverData.length} documents from the Database?`);
    if (!decision){
      return;
    }
    console.log('DataToBeDeleted');
    this.dataService.deleteToolServiceData().subscribe();
    alert();
    confirm();

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
    let tmpIndex;
    if (this.selectedItemList.find((value1, index) => {
      tmpIndex = index;
      return value1.id === Item.id;
    })!==undefined){
      console.log("this item is selected");
      this.selectedItemList.splice(tmpIndex!, 1);
      this.selectedIdList.update(value => {
        let message:string = "";
        const uVal= this.selectedItemList.flatMap(value1 => {
          return value1.id;
        });
        uVal.forEach(value2 => {
          message += value2+" "
        })
        return message;
      })
      /*TODO:[make a component for the item tiles to simplify a lot of this code or
         at the very least, not use document methods]*/
      const element = document.getElementById(`dbDivItemId${id}`);
      if (element){
        element.classList.remove("selected");
      }
      return;
    }
    this.dataService.GETRequestDataToolById(id).subscribe(value => {
      console.log(value);
      this.selectedItemList.push((<InterfaceObject>value));
      console.log(this.selectedItemList);
      this.selectedIdList.update(value1 => {
        const element = document.getElementById(`dbDivItemId${id}`);
        if (element){
          element.classList.add("selected");
        }
        console.log(element)
        let message:string = "";
        const uVal= this.selectedItemList.flatMap(value1 => {
          return value1.id;
        });
         uVal.forEach(value2 => {
           message += value2+" "
         })
        return message;
      })

    });

  }


  SendSelectionToLocalDb(){
    ToolsService.Db.parseSelectionData(this.selectedItemList);
    alert(`Selected ${ToolsService.Db.SelectedItems().length} Items`)
    console.log(ToolsService.Db.serverData);
    console.log(ToolsService.Db.displayData);
    console.log(ToolsService.Db.ObjList)
    console.log(ToolsService.Db.SelectedItems())
  }

  StoreDataLocally(){
    ToolsService.Db.StoreServerDataLocally();
    console.log(ToolsService.Db.ObjList)
  }
  SetSelectedType(type:ObjectTypes){
    this.selectedType.set(type);
    console.log(this.selectedType());
    console.log(ToolsService.Db.ObjList)
  }



  protected readonly ToolsService = ToolsService;
  // protected readonly ObjectTypes = ObjectTypes;
}
