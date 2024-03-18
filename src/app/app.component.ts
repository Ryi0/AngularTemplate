import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ToolSelectorComponent} from "./tools/tool-selector/tool-selector.component";
import {BorderedDirective} from "./directives/bordered.directive";
import {RouteOnClickDirective} from "./directives/route-on-click.directive";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolSelectorComponent, BorderedDirective, RouteOnClickDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'workspace';
}
