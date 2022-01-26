import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Data } from '../components/form/models/post';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  pageIndex: number = 0;
  pageSize: number = 500;
  p: Data[] = [];
  constructor() {}

  public postsSubject$: BehaviorSubject<Data[]> = new BehaviorSubject(
    [] as Data[]
  );
  public posts$: Observable<Data[]> = this.postsSubject$.asObservable();


}


