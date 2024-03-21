import { Routes } from '@angular/router';
import {FirstToolComponent} from "./tools/tool-dir/first-tool/first-tool.component";
import {SecondToolComponent} from "./tools/tool-dir/second-tool/second-tool.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ToolSelectorComponent} from "./tools/tool-selector/tool-selector.component";
import {DataDashboardComponent} from "./data-dashboard/data-dashboard.component";

export const routes: Routes = [
  {path: '', component: ToolSelectorComponent},
  {path:'home', redirectTo:''},
  {path:'dashboard', component:DataDashboardComponent},
  {path: 'first-tool', component:FirstToolComponent},
  {path: 'second-tool', component:SecondToolComponent},
  {path: '**', component: PageNotFoundComponent}
];

export type RoutePath = 'first-tool' | 'second-tool'| 'home'|'dashboard';


//always make sure the routes are set in the type to ensure smooth and easy routing
