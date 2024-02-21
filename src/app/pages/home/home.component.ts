import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralModule } from '../../general/general.module';
import { ScriptService } from '../../services/script.service';
import { DataProvider } from '../../providers/data/data';
import { ENDPOINTS } from '../../providers/data/endpoints';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GeneralModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  routerSubscription: any;
  public endpoints = ENDPOINTS;
  public blogPost: any[] = [];

  constructor(
    public scriptService: ScriptService,
    public dataProvider: DataProvider,
  ) {

  }

  async ngOnInit() {
    this.scriptService.init();
    await this.load();
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
    return "https://clintblog.com.ng/api/uploads/" + image;
  }

 


}
