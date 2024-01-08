import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScriptService } from '../../services/script.service';
import { GeneralModule } from '../../general/general.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpService } from '../../services/http/http.service';
import { ENDPOINTS } from '../../providers/data/endpoints';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, GeneralModule],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  routerSubscription: any;
  public form!: FormGroup;
  public submitAttempt: boolean = false;
  public endpoints = ENDPOINTS;
  public busy: boolean = false;
  public errorText = "";
  constructor(
    public scriptService: ScriptService,
    public fromBuilder: FormBuilder,
    public auth: AuthProvider,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.scriptService.init("admin");

    this.form = this.fromBuilder.group({
      email: ["", Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required])]
    });
  }


  public async send() {
    this.errorText = "";
    this.submitAttempt = true;

    if (this.form.valid) {
      this.busy = true;
     const response = await this.auth.signIn(this.endpoints.login, this.form.value);

     if(response.status == "success"){
      this.router.navigate(['/admin/dashboard']);
     }else{
      this.errorText = "Authentication failed, please check credentials and try again."
     }
     this.busy = false;
    }

  }

}
