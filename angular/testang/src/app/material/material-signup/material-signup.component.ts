import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-material-signup',
  templateUrl: './material-signup.component.html',
  styleUrls: ['./material-signup.component.css'],
})
export class MaterialSignupComponent implements OnInit {
  maxDate: Date;

  constructor() {}

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log(form);
    }
  }
}
