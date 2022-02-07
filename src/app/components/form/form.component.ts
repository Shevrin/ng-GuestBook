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
  public notEditable: boolean = true;

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  public ngOnInit(): void {
    this.initForm();
    this.loading$ = this.dataService.loading$;
    this.editPost$.subscribe((post) => {
      if (Object.keys(post).length) {
        this.notEditable = false;
        this.form.controls['name'].setValue(post['name']);
        this.form.controls['body'].setValue(post['body']);
      }
    });
  }

  public initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/[а-яА-Я]|\w/)]],
      body: ['', [Validators.required, Validators.pattern(/[а-яА-Я]|\w/)]],
    });
  }

  public isControlValid(controlName: string): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && control.touched;
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
    }
  }

  public saveChanges(): void {
    const controls = this.form.controls;
    if (this.form.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
    } else {
      this.dataService.saveEdit(this.form.value);
      this.cancelChanges();
    }
  }

  public cancelChanges(): void {
    this.notEditable = true;
    this.form.reset();

    this.dataService.cancelEdit();
    this.form.controls['name'].markAsUntouched();
    this.form.controls['body'].markAsUntouched();
  }
}
