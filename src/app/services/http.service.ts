import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BACKEND_BASE_DOMAIN } from 'src/environments/baseVackendUrl';
import { Data } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public errorMessage: string = '';

  constructor(private http: HttpClient) {}

  public getPosts(): Observable<Data[]> {
    return this.http.get<Data[]>(BACKEND_BASE_DOMAIN).pipe(
      catchError((err) => {
        this.errorMessage = err.message;
        console.log(err.message);
        return [];
      })
    );
  }

  public addPosts(post: Data): Observable<Data[]> {
    return this.http.post<Data[]>(BACKEND_BASE_DOMAIN, {
      body: post,
    });
  }

  public delPosts(post: Data): Observable<Data[]> {
    return this.http.post<Data[]>(BACKEND_BASE_DOMAIN, {
      body: post,
    });
  }

  public putPosts(post: Data, idx: number): Observable<Data[]> {
    return this.http.post<Data[]>(BACKEND_BASE_DOMAIN, {
      body: post,
      id: idx,
    });
  }
}
