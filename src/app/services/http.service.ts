import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Data } from '../components/form/models/post';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public errorMessage: string = '';
  public posts: Data[] = [];

  constructor(private http: HttpClient, private dataService: DataService) {}

  getPosts() {
    this.http
      .get<Data[]>('https://jsonplaceholder.typicode.com/comments')
      .pipe(
        catchError((err) => {
          this.errorMessage = err.message;
          console.log(err.message);
          console.log(throwError(err));
          return [];
        })
      )
      .subscribe((posts) => {
        this.posts = posts;
        this.dataService.postsSubject$.next(this.posts);
      });
  }
}
