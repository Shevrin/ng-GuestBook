import {
  ChangeDetectorRef,
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Data } from '../../models/post';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnDestroy, OnInit {
  public startPage: number = 0;
  public lastPage: number = 0;
  public pageSize: number = 5;
  public pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  // public id!: number;
  public paginatorPage: Data[] = [];
  public editFlag: boolean = false;
  public loader$: Observable<boolean> = this.dataService.loading$;

  constructor(public dataService: DataService, private cdr: ChangeDetectorRef) {
    this.dataService.getAllPosts();
    this.dataService.postsSubject$.subscribe((data: Data[]) => {
      this.lastPage = data.length;
      // console.log(data);
      this.paginatorPage = data.slice(this.startPage, this.pageSize);
    });
    // this.cdr.detectChanges;
    // this.cdr.markForCheck;
  }

  public changePage(event: PageEvent) {
    this.dataService.getPageItems(event.pageIndex, event.pageSize);
    this.paginatorPage = this.dataService.paginatorPage;

    // let paginator = this.dataService.posts$.subscribe((data) => {
    //   let startIndex = event.pageIndex * event.pageSize;
    //   let items = event.pageSize + event.pageIndex * event.pageSize;
    //   this.paginatorPage = data.slice(startIndex, items);
    //   // this.cdr.markForCheck;
    // });
    // paginator.unsubscribe();
  }

  public delete(id: number) {
    console.log('delete', id);
    this.dataService.deletePost(id);
  }

  public edit(id: number) {
    this.editFlag = true;
    console.log('edit', id);
    this.dataService.editPost(id);
    // this.dataService.editable$.subscribe((data) => console.log(data));
  }

  public ngOnInit(): void {}

  // ngOnChanges(changes: SimpleChanges): void {
  //   this.paginatorPage = this.dataService.paginatorPage;
  // }

  public scrollToForm() {
    const element = document.getElementById('form');
    element!.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  ngOnDestroy() {
    // this.startPage.unsubscribe();
  }
}
