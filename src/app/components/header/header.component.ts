import { Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() searchValue!: string;
  @Output() search: EventEmitter<any> = new EventEmitter<any>();
  public isSearchActive: boolean = false;

  constructor(
    public router: Router
  ) {

  }

  ngOnInit() {
  
  }


  public displaySearchBox(){
   return this.router.url == '/news';
 
  }

  public onInputChange(event: any) {
    const keyword = event.target.value;
    this.searchValue = keyword;
    console.log("keyword ==> ", this.searchValue);
    this.search.emit(keyword);
  }

  public showSearchBox(){
    this.isSearchActive = true;
  }

  public hideSearchBox(){
    this.isSearchActive = false;
  }

}
