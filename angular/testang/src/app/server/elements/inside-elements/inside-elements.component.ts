import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-inside-elements',
  templateUrl: './inside-elements.component.html',
  styleUrls: ['./inside-elements.component.css'],
})
export class InsideElementsComponent implements OnInit {
  @Input() message: string;

  constructor() {}

  ngOnInit(): void {}
}
