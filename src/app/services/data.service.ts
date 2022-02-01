import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, skip, take } from 'rxjs';
import { Data } from '../components/form/models/post';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public paginatorPage: Data[] = [];
  public newPosts: any = [];

  constructor() {}

  public postsSubject$: BehaviorSubject<Data[]> = new BehaviorSubject(
    [] as Data[]
  );
  public posts$: Observable<Data[]> = this.postsSubject$.asObservable();

  public get posts(): Array<Data> {
    return this.postsSubject$.value;
  }

  public set posts(posts: Data[]) {
    this.postsSubject$.next(posts);
  }

  public getPageItems(pageIndex: number, pageSize: number) {
    this.posts$.subscribe((data) => {
      let startIndex = pageIndex * pageSize;
      let items = pageSize + pageIndex * pageSize;
      this.paginatorPage = data.slice(startIndex, items);
    });
  }

  public addPost(formValue: any): void {
    this.postsSubject$.subscribe((posts) => {
      posts.unshift(formValue);
      console.log(posts);
    });
    // https://question-it.com/questions/587936/obnovlenie-spiska-pri-dobavlenii-novogo-elementa
    // this.postsSubject$.next(this.newPosts);
    // this.postsSubject$.next(formValue);
  }
}
