import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-three',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-three.component.html',
  styleUrl: './post-three.component.scss'
})
export class PostThreeComponent {
  @Input() post: any;

  constructor(){

  }
  
  ngOnInit(){
  
  }
  
  public getImage(image: string){
    return "http://localhost:3000/uploads/" + image;
   }
}
