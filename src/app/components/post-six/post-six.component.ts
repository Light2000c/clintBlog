import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralModule } from '../../general/general.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-six',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-six.component.html',
  styleUrl: './post-six.component.scss'
})
export class PostSixComponent {
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
