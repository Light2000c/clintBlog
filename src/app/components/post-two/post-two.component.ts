import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-two',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-two.component.html',
  styleUrl: './post-two.component.scss'
})
export class PostTwoComponent {
  @Input() post: any;

  constructor(){

  }
  
  ngOnInit(){
  
  }
  
  public getImage(image: string){
    return "http://localhost:3000/uploads/" + image;
   }
}
