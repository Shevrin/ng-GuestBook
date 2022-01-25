import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Data } from '../components/form/models/post';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  errorMessage: string = '';
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Data[]> {
    return this.http
      .get<Data[]>('https://jsonplaceholder.typicode.com/comments')
      .pipe(
        catchError((err) => {
          this.errorMessage = err.message;
          console.log(err.message);
          console.log(throwError(err));
          return [];
        })
      );
  }
}
