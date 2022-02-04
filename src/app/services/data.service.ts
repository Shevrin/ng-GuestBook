import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timeout } from 'rxjs';
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

  public loading$: BehaviorSubject<any> = new BehaviorSubject(false);

  public editable$: BehaviorSubject<any> = new BehaviorSubject([]);

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
    this.loading$.next(true);

    this.backend.getPosts().subscribe((posts: Data[]) => {
      // console.log(posts);
      this.postsSubject$.next(posts);

      this.loading$.next(false);
    });
  }

  public addPost(formValue: Data): void {
    this.loading$.next(true);

    this.posts = this.getPosts();
    this.posts.unshift(formValue);
    this.selfPosts.unshift(formValue);

    this.setPosts(this.posts);
    this.setSelfPosts(this.selfPosts);
    // this.selfPosts$.subscribe((dat) => console.log(dat));
    this.backend.addPosts(this.posts).subscribe((posts: Data[]) => {
      // console.log(posts);
      this.loading$.next(false);
    });
  }

  public deletePost(id: number) {
    this.loading$.next(true);

    this.posts = this.getPosts().filter((_, index) => index !== id);
    // console.log(this.posts);
    this.setPosts(this.posts);
    this.backend.delPosts(this.posts).subscribe((posts: Data[]) => {
      console.log(posts);
      this.loading$.next(false);
    });
  }

  public editPost(idx: number) {
    this.postsSubject$.subscribe((posts) => {
      console.log('EDIT');

      this.editable$.next(posts[idx]);
    });
  }

  public cancelEdit() {
    console.log('CANCEL');
    this.editable$.next([]);
    // this.editable$.subscribe((data) => console.log(data));
  }

  public getPageItems(pageIndex: number, pageSize: number) {
    this.loading$.next(true);
    this.posts$.subscribe((data) => {
      let startIndex = pageIndex * pageSize;
      let items = pageSize + pageIndex * pageSize;
      this.paginatorPage = data.slice(startIndex, items);

      setTimeout(() => {
        this.loading$.next(false);
      }, 350);
    });
  }
}
