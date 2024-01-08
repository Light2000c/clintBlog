import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralModule } from '../../general/general.module';
import { ScriptService } from '../../services/script.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data/data.service';
import { ENDPOINTS } from '../../providers/data/endpoints';

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [CommonModule, GeneralModule],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.scss'
})
export class AddBlogComponent {

  routerSubscription: any;
  public categories: any[] = [];
  public form!: FormGroup;
  public submitAttempt: boolean = false;
  public busy: boolean = false;
  public endpoints = ENDPOINTS;
  public message: string = '';
  public displayType!: string;
  public formData!: any;
  public file!: any;

  constructor(
    public scriptService: ScriptService,
    public formBuilder: FormBuilder,
    public data: DataService
  ) {
    this.scriptService.init("admin");
  }

  ngOnInit() {
    this.loadCategories();

    this.form = this.formBuilder.group({
      title: ["", Validators.compose([Validators.required])],
      category: ["", Validators.compose([Validators.required])],
      image: [null],
      description: ["", Validators.compose([Validators.required])],
    });
  }

  public async loadCategories(force = false) {
    if (force) {
      await this.data.fetchCategories(this.endpoints.category);
      this.categories = this.data.getCategories();
      console.log("categories ==>", this.categories);
    } else {
      if (!this.data.categoriesLoaded) {
        await this.data.fetchCategories(this.endpoints.category);
        this.categories = this.data.getCategories();
        console.log("categories ==>", this.categories);
      } else {
        this.categories = this.data.getCategories();
      }
    }
  }


  public onFileSelected(event: any) {
    const file = event.target.files[0];
    this.file = file;
    console.log("file is ==> ", this.file);
  }


  public async send() {
    this.submitAttempt = true;
    this.message = '';

    const formData = new FormData();

    if (this.form.valid) {

      formData.append("image", this.file, this.file.name);
      formData.append("title", this.form.controls['title'].value);
      formData.append("category", this.form.controls['category'].value);
      formData.append("description", this.form.controls['description'].value);


      console.log("form data is ==>", formData.get('image'));
      this.busy = true;

      const response: any = await this.data.addPost(this.endpoints.posts, formData);
      if (response.status == "success") {
        this.message = "Post has been successfully added.";
        this.displayType = "success";
        this.form.reset();
      } else {
        this.message = "Something went wrong, please try again later.";
        this.displayType = "fail";
        this.form.reset();
      }
      this.busy = false;
      this.submitAttempt = false;

    }

  }




}
