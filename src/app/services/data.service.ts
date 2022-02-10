import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timeout } from 'rxjs';
import { Data } from '../models/post';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public paginatorPage: Data[] = [];
  public selfPosts: Data[] = [];
  public posts: any;
  public editIndex!: number;

  constructor(private backend: HttpService) {}

  public postsSubject$: BehaviorSubject<Data[]> = new BehaviorSubject(
    [] as Data[]
  );
  public posts$: Observable<Data[]> = this.postsSubject$.asObservable();

  public loading$: BehaviorSubject<boolean> = new BehaviorSubject(
    false as boolean
  );

  public editable$: BehaviorSubject<Data[]> = new BehaviorSubject([] as Data[]);

  public getPosts(): Data[] {
    return this.postsSubject$.value;
  }

  public setPosts(posts: Data[]): void {
    this.postsSubject$.next(posts);
  }

  public getAllPosts(): void {
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
    formValue.like = false;
    this.posts.unshift(formValue);
    this.selfPosts.unshift(formValue);

    this.setPosts(this.posts);
    this.backend.addPosts(this.posts).subscribe((posts: Data[]) => {
      this.loading$.next(false);
    });
  }

  public deletePost(id: number): void {
    this.loading$.next(true);

    this.posts = this.getPosts().filter((_, index) => index !== id);
    this.setPosts(this.posts);
    this.backend.delPosts(this.posts).subscribe((posts: Data[]) => {
      this.loading$.next(false);
    });
  }

  public editPost(idx: number): void {
    this.editIndex = idx;
    this.posts = this.getPosts();
    this.editable$.next(this.posts[idx]);
  }

  public cancelEdit(): void {
    this.editable$.next([]);
  }

  public saveEdit(post: Data): void {
    this.loading$.next(true);

    this.editable$.next([]);
    this.posts = this.getPosts();

    this.posts[this.editIndex] = post;
    this.setPosts(this.posts);
    this.backend
      .putPosts(this.posts, this.editIndex)
      .subscribe((posts: Data[]) => {
        this.loading$.next(false);
      });
  }

  public likePost(id: number): void {
    this.posts = this.getPosts();
    this.posts[id].like = !this.posts[id].like;
    this.setPosts(this.posts);
  }

  public getPageItems(pageIndex: number, pageSize: number): void {
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
