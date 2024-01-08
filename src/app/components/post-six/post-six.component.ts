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
  
  public getImage(image: string){
    return "http://localhost:3000/uploads/" + image;
   }
}
