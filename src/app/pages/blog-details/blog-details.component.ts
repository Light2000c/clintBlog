import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GeneralModule } from '../../general/general.module';
import { ScriptService } from '../../services/script.service';
import { ActivatedRoute } from '@angular/router';
import { DataProvider } from '../../providers/data/data';
import { ENDPOINTS } from '../../providers/data/endpoints';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, GeneralModule],
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent implements OnInit {

  public postId: any;
  public endpoints = ENDPOINTS;
  public blogPost: any;
  public otherPost: any[] = [];

  constructor(
    public scriptService: ScriptService,
    public activatedRoute: ActivatedRoute,
    public data: DataProvider,
  ) { }

  async ngOnInit() {
    await this.scriptService.init();

    this.activatedRoute.paramMap.subscribe((param) => {

      this.postId = param.get('id');
      // console.log("Post Id ==> ", this.postId);

      this.load();
      this.loadOthers();
    });

  }

  async load() {
    const response = await this.data.fetchPostById(this.endpoints.posts, this.postId);
    this.blogPost = response[0];
    // console.log("Blog post ==> ", this.blogPost);
  }

  public async loadOthers(force = false) {
    if (force) {
      await this.data.fetchBlogPost(this.endpoints.posts);
      this.otherPost = this.data.getPost();
    } else {
      if (!this.data.blogPostLoaded) {
        await this.data.fetchBlogPost(this.endpoints.posts);
        this.otherPost = this.data.getPost();
        // console.log("Blog post ==> ", this.blogPost);
      } else {
        this.otherPost = this.data.getPost();
        // console.log("Blog post ==> ", this.otherPost);
      }
    }

  }

  
  public convertDate(date: string) {

    const inputDate = new Date(date);
  
    const options: Intl.DateTimeFormatOptions = {
      // weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
  
    const dateFormatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDate = dateFormatter.format(inputDate).toLowerCase();
  
    return formattedDate;
  
  }

}
