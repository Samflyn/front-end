import { Directive, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBasicDirective]',
})
export class BasicDirectiveDirective implements OnInit {
  constructor(private elementReference: ElementRef) {}

  ngOnInit(): void {
    this.elementReference.nativeElement.style.background = 'grey';
    this.elementReference.nativeElement.style.color = 'white';
  }
}
