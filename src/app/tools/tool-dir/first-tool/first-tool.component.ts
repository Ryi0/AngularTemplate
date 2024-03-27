import {Component, OnInit} from '@angular/core';
import {BorderedDirective} from "../../../directives/bordered.directive";
import {ToolsService} from "../../../../tools.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-first-tool',
  standalone: true,
  imports: [
    BorderedDirective,
    NgForOf
  ],
  template: `
    <div appBordered [myTitle]="ToolName" class="divSize5">
      <h1>Cool tool number one</h1>

        <div class=" flex AlignStartReg">
          <h2>Count by attribute : </h2>
            <div *ngFor="let pair of AttributeMapToKVPair()">
              {{pair}}
            </div>
        </div>

      <div class=" flex AlignStartReg">
        <h2>Count by names : </h2>
        <div *ngFor="let pair of AttributeMapToKVPair()">
          {{pair}}
        </div>
      </div>

        </div>
  `,
  styleUrl: './first-tool.component.scss'
})
export class FirstToolComponent implements OnInit{
  ngOnInit(): void {
  this.test();
  }
  ToolName = "FirstToolComponent";
  attrTool = ToolsService.AttributeToolFactory(this.ToolName)
  test(){
    this.attrTool.mainTool();
    console.log(this.attrTool.ListOfAttributes);
    // console.log(this.attrTool.AllAssignedAttributes);
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
}

