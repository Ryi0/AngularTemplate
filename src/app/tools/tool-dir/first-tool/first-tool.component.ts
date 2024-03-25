import {Component, OnInit} from '@angular/core';
import {BorderedDirective} from "../../../directives/bordered.directive";
import {ToolsService} from "../../../../tools.service";

@Component({
  selector: 'app-first-tool',
  standalone: true,
  imports: [
    BorderedDirective
  ],
  template: `
    <div appBordered [myTitle]="ToolName" class="divSize5">
        <h1>Cool tool number one</h1>
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

}

