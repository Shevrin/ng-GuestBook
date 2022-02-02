import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BACKEND_BASE_DOMAIN } from 'src/environments/baseVackendUrl';
import { Data } from '../models/post';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public errorMessage: string = '';
  // public posts: Data[] = [];

  public getPosts() {
    return this.http.get<Data[]>(BACKEND_BASE_DOMAIN).pipe(
      catchError((err) => {
        this.errorMessage = err.message;
        console.log(err.message);
        return [];
      })
    );
  }

  public addPosts(post: any) {
    return this.http.post<Data[]>(BACKEND_BASE_DOMAIN, {
      body: post,
    });
  }
}
