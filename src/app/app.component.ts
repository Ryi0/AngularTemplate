import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ToolSelectorComponent} from "./tools/tool-selector/tool-selector.component";
import {BorderedDirective} from "./directives/bordered.directive";
import {RouteOnClickDirective} from "./directives/route-on-click.directive";
import {DataServingService} from "./data-serving.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolSelectorComponent, BorderedDirective, RouteOnClickDirective, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[DataServingService]
})
export class AppComponent {

  title = 'workspace';
}
