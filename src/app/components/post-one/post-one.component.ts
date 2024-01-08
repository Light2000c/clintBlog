import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-one',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-one.component.html',
  styleUrl: './post-one.component.scss'
})
export class PostOneComponent {
@Input() post: any;

constructor(){

}

ngOnInit(){

}

public getImage(image: string){
  return "http://localhost:3000/uploads/" + image;
 }
}
