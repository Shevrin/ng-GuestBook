import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Data } from '../../models/post';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnDestroy, OnChanges {
  public startPage: number = 0;
  public lastPage: number = 0;
  public pageSize: number = 5;
  public pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  public paginatorPage: Data[] = [];

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

  ngOnChanges(changes: SimpleChanges): void {
    this.paginatorPage = this.dataService.paginatorPage;
  }

  ngOnDestroy() {
    // this.startPage.unsubscribe();
  }
}
