import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { ScriptService } from '../../services/script.service';
import { GeneralModule } from '../../general/general.module';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, GeneralModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  routerSubscription: any;

  constructor(
    public scriptService: ScriptService
  ) {
    this.scriptService.init();
  }

  ngOnInit() {
  }

}
