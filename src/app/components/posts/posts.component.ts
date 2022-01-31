import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Data } from '../form/models/post';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  public lastPage: number = 0;
  public pageSize: number = 5;
  public pageSizeOptions: number[] = [5, 10, 25, 100];

  public paginatorPage: Data[] = [];

  constructor(
    public dataService: DataService,
    private httpService: HttpService,
    private cdr: ChangeDetectorRef
  ) {
    this.httpService.getPosts();
    this.dataService.posts$.subscribe((data: Data[]) => {
      this.lastPage = data.length;
      this.paginatorPage = data.slice(0, this.pageSize);
    });
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

  ngOnInit(): void {}
}
