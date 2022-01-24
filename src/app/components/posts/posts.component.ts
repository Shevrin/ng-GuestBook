import { Component, OnInit } from '@angular/core';
import { Data } from '../form/models/post';
import { DataserviceService } from 'src/app/dataservice.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  public posts: Data[] = [];
  public name = `Dude`;
  public text = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  constructor(private dataService: DataserviceService) {}

  ngOnInit(): void {
    this.dataService.getPosts().subscribe(
      (data: Data[]) => {
        data.map((item: Data) => {
          this.name = item['name'];
          this.text = item['body'];
          console.log(this.name);
          console.log(this.text);
        });
        this.posts = data;
        console.log(this.posts);
      },
      (error) => console.log(error.message)
    );
  }
}
