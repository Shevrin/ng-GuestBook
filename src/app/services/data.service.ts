import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Data } from '../components/form/models/post';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  errorMessage: string = '';
  constructor(private httpService: HttpService) {}

  public posts!: Data[];

  // this.httpService.getPosts()

  public postsSubject: BehaviorSubject<Data[]> = new BehaviorSubject(
    [] as Data[]
  );

  public posts$: Observable<Data[]> = this.postsSubject.asObservable();
}
