import {Directive, ElementRef, Input, input, InputSignal, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appBordered]',
  standalone: true
})
export class BorderedDirective implements OnInit{
  @Input({required:true}) myTitle!: string;
  constructor(private el: ElementRef, private renderer: Renderer2) {
    renderer.addClass(el.nativeElement, 'custBordered');

  }

  ngOnInit(): void {
    this.el.nativeElement.setAttribute('data-title', this.myTitle);
    }

}
