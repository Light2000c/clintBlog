import { Component, Inject, NgZone, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import {  Router, RouterOutlet } from '@angular/router';
import { GeneralModule } from './general/general.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GeneralModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'clintBlog';
  routerSubscription: any;
  show: boolean = false;

  constructor(
  ) {
  }    


}
