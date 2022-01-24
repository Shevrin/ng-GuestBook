import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Data, Post } from './components/form/models/post';

@Injectable({
  providedIn: 'root',
})
export class DataserviceService {
  constructor(private http: HttpClient) {}

  public posts!: Data[];

  getPosts(): Observable<Data[]> {
    return this.http
      .get<Data[]>('https://jsonplaceholder.typicode.com/comments')
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  public postsSubject: BehaviorSubject<any> = new BehaviorSubject(
    this.getPosts()
  );
  public posts$: Observable<Data[]> = this.postsSubject.asObservable();
}
