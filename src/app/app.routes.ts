import { Routes } from '@angular/router';
import {FirstToolComponent} from "./tools/tool-dir/first-tool/first-tool.component";
import {SecondToolComponent} from "./tools/tool-dir/second-tool/second-tool.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ToolSelectorComponent} from "./tools/tool-selector/tool-selector.component";

export const routes: Routes = [
  {path: '', component: ToolSelectorComponent},
  {path:'home', redirectTo:''},
  {path: 'first-tool', component:FirstToolComponent},
  {path: 'second-tool', component:SecondToolComponent},
  {path: '**', component: PageNotFoundComponent}
];

export type RoutePath = 'first-tool' | 'second-tool'| 'home';
