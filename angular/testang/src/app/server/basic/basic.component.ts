import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css'],
})
export class BasicComponent implements OnInit {
  name = 'sam';

  lists = [1, 1, 1, 1];

  inputStatus = false;

  @Input() fromServer: string;

  isIt(): boolean {
    return true;
  }

  isOn(): void {
    this.inputStatus = true;
  }

  onInput(): void {
    this.isOn();
  }

  offInput(): void {
    this.inputStatus = false;
  }

  getColor(): string {
    return 'blue';
  }

  otherColor(): string {
    return 'purple';
  }

  fromServerM(data): void {
    console.log(data);
  }

  constructor() {}

  ngOnInit(): void {}
}
