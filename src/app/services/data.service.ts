import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, skip, take } from 'rxjs';
import { Data } from '../components/form/models/post';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // pageIndex: number = 0;
  // pageSize: number = 500;
  paginatorPage: Data[] = [];

  constructor() {}

  public postsSubject$: BehaviorSubject<Data[]> = new BehaviorSubject(
    [] as Data[]
  );
  public posts$: Observable<Data[]> = this.postsSubject$.asObservable();

  public getPageSize() {
    return this.posts$.subscribe((data: any) => console.log(data));
  }

  getPage(pageIndex: number, pageSize: number) {
    this.posts$
      .pipe(skip(pageIndex * pageSize), take(pageSize))
      .subscribe((data) => (this.paginatorPage = data));
    console.log(this.paginatorPage);
  }
}
