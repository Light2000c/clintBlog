import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-four',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-four.component.html',
  styleUrl: './post-four.component.scss'
})
export class PostFourComponent {
  @Input() post!: any;

  constructor(){

  }

  ngOnInit(){

  }

  public getImage(image: string){
   return "http://localhost:3000/uploads/" + image;
  }
}
