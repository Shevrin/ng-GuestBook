import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm() {
    this.form = this.fb.group({
      name: [[null], [Validators.required, Validators.pattern(/[а-яА-Я]|\w/)]],
      body: [[null], [Validators.required, Validators.pattern(/[а-яА-Я]|\w/)]],
    });
  }

  public isControlValid(controlName: string): boolean {
    const control = this.form.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  public onSubmit(): void {
    const controls = this.form.controls;
    if (this.form.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    } else {
      // console.log(JSON.stringify(this.form.value));
      // console.log(this.form.value);

      // this.dataService.addComment(JSON.stringify(this.form.value));
      this.dataService.addPost(this.form.value);
    }
  }
}
