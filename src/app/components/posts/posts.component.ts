import { Observable, skip, take } from 'rxjs';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  public temple!: Data[];
  public posts$!: Observable<Data[]>;
  public page: Data[] = [];
  public name: string | number = `Dude`;
  public text = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  public paginatorPage: Data[] = [];
  constructor(
    public dataService: DataService,
    private httpService: HttpService,
    private cdr: ChangeDetectorRef
  ) {
    this.httpService.getPosts();
    this.posts$ = this.dataService.posts$;
    this.dataService.posts$.subscribe((data: Data[]) => {
      this.lastPage = data.length;
      this.cdr.markForCheck;
    });
  }

  public changePage(event: PageEvent) {
    console.log(event);
    // console.log(event.pageIndex);
    // console.log(event.pageSize);
    // this.dataService.getPage(event.pageIndex, event.pageSize);
    // this.dataService.posts$.pipe(
    //   skip(event.pageIndex * event.pageSize),
    //   take(event.pageSize)
    // );
    this.posts$.subscribe((data) => {
      this.paginatorPage = data.slice(
        event.pageIndex * event.pageSize,
        event.pageSize
      );
    });
  }

  ngOnInit(): void {
    this.posts$.subscribe((data) => {
      this.paginatorPage = data.slice(0, this.pageSize);
    });
  }
}
