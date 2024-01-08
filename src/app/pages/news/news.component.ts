import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScriptService } from '../../services/script.service';
import { GeneralModule } from '../../general/general.module';
import { ENDPOINTS } from '../../providers/data/endpoints';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, GeneralModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
  routerSubscription: any;
  public endpoints = ENDPOINTS;
  public blogPost: any[] = [];
  public searchResult: any[] = [];
  public categories: any[] = [];
  public category!: string;
  public searchKeyword!: string;
  public pageSize: number = 5;
  public count!: number;
  public page: number = 1;

  constructor(
    public scriptService: ScriptService,
    public data: DataProvider
  ) {

  }

  async ngOnInit() {
    this.scriptService.init();

    await this.load();
    await this.loadCategory();
  }

  public async load(force = false) {
    if (force) {
      await this.data.fetchBlogPost(this.endpoints.posts);
      this.blogPost = this.data.getPost();
    } else {
      if (!this.data.blogPostLoaded) {
        await this.data.fetchBlogPost(this.endpoints.posts);
        this.blogPost = this.data.getPost();
        console.log("Blog post ==> ", this.blogPost);
      } else {
        this.blogPost = this.data.getPost();
        console.log("Blog post ==> ", this.blogPost);
      }
    }

  }

  public async getPostByCategory(category: string) {
    this.category = category;
    if (category.toLocaleLowerCase() == "all") {
      this.load(true);
    } else {
      await this.data.fetchPostByCatgeory(this.endpoints.posts, category);
      this.blogPost = this.data.getPost();
      console.log("Blog post ==> ", this.blogPost);
    }
  }



  public async loadCategory(force = false) {
    if (force) {
      await this.data.fetchCategories(this.endpoints.category);
      this.categories = this.data.getCategories();
    } else {
      if (!this.data.categoriesLoaded) {
        await this.data.fetchCategories(this.endpoints.category);
        this.categories = this.data.getCategories();
        console.log("categories ==> ", this.categories);
      } else {
        this.categories = this.data.getCategories();
        console.log("categories ==> ", this.categories);
      }
    }
  }


  public getImage(image: string) {
    return "http://localhost:3000/uploads/" + image;
  }


  public async search(event: any) {
    console.log("Searched item ==> ", event);
    this.searchKeyword = event;
    await this.data.fetchPostByKeyword(this.endpoints.posts, this.searchKeyword);
    this.searchResult = this.data.getSearchedPost();
    console.log("Search Result ==> ", this.searchResult);
  }

  public resetLength(count: number, sub: number) {

    if (count) {
      return count - sub;
    }

    return count;
  }

  public  handlePageChange(event: any) {
    this.page = event;
  }

}
