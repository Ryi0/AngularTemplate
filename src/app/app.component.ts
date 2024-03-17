import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ToolSelectorComponent} from "./tools/tool-selector/tool-selector.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'workspace';
}
