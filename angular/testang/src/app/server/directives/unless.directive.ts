import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appUnless]',
})
export class UnlessDirective implements OnInit {
  // should be same as selector
  // better to use onChanges lifehook if listening to input changes
  // as setter wont trigger for any change
  @Input() set appUnless(condition: boolean) {
    if (!this.appUnless) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {}
}
