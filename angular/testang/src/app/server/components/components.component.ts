import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
  ContentChild,
  ViewChildren,
  QueryList,
  AfterContentInit,
} from '@angular/core';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css'],
})
export class ComponentsComponent implements OnInit {
  // constructor() { }

  // ngOnInit(): void {
  // }

  // to make it listenable from outside
  @Output() appCalled = new EventEmitter<{ name: string; age: number }>();

  // to make it bindable from outside
  // @Input('ele') element: number;
  @Input() element: number;

  // to access local reference directly
  // static: true should be only in ngOnInit
  // can be accessed from ngAfterViewInit
  // to fix error Expression has changed after it was last checked
  // change the value in ngAfterContentInit or call ChangeDetectorRef.detectChanges()
  @ViewChild('newAddress', { static: true }) newAddress: ElementRef;

  // for multiple elements
  @ViewChildren('') newAddressess: QueryList<string>;

  // to get access to ng-content
  @ContentChild('paragraph', { static: true }) paragraph: ElementRef;

  @Output() toServer = new EventEmitter<string>();

  onAppCall(): void {
    this.appCalled.emit({ name: 'sam', age: 1 });
  }

  getAddress(address: HTMLInputElement): void {
    console.log(address.value);
  }

  getNewAddress(): void {
    console.log(this.newAddress.nativeElement.value);
  }

  sendToServer(data: HTMLInputElement): void {
    this.toServer.emit(data.value);
  }

  constructor() {
    console.log('constructor called!');
  }

  ngOnInit(): void {
    console.log('ngOnInit called!');
    console.log('new address', this.newAddress.nativeElement.value);
    // console.log('paragraph', this.paragraph.nativeElement.textContent);
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('ngOnChanges called!');
  //   console.log(changes);
  // }

  // // runs for everything
  // // ngDoCheck() {
  // //   console.log('ngDoCheck called!');
  // // }

  // ngAfterContentInit(): void {
  //   console.log('ngAfterContentInit called!');
  //   console.log('paragraph', this.paragraph.nativeElement.textContent);
  // }

  // ngAfterContentChecked(): void {
  //   console.log('ngAfterContentChecked called!');
  // }

  // ngAfterViewInit(): void {
  //   console.log('ngAfterViewInit called!');
  // console.log('new address', this.newAddress.nativeElement.textContent);
  // }

  // ngAfterViewChecked(): void {
  //   console.log('ngAfterViewChecked called!');
  // }

  // ngOnDestroy(): void {
  //   console.log('ngOnDestroy called!');
  // }
}
