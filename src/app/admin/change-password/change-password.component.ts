import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GeneralModule } from '../../general/general.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScriptService } from '../../services/script.service';
import { DataProvider } from '../../providers/data/data';
import { DataService } from '../../services/data/data.service';
import { ENDPOINTS } from '../../providers/data/endpoints';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, GeneralModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

  public form!: FormGroup;
  public busy: boolean = false;
  public submitAttempt: boolean = false;
  public endpoints = ENDPOINTS;
  public message: string = "";
  public displayType!: String;

  constructor(
    public formBuilder: FormBuilder,
    public scriptService: ScriptService,
    public data: DataService,
    public auth: AuthProvider
  ) {
    this.scriptService.init("admin");
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      old_password: ["", Validators.required],
      new_password: ["", Validators.required],
      confirm_password: ["", Validators.required],
    });
  }

  async send() {
    this.submitAttempt = true;

    let data = {
      ...this.form.value,
      id: this.auth.user.id,
    }

    // console.log(data);

    if (this.form.valid) {

      this.busy = true;

      if (this.form.controls["new_password"].value == this.form.controls["confirm_password"].value) {

        const response = await this.data.updatePassword(this.endpoints.user, data);
        // console.log("response => ", response);

        if ((response as any).status == "success") {
          this.message = "Password has been successfully updated.";
          this.displayType = "success";
        } else {
          // console.log("msg ==> ", (response as any).message);
          if ((response as any).message === "Password doesn't match") {
            this.message = "Current passsword is incorrect, please confirm and try again.";
            this.displayType = "error";
          } else {
            this.message = "Something went wrong, please try again.";
            this.displayType = "error";
          }
        }

      }else{
        this.message = "New password and confirm password doesn't match.";
        this.displayType = "error";
      }

      this.busy = false;
    }


  }

}
