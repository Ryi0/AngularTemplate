import { Component } from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {BorderedDirective} from "../../directives/bordered.directive";
import {RouteOnClickDirective} from "../../directives/route-on-click.directive";
import {RouterLink} from "@angular/router";
import {RoutePath} from "../../app.routes";

@Component({
  selector: 'app-tool-selector',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    BorderedDirective,
    RouteOnClickDirective,
    RouterLink
  ],
  template: `

    <div appBordered [myTitle]="CompTitle" class="tool-selector " >
      <ng-container  *ngFor="let tool of tools">
      <div appRouteOnClick [route]="tool.route" class="tool-item">
        <i [ngClass]="tool.icon"></i>
        <span>{{ tool.name }}</span>
      </div>
      </ng-container>
    </div>


  `,
  styleUrl: './tool-selector.component.scss'
})
export class ToolSelectorComponent {
  CompTitle = 'Tool Selector';
  tools = [
    { name: 'Tool 1', icon: 'fas fa-toolbox', route:<RoutePath>"first-tool" },
    { name: 'Tool 2', icon: 'fas fa-wrench', route:<RoutePath>"second-tool"},
    // add all your tools here
  ];
}
