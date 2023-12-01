import { Component, Injector, OnInit } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { DomSanitizer } from '@angular/platform-browser';
import { InsideElementsComponent } from './inside-elements/inside-elements.component';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css'],
})
export class ElementsComponent implements OnInit {
  content = null;
  constructor(private injector: Injector, private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // this.content = '<p>This Works!!!</p>';
    // this won't work as it will be recognized as html code but not as an angular component
    // angular won't run this as the html is already been rendered
    // this.content = '<app-inside-elements></app-inside-elements>';

    const insideElement = createCustomElement(InsideElementsComponent, {
      injector: this.injector,
    });
    customElements.define('inside-elements', insideElement);
    // since this is dynamically created for angular 8 or below add the component to entryComponents
    this.content = this.domSanitizer.bypassSecurityTrustHtml(
      '<inside-elements message="This worrks!!!"></inside-elements>'
    );
  }
}
