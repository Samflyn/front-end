import {
  Directive,
  OnInit,
  ElementRef,
  Renderer2,
  HostListener,
  HostBinding,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appBetterDirective]',
})
export class BetterDirectiveDirective implements OnInit {
  @Input() defaultColor = 'transparent';

  @Input() highlightColor = 'blue';

  @HostBinding('style.backgroundColor') backgroundColor = 'transparent';

  constructor(private eleRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseover(event: Event): void {
    // this.renderer.setStyle(
    //   this.eleRef.nativeElement,
    //   'background-color',
    //   'blue'
    // );
    // this.renderer.setStyle(this.eleRef.nativeElement, 'color', 'white');
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(event: Event): void {
    // this.renderer.setStyle(
    //   this.eleRef.nativeElement,
    //   'background-color',
    //   'transparent'
    // );
    // this.renderer.setStyle(this.eleRef.nativeElement, 'color', 'black');
    this.backgroundColor = this.defaultColor;
  }
}
