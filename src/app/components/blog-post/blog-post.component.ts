import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
})
export class BlogPostComponent implements OnInit {
  @Input() displayType: any;
  @Input() post: any;

  constructor() { }

  ngOnInit() { }

  public getImage(image: string) {
    return "http://localhost:3000/uploads" + image;
  }

}
