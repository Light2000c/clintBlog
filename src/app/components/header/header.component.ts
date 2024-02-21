import { Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DataProvider } from '../../providers/data/data';
import { ENDPOINTS } from '../../providers/data/endpoints';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() searchValue!: string;
  @Output() search: EventEmitter<any> = new EventEmitter<any>();
  public isSearchActive: boolean = false;
  public categories: any[] = [];
  public endpoints = ENDPOINTS;

  constructor(
    public router: Router,
    public data: DataProvider,
  ) {

  }

  ngOnInit() {
    this.loadCategories();
  }

  public async loadCategories(force = false) {
    if (force) {
      await this.data.fetchCategories(this.endpoints.category);
      // this.categories = this.data.getCategories();
    } else {
      if (!this.data.categoriesLoaded) {
        await this.data.fetchCategories(this.endpoints.category);
        this.categories = this.data.getCategories();
        // console.log("categories ==> ", this.categories);
      } else {
        this.categories = this.data.getCategories();
        // console.log("categories ==> ", this.categories);
      }
    }
  }


  public displaySearchBox(){
   return this.router.url == '/news' || this.router.url.startsWith('/news/');
 
  }

  public onInputChange(event: any) {
    const keyword = event.target.value;
    this.searchValue = keyword;
    // console.log("keyword ==> ", this.searchValue);
    this.search.emit(keyword);
  }

  public showSearchBox(){
    this.isSearchActive = true;
  }

  public hideSearchBox(){
    this.isSearchActive = false;
  }

  public navigateWithCategory(category: string){
   return this.router.navigate(['news', category]);
  }

  public setActive(category: string){
    return this.router.url.includes(category);
  }

  public showCategory(){
    return this.router.url == "/" || this.router.url.startsWith("/news")
  }

}
