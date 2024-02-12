import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent {


  constructor(
    public route: Router,
    public auth: AuthProvider
  ) {
    console.log("active route is ==> ", this.route.url);
   }


  checkActiveRoute(active: string) {
   return this.route.url == active;
  }

  logout(){
    this.auth.signOut();
  }
}
