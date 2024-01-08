import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScriptService } from '../../services/script.service';
import { GeneralModule } from '../../general/general.module';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, GeneralModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  routerSubscription: any;

  constructor(
    public scriptService: ScriptService,
    public auth: AuthProvider,
  ) {
    this.scriptService.init("admin");
  }

  ngOnInit() {

    this.auth.setUser();
  }

  public logout() {
    this.auth.signOut();
  }
}
