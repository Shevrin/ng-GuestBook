import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public form!: FormGroup;
  public tyu: any;
  public loading$!: Observable<any>;
  loadIco = faSpinner;

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.dataService.selfPosts$.subscribe((data) => {
      console.log(data);
      this.tyu = data;
    });
  }

  public ngOnInit(): void {
    this.initForm();
    this.loading$ = this.dataService.loading$;
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
}
