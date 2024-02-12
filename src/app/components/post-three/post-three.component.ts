import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-three',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-three.component.html',
  styleUrl: './post-three.component.scss'
})
export class PostThreeComponent {
  @Input() post: any;

  constructor(){

  }
  
  ngOnInit(){
  
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
  
  public getImage(image: string){
    return "http://clintblog.com.ng/api/uploads/" + image;
   }
}
