import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScriptService } from '../../services/script.service';
import { GeneralModule } from '../../general/general.module';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, GeneralModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  routerSubscription: any;

  constructor(
    public scriptService: ScriptService
  ) {
  }

  ngOnInit() {
    this.scriptService.init();
  }
}
