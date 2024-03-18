import {Directive, HostListener, Input} from '@angular/core';
import {Router} from "@angular/router";
import {RoutePath} from "../app.routes";

@Directive({
  selector: '[appRouteOnClick]',
  standalone: true
})
export class RouteOnClickDirective {
  @Input({required:true}) route!: RoutePath
  constructor(private router:Router) { }
  @HostListener('click')
  navigate(){
    this.router.navigate([this.route])
  }

}
