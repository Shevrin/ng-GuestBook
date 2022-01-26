import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DataService } from 'src/app/services/data.service';
import { PaginatonService } from 'src/app/services/pagination.service';
import { Data } from '../form/models/post';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {
  public lastPage: number = 0;
  public pageSize: number = 0;

  constructor(private dataService: DataService) {}

  public changePage(event: PageEvent) {
    console.log(event);
    console.log(event.pageIndex);
    this.dataService.pageIndex = event.pageIndex;
    this.dataService.pageSize = event.pageSize;
    console.log(event.pageSize);
  }

  ngOnInit(): void {
    this.dataService.posts$.subscribe((data: Data[]) => {
      this.lastPage = data.length;
    });
  }

  ngOnChanges() {}
}
