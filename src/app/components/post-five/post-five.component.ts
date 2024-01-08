import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralModule } from '../../general/general.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-five',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-five.component.html',
  styleUrl: './post-five.component.scss'
})
export class PostFiveComponent {
  @Input() post!: any;

}
