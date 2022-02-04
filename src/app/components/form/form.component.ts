import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Data } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public form!: FormGroup;
  public loading$!: Observable<any>;
  public editPost$: Observable<Data> = this.dataService.editable$;
  public editName!: string;
  public editBody!: string;
  public notEditable: boolean = true;

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  public ngOnInit(): void {
    this.initForm();
    this.loading$ = this.dataService.loading$;
    this.editPost$.subscribe((post) => {
      if (Object.keys(post).length) {
        this.notEditable = false;
        this.editName = post['name'];
        this.editBody = post['body'];
        // console.log(this.form.controls['name']);
        console.log(post['name']);
        // this.form.controls['name'] = post['name'];
        // this.form.controls['body'] = post['body'];
      }
    });
  }

  public initForm() {
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          // Validators.pattern(/[а-яА-Я]|\w/)
        ],
      ],
      body: [
        '',
        [
          Validators.required,
          // Validators.pattern(/[а-яА-Я]|\w/)
        ],
      ],
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
    } else {
      this.dataService.addPost(this.form.value);
      this.form.reset();
      // this.form.markAsUntouched();
      // this.form.markAsPristine();
      // console.log(this.form);
      // console.log(this.form.valid);
      // this.form.clearAsyncValidators();
      // this.form.clearValidators();
      // this.form.controls['name'];
      // let values = this.form.value;
      // this.form.setValue({ name: '', body: '' });
    }
  }

  public cancel() {
    this.notEditable = true;
    this.editName = '';
    this.editBody = '';
    this.dataService.cancelEdit();
  }
}
