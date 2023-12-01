import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipess',
  templateUrl: './pipess.component.html',
  styleUrls: ['./pipess.component.css'],
})
export class PipessComponent implements OnInit {
  constructor() {}
  // pipes are responsible to manipulate only the output in the template

  data = {
    toUpper: 'This to upper',
    date: new Date(),
  };

  textData = ['one', 'two', 'three', 'three', 'three', 'two', 'one'];

  filterText = '';

  asyncData = new Promise<string>((resolve, rejct) => {
    setTimeout(() => {
      resolve('Works...');
    }, 2000);
  });

  ngOnInit(): void {}

  addText(): void {
    this.textData.push('one');
  }
}
