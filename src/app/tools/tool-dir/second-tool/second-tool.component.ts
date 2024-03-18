import { Component } from '@angular/core';
import {BorderedDirective} from "../../../directives/bordered.directive";

@Component({
  selector: 'app-second-tool',
  standalone: true,
  imports: [
    BorderedDirective
  ],
  templateUrl: './second-tool.component.html',
  styleUrl: './second-tool.component.scss'
})
export class SecondToolComponent {
  ToolName: string = 'SecondToolComponent';
}
