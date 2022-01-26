import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Data } from '../form/models/post';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  public posts$!: Observable<Data[]>;
  public name: string | number = `Dude`;
  public text = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  constructor(
    public dataService: DataService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.httpService.getPosts();
    this.posts$ = this.dataService.posts$;
    // console.log(this.posts$);

    this.posts$.subscribe((data: Data[]) => {
      // console.log(data);
      data.map((item: Data) => {
        this.name = item['name'];
        this.text = item['body'];
        // console.log(this.name);
        // console.log(this.text);
      });
    });
  }
}
