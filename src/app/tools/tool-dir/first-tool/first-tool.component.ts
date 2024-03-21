import { Component } from '@angular/core';
import {BorderedDirective} from "../../../directives/bordered.directive";

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
export class FirstToolComponent {
  ToolName = "FirstToolComponent";

}
