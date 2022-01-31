import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, skip, take } from 'rxjs';
import { Data } from '../components/form/models/post';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public paginatorPage: Data[] = [];

  constructor() {}

  public postsSubject$: BehaviorSubject<Data[]> = new BehaviorSubject(
    [] as Data[]
  );
  public posts$: Observable<Data[]> = this.postsSubject$.asObservable();

  public getPageItems(pageIndex: number, pageSize: number) {
    this.posts$.subscribe((data) => {
      let startIndex = pageIndex * pageSize;
      let items = pageSize + pageIndex * pageSize;
      this.paginatorPage = data.slice(startIndex, items);
    });
  }
}
