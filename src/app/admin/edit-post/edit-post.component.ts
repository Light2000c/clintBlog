import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralModule } from '../../general/general.module';
import { ScriptService } from '../../services/script.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Blog, DataService } from '../../services/data/data.service';
import { ENDPOINTS } from '../../providers/data/endpoints';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [CommonModule, GeneralModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss'
})
export class EditPostComponent {

  public form!: FormGroup;
  public message!: string;
  public displayType!: string;
  public submitAttempt: boolean = false;
  public busy: boolean = false;
  public postId!: any;
  public blogPost!: Blog;
  public endpoints = ENDPOINTS;
  public file!: any;
  public categories: any[] = [];

  constructor(
    public scriptService: ScriptService,
    public formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public data: DataService,
  ) {

    this.scriptService.init("admin");

    this.form = this.formBuilder.group({
      title: [this.blogPost?.title ?? "", Validators.required],
      category: [this.blogPost?.category ?? "", Validators.required],
      image: [""],
      description: [this.blogPost?.description ?? "", Validators.required]
    });

  }

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.postId = param.get('id');
      // console.log("PostId is ==> ", this.postId);
    })

    await this.load();
    await this.loadCategories();

    // console.log("blog post id after loading", this.blogPost.id);

    if (this.blogPost) {
      this.form.controls['title'].setValue(this.blogPost.id);
      this.form.controls['category'].setValue(this.blogPost.category);
      this.form.controls['description'].setValue(this.blogPost.description);
    }

  }




  public async load() {

    await this.data.fetchPost(this.endpoints.posts, this.postId);

    this.blogPost = this.data.blogPost;
    // console.log("Blog Post ==> ", this.blogPost);
  }

  public async loadCategories(force = false) {
    if (force) {
      await this.data.fetchCategories(this.endpoints.category);
      this.categories = this.data.getCategories();
      // console.log("categories ==>", this.categories);
    } else {
      if (!this.data.categoriesLoaded) {
        await this.data.fetchCategories(this.endpoints.category);
        this.categories = this.data.getCategories();
        // console.log("categories ==>", this.categories);
      } else {
        this.categories = this.data.getCategories();
      }
    }
  }

  public onFileSelected(event: any) {
    let image = event.target.files[0];
    this.file = image;
    // console.log("file is ==>", this.file);
  }

  public async send() {
    this.message = '';
    this.submitAttempt = true;
    const formData = new FormData();

    if (this.form.valid) {
      this.busy = true;

      if (this.file) {
        formData.append("image", this.file, this.file.name)
      }
      formData.append('id', this.postId);
      formData.append('title', this.form.controls['title'].value);
      formData.append('category', this.form.controls['category'].value);
      formData.append('description', this.form.controls['description'].value);

      const response = await this.data.updatePost(this.endpoints.posts, formData);

      if ((response as any).status == "success") {
        this.message = "Post has been successfully updated";
        this.displayType = "success";
      } else {
        this.message = "Something went wrong, please try again later."
        this.displayType = "error";
      }

      this.busy = false;
    }

  }



}
