import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, skip, take } from 'rxjs';
import { Data } from '../components/form/models/post';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public paginatorPage: Data[] = [];
  public newPosts: any = [];
  public posts: any;
  constructor() {}

  public postsSubject$: BehaviorSubject<Data[]> = new BehaviorSubject(
    [] as Data[]
  );
  public posts$: Observable<Data[]> = this.postsSubject$.asObservable();

  public getPosts(): Data[] {
    return this.postsSubject$.value;
  }

  public setPosts(posts: Data[]) {
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
    // console.log(this.postsSubject$.value);
    this.posts = this.getPosts();
    this.posts.unshift(formValue);
    this.setPosts(this.posts);
  }
}
