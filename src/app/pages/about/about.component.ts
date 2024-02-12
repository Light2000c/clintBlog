import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScriptService } from '../../services/script.service';
import { GeneralModule } from '../../general/general.module';
import { DataProvider } from '../../providers/data/data';
import { ENDPOINTS } from '../../providers/data/endpoints';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, GeneralModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  routerSubscription: any;
  public blogPost: any[] = [];
  public endpoints = ENDPOINTS;

  constructor(
    public scriptService: ScriptService,
    public dataProvider: DataProvider
  ) {
  }

  ngOnInit() {
    this.scriptService.init();
    this.load();
  }

  public async load(force = false) {
    if (force) {
      await this.dataProvider.fetchBlogPost(this.endpoints.posts);
      this.blogPost = this.dataProvider.getPost();
    } else {
      if (!this.dataProvider.blogPostLoaded) {
        await this.dataProvider.fetchBlogPost(this.endpoints.posts);
        this.blogPost = this.dataProvider.getPost();
        // console.log("Blog post ==> ", this.blogPost);
      } else {
        this.blogPost = this.dataProvider.getPost();
      }
    }

  }

  public getImage(image: string) {
    return "http://clintblog.com.ng/api/uploads/" + image;
  }
}
