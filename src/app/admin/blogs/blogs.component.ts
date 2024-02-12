import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralModule } from '../../general/general.module';
import { ScriptService } from '../../services/script.service';
import { Blog, DataService } from '../../services/data/data.service';
import { ENDPOINTS } from '../../providers/data/endpoints';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, GeneralModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent {

  routerSubscription: any;
  endpoint = ENDPOINTS;
  public blogPosts: Blog[] = [];
  public pageSize: number = 10;
  public count!: number;
  public page: number = 1;


  constructor(
    public scriptService: ScriptService,
    public data: DataService
  ) {
    
  }

  async ngOnInit() {
    this.scriptService.init("admin");
    
    this.load(false);
  }


  public async load(force: boolean) {

    if (force) {
      // console.log("Loading blog posts");
      await this.data.fetchBlogPosts(this.endpoint.posts);
      // console.log("posts ==> ", this.data.getBlogPosts());
      this.blogPosts = this.data.getBlogPosts();
    } else {
      if (!this.data.blogPostsLoaded) {

        // console.log("Loading blog posts");
        await this.data.fetchBlogPosts(this.endpoint.posts);
        // console.log("posts ==> ", this.data.getBlogPosts());
        this.blogPosts = this.data.getBlogPosts();
      } else {
        this.blogPosts = this.data.getBlogPosts();
      }
    }
  }


  public async deletePost(id: any) {

    const response = await this.data.deletePost(this.endpoint.posts, id);

    // console.log("response is ==> ", response);

    if ((response as any).status == "success") {
      await this.load(true);
    }
  }

  public handlePageChange(event: any) {
    this.page = event;
  }
}
