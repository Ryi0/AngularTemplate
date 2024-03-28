import {Component, OnInit} from '@angular/core';
import {BorderedDirective} from "../../../directives/bordered.directive";
import {ToolsService} from "../../../../tools.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-first-tool',
  standalone: true,
  imports: [
    BorderedDirective,
    NgForOf,
    NgIf
  ],
  template: `
    <div appBordered [myTitle]="ToolName" class="divSize5">
      <h1>Cool tool number one</h1>

      <div class=" flex AlignStartReg">
        <h2>Count by attribute : </h2>
        <div *ngFor="let pairMessage of AttributeMapToKVPair()">
          {{ pairMessage }}
        </div>
      </div>

      <div class=" flex AlignStartReg">
        <h2>Count by names : </h2>
        <div *ngFor="let pair of countMapEntries index as i">
            {{ pair[0] }} : {{ pair[1] }}
        </div>
      </div>

    </div>
  `,
  styleUrl: './first-tool.component.scss'
})
export class FirstToolComponent implements OnInit{
  ngOnInit(): void {
  this.Initializer();
  }

  countMapEntries!: IterableIterator<[string, number]>;
  countByTheGroup = "";
  ToolName = "FirstToolComponent";
  attrTool = ToolsService.AttributeToolFactory(this.ToolName)
  Initializer(){
    this.attrTool.mainTool();
    console.log(this.attrTool.ListOfAttributes);
    this.countMapEntries = this.groupByCount("name").entries();
    console.log(this.allNames)
  }
  AttributeMapToString(){
    let message  = "";
    this.AttributeMapToKVPair().forEach(pair =>{
      message += pair + ", ";
    })
    return message;
  }
  AttributeMapToKVPair(){
    let kvPairs: string[] = [];
    this.attrTool.attributeCountMap.forEach((value:number, key: string) => {
      kvPairs.push(`Amount of ${key} items : ${value}`);
    });
    return kvPairs;
  }
  allNames = "";

  groupByCount(property:string){
    const countMap= ToolsService.GroupCount(property);
    if (countMap==undefined){
    return new Map<string, number>([["status", -404]]);
    }

    return countMap ;
  }
}

