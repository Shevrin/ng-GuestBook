import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Data, Post } from '../models/post';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public paginatorPage: Data[] = [];
  public selfPosts: Data[] = [];
  public posts: any;
  public errorMessage: string = '';

  constructor(private backend: HttpService) {}

  // public posts: Data[] = [];

  public postsSubject$: BehaviorSubject<Data[]> = new BehaviorSubject(
    [] as Data[]
  );
  public posts$: Observable<Data[]> = this.postsSubject$.asObservable();

  public selfPosts$: BehaviorSubject<Data[]> = new BehaviorSubject(
    [] as Data[]
  );

  public getPosts(): Data[] {
    return this.postsSubject$.value;
  }

  public setPosts(posts: Data[]) {
    this.postsSubject$.next(posts);
  }

  public setSelfPosts(posts: Data[]) {
    this.selfPosts$.next(posts);
  }

  public getAllPosts() {
    this.backend.getPosts().subscribe((posts: Data[]) => {
      console.log(posts);
      this.postsSubject$.next(posts);
    });
  }

  public addPost(formValue: Data): void {
    this.posts = this.getPosts();
    this.posts.unshift(formValue);
    this.selfPosts.unshift(formValue);

    this.setPosts(this.posts);
    this.setSelfPosts(this.selfPosts);
    // this.selfPosts$.subscribe((dat) => console.log(dat));

    this.backend.addPosts(this.posts).subscribe((posts: Data[]) => {
      console.log(posts);
    });
  }

  public getPageItems(pageIndex: number, pageSize: number) {
    this.posts$.subscribe((data) => {
      let startIndex = pageIndex * pageSize;
      let items = pageSize + pageIndex * pageSize;
      this.paginatorPage = data.slice(startIndex, items);
    });
  }
}
