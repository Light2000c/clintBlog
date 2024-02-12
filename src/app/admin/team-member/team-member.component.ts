import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralModule } from '../../general/general.module';
import { ScriptService } from '../../services/script.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ENDPOINTS } from '../../providers/data/endpoints';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-team-member',
  standalone: true,
  imports: [CommonModule, GeneralModule],
  templateUrl: './team-member.component.html',
  styleUrl: './team-member.component.scss'
})
export class TeamMemberComponent {
  routerSubscription: any;
  public teamMembers: any[] = [];
  public form!: FormGroup;
  public submitAttempt: boolean = false;
  public busy: boolean = false;
  public message!: string;
  public displayType!: string;
  public endpoints = ENDPOINTS;
  public pageSize: number = 10;
  public count!: number;
  public page: number = 1;

  constructor(
    public scriptService: ScriptService,
    public formBuilder: FormBuilder,
    public data: DataService
  ) {
    this.scriptService.init("admin");

    this.form = this.formBuilder.group({
      fullname: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      confirmpassword: ["", Validators.required]
    });
  }

  async ngOnInit() {

    await this.load();
  }


  public async load(force = false) {

    if (force) {
      await this.data.fetchTeamMembers(this.endpoints.user);
      this.teamMembers = this.data.getTeamMembers();
    } else {
      if (!this.data.teamMembersLoaded) {
        await this.data.fetchTeamMembers(this.endpoints.user);
        this.teamMembers = this.data.getTeamMembers();
        // console.log("Team members ==> ", this.teamMembers);
      } else {
        this.teamMembers = this.data.getTeamMembers();
      }
    }

  }


  async send() {
    this.message = "";
    this.submitAttempt = true;

    if (this.form.valid) {
      this.busy = true;

      if (this.form.controls['password'].value == this.form.controls['confirmpassword'].value) {

        const response = await this.data.addTeamMember(this.endpoints.user, this.form.value);
        // console.log("Response is ==> ", response);

        if (response?.status == "success") {
          this.message = "User has been successfully addded";
          this.displayType = "success";
        } else {
          this.message = "Something went wrong, please try again.";
          this.displayType = "error";
        }
      } else {
        this.message = "Password on not match";
        this.displayType = "error";
      }

      this.busy = false
    }
  }

  public async deleteMember(id: any) {

    const response = await this.data.deleteTeamMember(this.endpoints.user, id);
    // console.log("response is ==> ", response);
    if ((response as any).status && (response as any).status == "success") {
      this.load(true);
    }

  }

  public handlePageChange(event: any) {
    this.page = event;
  }
}
