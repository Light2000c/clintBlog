import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScriptService } from '../../services/script.service';
import { GeneralModule } from '../../general/general.module';
import { AuthProvider } from '../../providers/auth/auth';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, GeneralModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  routerSubscription: any;
  public tableCounts: any;

  constructor(
    public scriptService: ScriptService,
    public auth: AuthProvider,
    public data: DataService
  ) {

  }

  ngOnInit() {
    this.scriptService.init("admin");

    this.auth.setUser();

    this.load();
  }

  public async load(){
    
    await this.data.fetchTableCount();
    
    this.tableCounts = this.data.getTableCount();

    console.log(this.tableCounts);
  }

  public logout() {
    this.auth.signOut();
  }
}
