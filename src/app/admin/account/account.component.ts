import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from '../../components/admin-header/admin-header.component';
import { ScriptService } from '../../services/script.service';
import { GeneralModule } from '../../general/general.module';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, GeneralModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

  routerSubscription: any;

  constructor(
    public scriptService: ScriptService
  ) {
    this.scriptService.init("admin");
  }

  ngOnInit() {

  }

}
