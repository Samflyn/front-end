import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-formss',
  templateUrl: './formss.component.html',
  styleUrls: ['./formss.component.css'],
})
export class FormssComponent implements OnInit {
  @ViewChild('form') formData: NgForm;
  defaultName = 'sam';
  email = '';
  genders = ['male', 'female'];
  reactiveForm: FormGroup;
  noUseName = ['samflynn', 'sammy'];

  constructor() {}

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.nameValidation.bind(this),
        ]),
        password: new FormControl(null, Validators.required),
      }),
      email: new FormControl(
        null,
        [Validators.required, Validators.email],
        this.emailValidation
      ),
      gender: new FormControl('male', Validators.required),
      toDo: new FormArray([]),
    });

    // this.reactiveForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });

    this.reactiveForm.statusChanges.subscribe((status) => {
      console.log(status);
    });

    // or setValue to set all values
    this.reactiveForm.patchValue({
      userData: {
        username: 'sam',
      },
    });
  }

  onSubmit(form: NgForm): void {
    console.log(form);
    console.log(form.value.userData);
    console.log(form.value.email);
    console.log(form.value.gender);
    // form.reset();
  }

  suggestData(): void {
    // should be the exact form as template
    // replaces data of entire form
    // this.formData.setValue({
    //   userData: { username: this.defaultName, password: 'sam' },
    //   email: 'test@test.com',
    //   gender: 'male',
    // });

    this.formData.form.patchValue({
      userData: {
        username: 'sam',
      },
    });
  }

  reactiveSubmit(): void {
    console.log(this.reactiveForm);
    this.reactiveForm.reset({ gender: 'female' }); // to set value after reset
    (this.reactiveForm.get('toDo') as FormArray).clear(); // to remove the formarray elements
    // (this.reactiveForm.get('toDo') as FormArray).reset(); // to reset formarray element data
  }

  addToDo(): void {
    (this.reactiveForm.get('toDo') as FormArray).push(
      new FormControl(null, Validators.required)
    );
  }

  public get controls(): AbstractControl[] {
    return (this.reactiveForm.get('toDo') as FormArray).controls;
  }

  // if validation is sucessful return null or just return
  nameValidation(control: FormControl): { [s: string]: boolean } {
    // indexof returns -1 if not found
    if (this.noUseName.indexOf(control.value) !== -1) {
      return { 'use other name': true };
    }
    // return null;
    return;
  }

  emailValidation(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailInUse: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
  }

  onDelete(i: number): void {
    (this.reactiveForm.get('toDo') as FormArray).removeAt(i);
  }
}
