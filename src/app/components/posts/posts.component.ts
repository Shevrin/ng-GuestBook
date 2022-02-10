import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Data } from '../../models/post';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnDestroy {
  public pageIndex: number = 0;
  public lastPage: number = 0;
  public pageSize: number = 5;
  public pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  public paginatorPage: Data[] = [];
  public editFlag: boolean = false;
  public likeFlag: boolean = false;
  public loader$: Observable<boolean> = this.dataService.loading$;

  constructor(public dataService: DataService, private cdr: ChangeDetectorRef) {
    this.dataService.getAllPosts();
    this.dataService.postsSubject$.subscribe((data: Data[]) => {
      this.lastPage = data.length;
      this.dataService.getPageItems(this.pageIndex, this.pageSize);
      this.paginatorPage = this.dataService.paginatorPage;
    });
    // this.cdr.detectChanges;
    // this.cdr.markForCheck;
  }

  public changePage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.dataService.getPageItems(event.pageIndex, event.pageSize);
    this.paginatorPage = this.dataService.paginatorPage;
  }

  public delete(idx: number) {
    this.dataService.deletePost(this.idxToId(idx));
  }

  public edit(idx: number) {
    this.editFlag = true;
    this.dataService.editPost(this.idxToId(idx));
  }

  public toggleLike(idx: number): void {
    this.dataService.likePost(this.idxToId(idx));
  }

  public scrollToForm() {
    const element = document.getElementById('form');
    element!.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  private idxToId(idx: number): number {
    return idx + this.pageSize * this.pageIndex;
  }
  ngOnDestroy() {
    this.dataService.postsSubject$.unsubscribe();
  }
}
