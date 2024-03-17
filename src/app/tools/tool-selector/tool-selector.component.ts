import { Component } from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-tool-selector',
  standalone: true,
  imports: [
    NgClass,
    NgForOf
  ],
  template: `
    <div class="tool-selector">
      <div class="tool-item" *ngFor="let tool of tools">
        <i [ngClass]="tool.icon"></i>
        <span>{{tool.name}}</span>
      </div>
    </div>`,
  styleUrl: './tool-selector.component.scss'
})
export class ToolSelectorComponent {
  tools = [
    { name: 'Tool 1', icon: 'fas fa-toolbox' },
    { name: 'Tool 2', icon: 'fas fa-wrench' },
    // add all your tools here
  ];
}
